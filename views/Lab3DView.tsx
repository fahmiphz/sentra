'use client';
import React, { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { MonitorPlay, Phone, Mail, Sun, Moon, MousePointerClick, Activity, Clock } from 'lucide-react';
import * as THREE from 'three';

// --- DATA & STATE TYPE ---
type PCState = 'coding' | 'compiling' | 'error' | 'idle';

const getScreenTheme = (state: PCState, isTeacher: boolean) => {
  if (isTeacher) return { color: '#eab308', glow: '#ca8a04', text: 'ADMIN TERMINAL\n> System Online\n> Monitoring Nodes...' };
  switch (state) {
    case 'error': return { color: '#ef4444', glow: '#b91c1c', text: 'FATAL ERROR\n> Stack overflow\n> Debugging...' };
    case 'compiling': return { color: '#10b981', glow: '#047857', text: 'BUILDING...\n> Webpack 100%\n> Deployed.' };
    case 'coding': return { color: '#3b82f6', glow: '#1d4ed8', text: 'index.tsx\n> function App() {\n> return <Lab />\n}' };
    default: return { color: '#64748b', glow: '#334155', text: 'IDLE\n> Awaiting input...' };
  }
};

// --- KOMPONEN EFEK PARTIKEL DEBU (BARU) ---
const DustParticles = () => {
  const count = 500;
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20; // x
      temp[i * 3 + 1] = Math.random() * 8;      // y (tinggi ruangan)
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02; // Partikel berputar lambat
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2; // Melayang naik turun
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// --- KOMPONEN JAM DINDING REAL-TIME (BARU) ---
const WallClock = () => {
  const hoursRef = useRef<THREE.Mesh>(null);
  const minutesRef = useRef<THREE.Mesh>(null);
  const secondsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    
    if (hoursRef.current) hoursRef.current.rotation.z = -((h % 12) + m / 60) * (Math.PI * 2) / 12;
    if (minutesRef.current) minutesRef.current.rotation.z = -(m + s / 60) * (Math.PI * 2) / 60;
    if (secondsRef.current) secondsRef.current.rotation.z = -s * (Math.PI * 2) / 60;
  });

  return (
    <group position={[0, 6, -8.7]}>
      {/* Bingkai Jam */}
      <mesh castShadow>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      {/* Background Jam */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Jarum Jam */}
      <mesh ref={hoursRef} position={[0, 0.12, 0]}>
        <boxGeometry args={[0.05, 0.1, 0.4]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      {/* Jarum Menit */}
      <mesh ref={minutesRef} position={[0, 0.13, 0]}>
        <boxGeometry args={[0.03, 0.1, 0.6]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Jarum Detik */}
      <mesh ref={secondsRef} position={[0, 0.14, 0]}>
        <boxGeometry args={[0.01, 0.1, 0.65]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
    </group>
  );
};

// --- KOMPONEN RAK SERVER BERKEDIP (BARU) ---
const ServerRack = () => {
  const ledRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ledRef.current) {
      // LED berkedip acak
      const material = ledRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = Math.random() > 0.8 ? 2 : 0;
    }
  });

  return (
    <group position={[-8, 0, -7]} rotation={[0, Math.PI / 4, 0]}>
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 4, 1.5]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Kaca Server */}
      <mesh position={[0, 2, 0.76]}>
        <boxGeometry args={[1.3, 3.8, 0.05]} />
        <meshStandardMaterial color="#000" transparent opacity={0.6} />
      </mesh>
      {/* LED Indikator */}
      <mesh ref={ledRef} position={[0.4, 3.5, 0.75]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#000" emissive="#10b981" />
      </mesh>
      <mesh position={[-0.4, 3.5, 0.75]}>
         <boxGeometry args={[0.1, 0.1, 0.1]} />
         <meshStandardMaterial color="#000" emissive="#3b82f6" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

// --- KOMPONEN KONTROL KAMERA ---
const CameraRig = ({ activeTarget, controlsRef }: { activeTarget: THREE.Vector3 | null, controlsRef: any }) => {
  const { camera } = useThree();
  useFrame((state) => {
    if (activeTarget && controlsRef.current) {
      state.camera.position.lerp(new THREE.Vector3(activeTarget.x, activeTarget.y + 0.65, activeTarget.z), 0.05);
      controlsRef.current.target.lerp(new THREE.Vector3(activeTarget.x, activeTarget.y + 0.65, activeTarget.z - 0.1), 0.05);
    } else if (controlsRef.current) {
      state.camera.position.lerp(new THREE.Vector3(0, 8, 12), 0.04);
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.04);
    }
  });
  return null;
};

// --- KOMPONEN STRUKTUR RUANGAN ---
const RoomStructure = ({ isDarkRoom }: { isDarkRoom: boolean }) => {
  return (
    <group>
      <mesh position={[0, 4, -9]} receiveShadow>
        <boxGeometry args={[20, 8, 0.5]} />
        <meshStandardMaterial color={isDarkRoom ? "#0f0f13" : "#e4e4e7"} roughness={0.9} />
      </mesh>
      <mesh position={[-9.75, 4, -1.5]} receiveShadow>
        <boxGeometry args={[0.5, 8, 15]} />
        <meshStandardMaterial color={isDarkRoom ? "#0a0a0c" : "#d4d4d8"} roughness={0.9} />
      </mesh>
      <mesh position={[9.75, 4, -1.5]} receiveShadow>
        <boxGeometry args={[0.5, 8, 15]} />
        <meshStandardMaterial color={isDarkRoom ? "#0a0a0c" : "#d4d4d8"} roughness={0.9} />
      </mesh>
      
      {/* Papan Tulis */}
      <mesh position={[0, 3.5, -8.7]} receiveShadow>
        <boxGeometry args={[8, 3.5, 0.1]} />
        <meshStandardMaterial color={isDarkRoom ? "#a1a1aa" : "#ffffff"} roughness={0.2} metalness={0.1} />
        <Html transform position={[0, 0, 0.06]} distanceFactor={3} zIndexRange={[0, 0]}>
          <div className="w-[600px] p-6 text-black font-mono pointer-events-none opacity-80" style={{ filter: isDarkRoom ? 'brightness(0.6)' : 'none' }}>
            <h2 className="text-3xl font-black border-b-4 border-black inline-block mb-4">ARSITEKTUR SERVER LAB</h2>
            <div className="text-xl space-y-2 font-bold">
              <p>{"{"}</p>
              <p className="ml-4">"node_cluster": "RPL-Alpha",</p>
              <p className="ml-4">"active_connections": 15,</p>
              <p className="ml-4">"protocol": "WebSocket"</p>
              <p>{"}"}</p>
            </div>
          </div>
        </Html>
      </mesh>

      <WallClock />
      <ServerRack />
    </group>
  );
};

// --- KOMPONEN 3D: PC & MEJA ---
const PCNode = ({ 
  position, rotation = [0, 0, 0], id, isTeacher = false, 
  isOn = true, activityState = 'idle', onFocus
}: { 
  position: [number, number, number], rotation?: [number, number, number],
  id: string, isTeacher?: boolean, isOn?: boolean, activityState?: PCState,
  onFocus: (pos: THREE.Vector3, rot: THREE.Euler) => void
}) => {
  const [hovered, setHover] = useState(false);
  const pcRef = useRef<THREE.Group>(null);
  const theme = getScreenTheme(activityState, isTeacher);
  const isScreenActive = isTeacher || isOn;

  return (
    <group 
      ref={pcRef} position={position} rotation={rotation as any}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }} 
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'default'; }}
      onClick={(e) => {
        e.stopPropagation();
        if (pcRef.current) {
          const worldPos = new THREE.Vector3();
          pcRef.current.getWorldPosition(worldPos);
          const offset = new THREE.Vector3(0, 0, 1.2); 
          offset.applyEuler(pcRef.current.rotation);
          worldPos.add(offset);
          onFocus(worldPos, pcRef.current.rotation);
        }
      }}
    >
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={isTeacher ? [2, 0.05, 1] : [1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#27272a" />
      </mesh>
      <mesh position={isTeacher ? [-0.9, 0.2, 0] : [-0.55, 0.2, 0]} castShadow>
        <boxGeometry args={[0.05, 0.4, 0.6]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={isTeacher ? [0.9, 0.2, 0] : [0.55, 0.2, 0]} castShadow>
        <boxGeometry args={[0.05, 0.4, 0.6]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>

      {/* Cahaya Pantulan Layar ke Meja (Real-time PointLight) */}
      {isScreenActive && (
        <pointLight position={[0, 0.7, 0.2]} distance={2.5} intensity={0.5} color={theme.glow} />
      )}

      <mesh position={[0, 0.5, -0.15]} castShadow>
        <cylinderGeometry args={[0.05, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>
      <mesh position={[0, 0.65, -0.15]} castShadow>
        <boxGeometry args={isTeacher ? [1, 0.6, 0.05] : [0.7, 0.45, 0.05]} />
        <meshStandardMaterial color="#18181b" />
      </mesh>

      <mesh position={[0, 0.65, -0.12]}>
        <boxGeometry args={isTeacher ? [0.95, 0.55, 0.005] : [0.65, 0.4, 0.005]} />
        <meshStandardMaterial color="#000" emissive={isScreenActive ? theme.glow : '#000'} emissiveIntensity={isScreenActive ? 2.5 : 0} toneMapped={false} />
        
        {isScreenActive && (
          <Html transform distanceFactor={0.5} position={[0, 0, 0.01]} zIndexRange={[0, 0]}>
            <div 
              className={`w-[240px] h-[150px] p-2 bg-black/90 border-2 rounded text-xs font-mono overflow-hidden flex flex-col`}
              style={{ borderColor: theme.color, color: theme.color, boxShadow: `0 0 20px ${theme.glow}` }}
            >
              <div className="border-b pb-1 mb-1 font-bold flex justify-between" style={{ borderColor: theme.glow }}>
                <span>{id}</span>
                <span>{isTeacher ? 'ROOT' : activityState.toUpperCase()}</span>
              </div>
              <div className="whitespace-pre-wrap leading-tight flex-grow">
                {theme.text}
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </Html>
        )}
      </mesh>

      <mesh position={[0, 0.43, 0.15]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

// --- KOMPONEN SCENE UTAMA ---
const LabScene = ({ isLabOn, isDarkRoom, setLabOn }: { isLabOn: boolean, isDarkRoom: boolean, setLabOn: (v: boolean) => void }) => {
  const [pcStates, setPcStates] = useState<Record<string, PCState>>({});
  const [activeTarget, setActiveTarget] = useState<THREE.Vector3 | null>(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!isLabOn) return;
    const interval = setInterval(() => {
      const states: PCState[] = ['coding', 'coding', 'compiling', 'error', 'idle'];
      const newStates: Record<string, PCState> = {};
      for (let i = 1; i <= 15; i++) {
        if (Math.random() > 0.6) newStates[`PC-${i}`] = states[Math.floor(Math.random() * states.length)];
      }
      setPcStates(prev => ({ ...prev, ...newStates }));
    }, 2500);
    return () => clearInterval(interval);
  }, [isLabOn]);

  const handleFocus = (pos: THREE.Vector3) => setActiveTarget(pos);

  const studentPCs = [];
  let pcIndex = 1;

  for (let i = 0; i < 5; i++) studentPCs.push(<PCNode key={`L${i}`} id={`PC-${pcIndex++}`} position={[-3.5, 0, -4 + (i * 2)]} rotation={[0, Math.PI / 2, 0]} isOn={isLabOn} activityState={pcStates[`PC-${pcIndex-1}`] || 'coding'} onFocus={handleFocus} />);
  for (let i = 0; i < 5; i++) studentPCs.push(<PCNode key={`R${i}`} id={`PC-${pcIndex++}`} position={[3.5, 0, -4 + (i * 2)]} rotation={[0, -Math.PI / 2, 0]} isOn={isLabOn} activityState={pcStates[`PC-${pcIndex-1}`] || 'coding'} onFocus={handleFocus} />);
  for (let i = 0; i < 5; i++) studentPCs.push(<PCNode key={`C${i}`} id={`PC-${pcIndex++}`} position={[0, 0, -4 + (i * 2)]} rotation={[0, 0, 0]} isOn={isLabOn} activityState={pcStates[`PC-${pcIndex-1}`] || 'coding'} onFocus={handleFocus} />);

  return (
    <>
      <CameraRig activeTarget={activeTarget} controlsRef={controlsRef} />
      <ambientLight intensity={isDarkRoom ? 0.05 : (isLabOn ? 0.5 : 0.2)} />
      <directionalLight position={[10, 15, 10]} intensity={isDarkRoom ? 0.1 : (isLabOn ? 1.5 : 0.2)} castShadow shadow-mapSize={[2048, 2048]} />
      {isLabOn && !isDarkRoom && <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" distance={20} />}
      
      <Environment preset={isDarkRoom ? "night" : "city"} />
      <RoomStructure isDarkRoom={isDarkRoom} />
      
      {/* Memunculkan debu khusus saat mode gelap agar lebih dramatis */}
      {isDarkRoom && <DustParticles />}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow onPointerMissed={() => setActiveTarget(null)}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={isDarkRoom ? "#000000" : "#09090b"} roughness={0.1} metalness={0.7} />
      </mesh>
      <gridHelper args={[20, 20, isDarkRoom ? "#111" : "#27272a", isDarkRoom ? "#000" : "#18181b"]} position={[0, 0.01, 0]} />
      <ContactShadows position={[0, 0.02, 0]} opacity={0.8} scale={20} blur={2.5} far={2} />

      <group position={[0, 0, 1]}>{studentPCs}</group>
      <PCNode id="MASTER ADMIN" position={[0, 0, -6]} rotation={[0, Math.PI, 0]} isTeacher={true} activityState="idle" onFocus={(pos) => { handleFocus(pos); setLabOn(!isLabOn); }} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        <ToneMapping adaptive />
      </EffectComposer>
      <OrbitControls ref={controlsRef} makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={2} maxDistance={15} />
    </>
  );
};

export default function Lab3DView() {
  const [isLabOn, setIsLabOn] = useState(true);
  const [isDarkRoom, setIsDarkRoom] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col pt-24 transition-colors duration-700 ${isDarkRoom ? 'bg-zinc-950' : 'bg-white'}`}>
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-24">
        <div className={`mb-8 transition-colors ${isDarkRoom ? 'text-white' : 'text-black'}`}>
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Lab 3D Interaktif</h1>
              <p className={`text-base md:text-lg font-medium max-w-2xl ${isDarkRoom ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Simulasi *Real-time*. Perhatikan jam dinding yang sinkron dengan waktu Anda, dan cahaya layar yang memantul ke meja.
              </p>
            </div>
            
            <button 
              onClick={() => setIsDarkRoom(!isDarkRoom)}
              className={`p-3 rounded-full flex items-center gap-2 font-bold text-sm shadow-xl transition-all ${isDarkRoom ? 'bg-yellow-400 text-black' : 'bg-zinc-900 text-white'}`}
            >
              {isDarkRoom ? <Sun size={20} /> : <Moon size={20} />}
              {isDarkRoom ? 'Light Mode' : 'Hacker Mode'}
            </button>
          </div>
        </div>

        <div className={`w-full rounded-[2.5rem] border shadow-2xl relative flex flex-col overflow-hidden h-[700px] transition-colors duration-1000 ${isDarkRoom ? 'bg-black border-zinc-800 shadow-[0_0_50px_rgba(30,58,138,0.2)]' : 'bg-zinc-950 border-zinc-800'}`}>
          
          <div className="absolute top-6 left-6 flex justify-between items-start z-10 pointer-events-none">
            <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-3 pr-5 rounded-2xl pointer-events-auto shadow-lg">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isLabOn ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
                <Activity size={20} className={isLabOn ? 'text-emerald-400' : 'text-red-400'} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">Live Activity Sync</h3>
                <p className={`text-xs font-mono font-bold ${isLabOn ? 'text-emerald-400' : 'text-red-400'}`}>
                  Network: {isLabOn ? 'CONNECTED' : 'DISCONNECTED'}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-10 pointer-events-none flex flex-col gap-3">
             <div className="flex gap-4">
              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg text-xs font-bold text-zinc-300">
                <MousePointerClick size={14} className="text-teal-400"/> Klik PC
              </div>
              <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-700 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg text-xs font-bold text-zinc-300">
                <Clock size={14} className="text-blue-400"/> Real-time Wall Clock
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center"><div className="text-white font-mono animate-pulse">Loading AAA Environment...</div></div>}>
            <Canvas shadows camera={{ position: [0, 8, 12], fov: 45 }} className="w-full h-full">
              <LabScene isLabOn={isLabOn} isDarkRoom={isDarkRoom} setLabOn={setIsLabOn} />
            </Canvas>
          </Suspense>
        </div>
      </main>

      <footer className="w-full bg-gradient-to-r from-[#397d91] to-[#458e9f] py-14 px-6 text-white border-t border-teal-700/30 mt-auto z-30">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-5">
            <div className="font-black text-4xl tracking-wider flex items-center gap-2">
              <MonitorPlay size={40} className="text-white" /> RPL
            </div>
            <p className="text-[15px] font-medium text-white/95 leading-relaxed max-w-sm">
              Program Keahlian Rekayasa Perangkat Lunak<br/>
              SMK-IT As-Syifa Boarding School Subang.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}