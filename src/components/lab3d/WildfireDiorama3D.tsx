import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * WildfireDiorama3D: Diorama 3D Interaktif Kebakaran Hutan & Lahan Gambut Tropis
 * 
 * Lengkap dengan 10 Parameter Aksi Manusia & Rekayasa:
 * 5 Aksi Risiko:
 * 1. baraApi: Api unggun & percikan api permukaan dengan bara membara bawah tanah
 * 2. bakarLahan: Tebas bakar lahan (slash-and-burn) skala besar dengan kobaran api meluas
 * 3. kanalKering: Parit drainase gambut kering total tanpa air memicu bara gambut merekah
 * 4. sampahKaca: Pecahan botol kaca memfokuskan sinar matahari terik hingga timbul kilau titik api
 * 5. bakarSemak: Pembakaran sampah/ilalang di batas semak dengan percikan bunga api melompat
 * 
 * 5 Solusi Hijau:
 * 1. sekatKanal: Sekat bendungan kayu menaikkan muka air kanal membasahi kubah gambut
 * 2. patroliHutan: Menara pemantau titik panas dengan radar sensor berputar dan sirene dini
 * 3. sekatBakar: Koridor hijau tanaman sukulen tebal berair memutus jalur penjalaran api
 * 4. embungHutan: Kolam embung air darurat pemadam hutan dilengkapi drum pompa pemadam merah
 * 5. papanEdukasi: Papan informasi & larangan membakar hutan lindung ramah satwa
 */
export default function WildfireDiorama3D({
  weatherIntensity,
  xrayMode,
  actions,
  onSelectHotspot,
  showLabels = true,
  isEn = false,
}: DioramaProps) {
  // References for dynamic animated objects
  const canalWaterRef = useRef<THREE.Mesh>(null);
  const smokeGroupRef = useRef<THREE.Group>(null);
  const fireGroupRef = useRef<THREE.Group>(null);
  const undergroundEmbersRef = useRef<THREE.Group>(null);
  const peatMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const wildlifeGroupRef = useRef<THREE.Group>(null);
  const canalDamRef = useRef<THREE.Group>(null);
  const glassGlintRef = useRef<THREE.Mesh>(null);
  const brushSparksRef = useRef<THREE.Group>(null);
  const slashBurnFireRef = useRef<THREE.Group>(null);
  const towerRadarRef = useRef<THREE.Mesh>(null);

  // Smooth lerp values
  const currentWaterY = useRef(-0.45);
  const currentFireIntensity = useRef(0);
  const currentPeatWetness = useRef(0.5);
  const currentWildlifeOffset = useRef(0);

  // Flags aksi
  const isIgnited = !!(actions.baraApi || actions.bakarLahan || actions.bakarSemak || actions.sampahKaca);
  const hasCanalBlock = !!actions.sekatKanal;
  const isPatrolled = !!actions.patroliHutan;
  const hasFireBreak = !!actions.sekatBakar;
  const hasEmbung = !!actions.embungHutan;
  const isCanalDrained = !!actions.kanalKering;

  // Efek penjinak api: Sekat kanal & embung hutan membasahi lahan dan memadamkan api
  const isWetProtected = hasCanalBlock || hasEmbung;
  let fireTarget = 0.0;
  if (isIgnited) {
    if (isWetProtected) {
      fireTarget = 0.05; // Hanya tersisa kepulan asap kecil padam
    } else {
      fireTarget = Math.min(1.0, 0.4 + (weatherIntensity / 100) * 0.6);
      if (actions.bakarLahan) fireTarget = Math.min(1.0, fireTarget + 0.3);
    }
  }

  // 1. Setup Partikel Asap 3D
  const smokeCount = 35;
  const smokeParticles = useMemo(() => {
    return Array.from({ length: smokeCount }, () => ({
      x: 0.5 + (Math.random() - 0.5) * 1.8,
      y: 0.2 + Math.random() * 3.5,
      z: (Math.random() - 0.5) * 2.0,
      scale: 0.15 + Math.random() * 0.25,
      speed: 0.8 + Math.random() * 1.2,
      driftX: (Math.random() - 0.5) * 0.4,
    }));
  }, []);

  // 2. Loop Animasi Interaktif useFrame
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // A. Interpolasi Intensitas Api & Suhu
    currentFireIntensity.current = THREE.MathUtils.lerp(
      currentFireIntensity.current,
      fireTarget,
      delta * 2.5
    );

    const fireActive = currentFireIntensity.current > 0.04;

    // B. Animasi Lidah Api Permukaan
    if (fireGroupRef.current) {
      fireGroupRef.current.visible = fireActive;
      if (fireActive) {
        const s = currentFireIntensity.current;
        fireGroupRef.current.children.forEach((flame, idx) => {
          const flicker = Math.sin(time * 12 + idx * 2.5) * 0.15 + 0.95;
          flame.scale.set(s * flicker, s * flicker * 1.2, s * flicker);
        });
      }
    }

    // C. Bara Api Gambut Bawah Tanah (Smoldering Peat Embers)
    if (undergroundEmbersRef.current) {
      undergroundEmbersRef.current.visible = fireActive || (isCanalDrained && weatherIntensity > 50);
      if (undergroundEmbersRef.current.visible) {
        const pulse = (Math.sin(time * 4) + 1) * 0.5;
        undergroundEmbersRef.current.children.forEach((ember) => {
          const mat = (ember as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = currentFireIntensity.current * (0.8 + pulse * 1.4);
        });
      }
    }

    // D. Animasi Partikel Asap Mengepul ke Udara
    if (smokeGroupRef.current) {
      smokeGroupRef.current.visible = fireActive;
      if (fireActive) {
        const density = currentFireIntensity.current;
        smokeGroupRef.current.children.forEach((smokeNode, i) => {
          const p = smokeParticles[i];
          smokeNode.position.y += p.speed * delta;
          smokeNode.position.x += Math.sin(time * 2 + i) * delta * 0.3 + p.driftX * delta;

          if (smokeNode.position.y > 4.2) {
            smokeNode.position.y = 0.3 + Math.random() * 0.4;
            smokeNode.position.x = p.x;
          }

          const progress = (smokeNode.position.y - 0.3) / 3.9;
          const currentScale = p.scale * (1 + progress * 2.5) * density;
          smokeNode.scale.set(currentScale, currentScale, currentScale);

          const mat = (smokeNode as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, (1 - progress) * 0.65 * density);
        });
      }
    }

    // E. Ketinggian Muka Air Parit Kanal
    let targetWater = -0.45;
    if (hasCanalBlock) targetWater = -0.06;
    else if (isCanalDrained) targetWater = -0.68; // Parit kering total

    currentWaterY.current = THREE.MathUtils.lerp(currentWaterY.current, targetWater, delta * 3.0);

    if (canalWaterRef.current) {
      canalWaterRef.current.position.y = currentWaterY.current;
      canalWaterRef.current.position.y += Math.sin(time * 2.5) * 0.006;
      canalWaterRef.current.visible = !isCanalDrained;
    }

    // F. Warna Kelembapan Lapisan Gambut
    const targetWetness = hasCanalBlock || hasEmbung ? 1.0 : (isIgnited || isCanalDrained ? 0.0 : 0.4);
    currentPeatWetness.current = THREE.MathUtils.lerp(currentPeatWetness.current, targetWetness, delta * 2.2);

    if (peatMaterialRef.current) {
      const dryColor = new THREE.Color("#452b1b");
      const wetColor = new THREE.Color("#180f09");
      peatMaterialRef.current.color.copy(dryColor).lerp(wetColor, currentPeatWetness.current);
    }

    // G. Satwa Hutan Mengungsi Menjauhi Api
    const targetWildlifeMove = fireActive ? -0.85 : 0.0;
    currentWildlifeOffset.current = THREE.MathUtils.lerp(currentWildlifeOffset.current, targetWildlifeMove, delta * 2.0);

    if (wildlifeGroupRef.current) {
      wildlifeGroupRef.current.position.x = currentWildlifeOffset.current;
      wildlifeGroupRef.current.position.y = fireActive ? Math.sin(time * 10) * 0.02 : Math.sin(time * 1.5) * 0.01;
    }

    // H. Animasi Kilau Pecahan Kaca (sampahKaca)
    if (glassGlintRef.current && actions.sampahKaca) {
      const glint = (Math.sin(time * 6) + 1) * 0.5;
      const mat = glassGlintRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + glint * 2.5;
      glassGlintRef.current.scale.setScalar(0.8 + glint * 0.5);
    }

    // I. Animasi Percikan Api Semak Belukar (bakarSemak)
    if (brushSparksRef.current) {
      brushSparksRef.current.visible = actions.bakarSemak;
      if (actions.bakarSemak) {
        brushSparksRef.current.children.forEach((spark, idx) => {
          const sparkCycle = (time * (4 + idx) + idx * 0.6) % 1.0;
          spark.position.y = 0.15 + sparkCycle * 0.4;
          spark.position.x = 0.3 + Math.sin(time * 10 + idx) * 0.1;
        });
      }
    }

    // J. Animasi Pembakaran Lahan Besar (bakarLahan)
    if (slashBurnFireRef.current) {
      slashBurnFireRef.current.visible = actions.bakarLahan;
      if (actions.bakarLahan) {
        slashBurnFireRef.current.children.forEach((flame, idx) => {
          const flameFlicker = Math.sin(time * 14 + idx * 3) * 0.2 + 0.9;
          flame.scale.set(flameFlicker, flameFlicker * 1.3, flameFlicker);
        });
      }
    }

    // K. Radar Menara Pantau Berputar (patroliHutan)
    if (towerRadarRef.current && actions.patroliHutan) {
      towerRadarRef.current.rotation.y = time * 2.5;
    }
  });

  // Material X-Ray Setting
  const groundOpacity = xrayMode ? 0.25 : 1.0;
  const groundTransparent = xrayMode;

  return (
    <group position={[0, -0.3, 0]}>
      {/* =========================================================================
          1. PARTIKEL ASAP 3D
         ========================================================================= */}
      <group ref={smokeGroupRef}>
        {smokeParticles.map((pt, i) => (
          <mesh key={i} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.2, 5, 5]} />
            <meshBasicMaterial color="#64748b" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* =========================================================================
          2. POTONGAN 3 LAPISAN GEOLOGI TANAH GAMBUT (PEAT DOME)
         ========================================================================= */}
      {/* A. Lapisan Tanah Mineral Substrat Bawah */}
      <mesh receiveShadow position={[0, -1.25, 0]}>
        <boxGeometry args={[5.4, 0.7, 5.4]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* B. Lapisan Kubah Gambut Tebal */}
      <mesh receiveShadow position={[-1.52, -0.4, 0]}>
        <boxGeometry args={[2.35, 1.0, 5.4]} />
        <meshStandardMaterial
          ref={peatMaterialRef}
          color="#180f09"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      <mesh receiveShadow position={[1.52, -0.4, 0]}>
        <boxGeometry args={[2.35, 1.0, 5.4]} />
        <meshStandardMaterial
          color="#180f09"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* Dasar Palung Kanal Tengah */}
      <mesh receiveShadow position={[0, -0.7, 0]}>
        <boxGeometry args={[0.7, 0.4, 5.4]} />
        <meshStandardMaterial
          color="#180f09"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* C. Permukaan Lantai Hutan Tropis */}
      <mesh receiveShadow position={[-1.52, 0.11, 0]}>
        <boxGeometry args={[2.35, 0.04, 5.4]} />
        <meshStandardMaterial
          color={isIgnited && !isWetProtected ? "#523620" : "#2d6a4f"}
          roughness={0.8}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      <mesh receiveShadow position={[1.52, 0.11, 0]}>
        <boxGeometry args={[2.35, 0.04, 5.4]} />
        <meshStandardMaterial
          color={isIgnited && !isWetProtected ? "#3f2514" : "#1b4332"}
          roughness={0.8}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* =========================================================================
          3. PARIT KANAL DRAINASE & AKSI RISIKO 3: KANAL KERING (kanalKering)
         ========================================================================= */}
      {/* Air Parit Kanal */}
      <mesh ref={canalWaterRef} position={[0, -0.45, 0]}>
        <boxGeometry args={[0.68, 0.28, 5.38]} />
        <meshStandardMaterial
          color={hasCanalBlock ? "#0284c7" : "#45240f"}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={hasCanalBlock ? 0.85 : 0.6}
        />
      </mesh>

      {/* Jika kanalKering: Dasar Kanal Retak-Retak Hitam Kering */}
      {isCanalDrained && (
        <group position={[0, -0.48, 0]}>
          <mesh>
            <boxGeometry args={[0.66, 0.04, 5.38]} />
            <meshStandardMaterial color="#171717" roughness={1} />
          </mesh>
          {[-1.5, 0, 1.5].map((zPos, idx) => (
            <mesh key={idx} position={[0, 0.03, zPos]} rotation={[0, 0.4, 0]}>
              <boxGeometry args={[0.04, 0.02, 1.2]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
          ))}
        </group>
      )}

      {/* AKSI SOLUSI 1: KONSTRUKSI SEKAT KANAL DARI KAYU (sekatKanal) */}
      {hasCanalBlock && (
        <group ref={canalDamRef} position={[0, -0.05, 0]}>
          {[-0.32, -0.16, 0.0, 0.12].map((yOffset, i) => (
            <mesh key={i} position={[0, yOffset, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.72, 8]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[-0.28, -0.1, -0.12]}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0.28, -0.1, -0.12]}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 0.08, 0.14]}>
            <boxGeometry args={[0.25, 0.04, 0.2]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {/* AKSI SOLUSI 2: POS PANTAU / MENARA PENGAWAS PATROLI HUTAN (patroliHutan) */}
      {actions.patroliHutan && (
        <group position={[-2.1, 0.13, -1.8]}>
          {[-0.2, 0.2].map((x) =>
            [-0.2, 0.2].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.65, z]}>
                <cylinderGeometry args={[0.02, 0.025, 1.3, 4]} />
                <meshStandardMaterial color="#5c3a21" />
              </mesh>
            ))
          )}
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.55, 0.06, 0.55]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 1.75, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.42, 0.35, 4]} />
            <meshStandardMaterial color="#b91c1c" />
          </mesh>
          {/* Radar Telemetri Berputar */}
          <mesh ref={towerRadarRef} position={[0, 1.95, 0]}>
            <boxGeometry args={[0.18, 0.03, 0.03]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )}

      {/* AKSI SOLUSI 3: JALUR SEKAT BAKAR HIJAU (sekatBakar) */}
      {actions.sekatBakar && (
        <group position={[0.45, 0.13, 0]}>
          {/* Koridor Terbuka Penahan Api Tanpa Semak Kering */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.3, 0.02, 5.38]} />
            <meshStandardMaterial color="#65a30d" roughness={0.7} />
          </mesh>
          {/* Barisan Tanaman Sukulen Berair Penghalau Api (Pohon Pisang Hutan) */}
          {[-1.8, -0.6, 0.6, 1.8].map((zPos, idx) => (
            <group key={idx} position={[0, 0, zPos]}>
              <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 0.5, 6]} />
                <meshStandardMaterial color="#84cc16" />
              </mesh>
              <mesh position={[0, 0.55, 0]}>
                <coneGeometry args={[0.22, 0.45, 5]} />
                <meshStandardMaterial color="#4ade80" />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* AKSI SOLUSI 4: EMBUNG AIR PEMADAM HUTAN (embungHutan) */}
      {actions.embungHutan && (
        <group position={[-1.4, 0.14, -1.4]}>
          {/* Kolam Embung Air Hutan */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.2, 0.18, 1.0]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[1.05, 0.14, 0.85]} />
            <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.2} />
          </mesh>
          {/* Drum Pompa Pemadam Merah */}
          <mesh position={[0.65, 0.15, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.25, 8]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          {/* Selang Air Pemadam */}
          <mesh position={[0.65, 0.08, 0.2]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.08, 0.02, 4, 10]} />
            <meshStandardMaterial color="#facc15" />
          </mesh>
        </group>
      )}

      {/* AKSI SOLUSI 5: PAPAN PERINGATAN ZONA BEBAS API (papanEdukasi) */}
      {actions.papanEdukasi && (
        <group position={[-0.8, 0.14, 1.9]}>
          {/* Tiang Kayu */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 5]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Papan Pengumuman Kayu */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.45, 0.25, 0.04]} />
            <meshStandardMaterial color="#fef08a" roughness={0.6} />
          </mesh>
          {/* Garis Merah Simbol Dilarang Membakar */}
          <mesh position={[0, 0.45, 0.025]}>
            <circleGeometry args={[0.08, 12]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0, 0.45, 0.028]}>
            <boxGeometry args={[0.14, 0.02, 0.01]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          4. AKSI RISIKO: TITIK API, BAKAR LAHAN, BOTOL KACA & BAKAR SEMAK
         ========================================================================= */}
      {/* AKSI RISIKO 1: API UNGGUN & BARA PERMUKAAN (baraApi) */}
      <group ref={fireGroupRef} position={[1.4, 0.14, 0]}>
        <group position={[-0.4, 0.15, -0.6]}>
          <mesh position={[0, 0.15, 0]}>
            <coneGeometry args={[0.22, 0.55, 5]} />
            <meshStandardMaterial color="#ff4500" emissive="#ff4500" emissiveIntensity={1.8} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <coneGeometry args={[0.14, 0.35, 5]} />
            <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={2.0} />
          </mesh>
        </group>
        <group position={[0.3, 0.18, 0.4]}>
          <mesh position={[0, 0.2, 0]}>
            <coneGeometry args={[0.26, 0.65, 5]} />
            <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={1.6} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.16, 0.4, 5]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2.2} />
          </mesh>
        </group>
      </group>

      {/* AKSI RISIKO 2: TEBAS BAKAR LAHAN BESAR (bakarLahan) */}
      {actions.bakarLahan && (
        <group ref={slashBurnFireRef} position={[1.8, 0.14, 1.2]}>
          {/* Petak Arang Hitam Hangus */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[1.2, 0.02, 1.4]} />
            <meshStandardMaterial color="#0a0a0a" roughness={1} />
          </mesh>
          {/* Lidah Api Liar Menjalar */}
          {[-0.3, 0.2].map((xOff, idx) => (
            <mesh key={idx} position={[xOff, 0.25, (idx - 0.5) * 0.4]}>
              <coneGeometry args={[0.2, 0.6, 5]} />
              <meshStandardMaterial color="#ff3300" emissive="#ff4500" emissiveIntensity={2.2} />
            </mesh>
          ))}
        </group>
      )}

      {/* AKSI RISIKO 4: SAMPAH BOTOL KACA DENGAN KILAU CAHAYA (sampahKaca) */}
      {actions.sampahKaca && (
        <group position={[1.1, 0.14, -1.6]}>
          {/* Botol Kaca Rebah */}
          <mesh rotation={[Math.PI / 2, 0, 0.4]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 8]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.8} />
          </mesh>
          {/* Kilau Pendaran Titik Api Spontan */}
          <mesh ref={glassGlintRef} position={[0, 0.08, 0]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial color="#facc15" emissive="#f59e0b" emissiveIntensity={2.0} />
          </mesh>
        </group>
      )}

      {/* AKSI RISIKO 5: PEMBAKARAN SEMAK & BUNGA API (bakarSemak) */}
      {actions.bakarSemak && (
        <group position={[1.2, 0.14, 0.9]}>
          {/* Tumpukan Ranting Semak Terbakar */}
          <mesh position={[0, 0.06, 0]}>
            <dodecahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color="#1c1917" />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <coneGeometry args={[0.15, 0.35, 5]} />
            <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={1.8} />
          </mesh>
          {/* Percikan Bunga Api Melompat */}
          <group ref={brushSparksRef}>
            {[0, 1, 2].map((idx) => (
              <mesh key={idx} position={[0, 0, 0]}>
                <sphereGeometry args={[0.02, 4, 4]} />
                <meshBasicMaterial color="#facc15" />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* B. BARA API GAMBUT BAWAH TANAH (SUBTERRANEAN SMOLDERING EMBERS) */}
      <group ref={undergroundEmbersRef} position={[1.4, -0.35, 0]}>
        <mesh position={[-0.3, 0.1, -0.5]}>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ff4500"
            emissiveIntensity={1.5}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0.2, -0.12, 0.4]}>
          <dodecahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#dc2626"
            emissive="#f97316"
            emissiveIntensity={1.8}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-0.8, 0.0, 0.2]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#b91c1c"
            emissive="#ef4444"
            emissiveIntensity={1.4}
            roughness={0.3}
          />
        </mesh>

        {xrayMode && (
          <mesh position={[-0.3, 0.0, 0]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[1.2, 0.04, 1.2]} />
            <meshBasicMaterial color="#ff6b00" wireframe transparent opacity={0.65} />
          </mesh>
        )}
      </group>

      {/* =========================================================================
          5. PEPOHONAN HUTAN HUJAN TROPIS (CANOPY & STILT ROOTS)
         ========================================================================= */}
      <group position={[-1.4, 0.14, 0.4]}>
        <mesh castShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 1.6, 7]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
        <mesh position={[0.18, 0.1, 0.15]} rotation={[0.4, 0, -0.4]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 5]} />
          <meshStandardMaterial color="#3b1d07" />
        </mesh>
        <mesh position={[-0.18, 0.1, -0.15]} rotation={[-0.3, 0, 0.4]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 5]} />
          <meshStandardMaterial color="#3b1d07" />
        </mesh>
        <mesh castShadow position={[0, 1.7, 0]}>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color="#1b4332" roughness={0.7} />
        </mesh>
      </group>

      <group position={[-1.8, 0.14, 1.6]}>
        <mesh castShadow position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.08, 0.11, 1.1, 6]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh castShadow position={[0, 1.2, 0]}>
          <coneGeometry args={[0.55, 0.9, 6]} />
          <meshStandardMaterial color="#2d6a4f" />
        </mesh>
      </group>

      {/* Pohon Sisi Kanan (Bisa Terbakar jika Aksi Bara Aktif) */}
      <group position={[1.5, 0.14, -1.2]}>
        <mesh castShadow position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.11, 0.15, 1.4, 6]} />
          <meshStandardMaterial
            color={isIgnited && !isWetProtected ? "#262626" : "#451a03"}
          />
        </mesh>
        <mesh castShadow position={[0, 1.5, 0]}>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color={isIgnited && !isWetProtected ? "#854d0e" : "#15803d"}
          />
        </mesh>
      </group>

      {/* =========================================================================
          6. DUA (2) SATWA ENDEMIK HUTAN GAMBUT: ORANGUTAN & BURUNG RANGKONG
         ========================================================================= */}
      <group ref={wildlifeGroupRef} position={[0, 0, 0]}>
        {/* SATWA 1: ORANGUTAN KALIMANTAN */}
        <group position={[-1.15, 0.85, 0.35]}>
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.18, 7, 7]} />
            <meshStandardMaterial color="#c2410c" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.38, 0.05]}>
            <sphereGeometry args={[0.12, 7, 7]} />
            <meshStandardMaterial color="#9a3412" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.38, 0.14]}>
            <circleGeometry args={[0.07, 7]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[-0.14, 0.18, 0.05]} rotation={[0, 0, 0.7]}>
            <cylinderGeometry args={[0.035, 0.03, 0.3, 5]} />
            <meshStandardMaterial color="#c2410c" />
          </mesh>
          <mesh position={[0.14, 0.22, 0.05]} rotation={[0, 0, -0.6]}>
            <cylinderGeometry args={[0.035, 0.03, 0.3, 5]} />
            <meshStandardMaterial color="#c2410c" />
          </mesh>
        </group>

        {/* SATWA 2: BURUNG RANGKONG / ENGGANG */}
        <group position={[-1.55, 1.85, 0.2]}>
          <mesh position={[0, 0.08, 0]}>
            <capsuleGeometry args={[0.07, 0.14, 4, 6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.06, -0.1]} rotation={[-0.5, 0, 0]}>
            <boxGeometry args={[0.05, 0.18, 0.02]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0, 0.22, 0.05]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.23, 0.14]} rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.045, 0.16, 5]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.28, 0.1]}>
            <boxGeometry args={[0.04, 0.05, 0.09]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          7. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}
      {/* Hotspot 1: Lapisan Tanah Gambut */}
      <HotspotPin3D
        position={[1.4, -0.4, 2.0]}
        title={isEn ? "Peatland Soil Stratum" : "Lapisan Tanah Gambut"}
        badge={isEn ? "Giant Carbon Sponge" : "Spons Karbon Raksasa"}
        color="bg-amber-700"
        showLabel={showLabels}
        description={
          isEn
            ? "Peat is an accumulation of ancient decayed organic matter waterlogged for millennia. If drainage canals drain this water, the peat dries into coal-like fuel and sparks underground fires that are nearly impossible to extinguish."
            : "Gambut adalah timbunan bahan organik tumbuhan purba terendam air ribuan tahun. Jika parit kanal menguras airnya, gambut menjadi kering bagaikan batu bara dan memicu kebakaran bawah tanah yang sulit dipadamkan."
        }
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Sekat Kanal Pembasah */}
      <HotspotPin3D
        position={[0.0, 0.6, -1.3]}
        title={isEn ? "Canal Blocking for Rewetting" : "Sekat Kanal Pembasah"}
        badge={isEn ? "Rewetting Restoration" : "Restorasi Rewetting"}
        color="bg-sky-600"
        showLabel={showLabels}
        description={
          isEn
            ? "Blocking drainage canals prevents water from draining away, raising the water table and re-hydrating the peat dome so subterranean fires cannot ignite or spread."
            : "Penyekatan parit kanal menahan aliran air agar tidak terkuras keluar, menaikkan muka air tanah kembali, dan membasahi kubah gambut sehingga api bawah tanah tidak mungkin menyala."
        }
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Habitat Satwa Hutan */}
      <HotspotPin3D
        position={[-1.5, 1.6, 0.5]}
        title={isEn ? "Forest Wildlife Habitat" : "Habitat Satwa Hutan"}
        badge={isEn ? "Tropical Biodiversity" : "Biodiversitas Tropis"}
        color="bg-emerald-600"
        showLabel={showLabels}
        description={
          isEn
            ? "Natural peat swamp forests provide vital habitat for endangered endemic wildlife like Orangutans and Hornbills. Preserving peat moisture safeguards these species from deadly wildfire smoke and deforestation."
            : "Hutan rawa gambut alami adalah rumah bagi satwa endemik langka seperti Orangutan dan Burung Rangkong. Menjaga kelembapan gambut melindungi satwa dari ancaman kepunahan akibat kabut asap kebakaran."
        }
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
