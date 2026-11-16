import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * LandslideDiorama3D: Diorama 3D Interaktif Tanah Longsor & Lereng Bukit
 * 
 * Lengkap dengan 10 Parameter Aksi Manusia & Rekayasa:
 * 5 Aksi Risiko:
 * 1. tebangLiar: Deforestasi lereng, tunggul kayu, rekahan tanah merekah, memicu luncuran
 * 2. potongTebing: Pemotongan lereng vertikal tanpa penahan + kerikil runtuh
 * 3. rumahKakiBukit: Rumah hunian tepat di zona luncuran berbahaya kaki tebing tertimbun
 * 4. limbahLereng: Pipa pembuangan air limbah menjenuhkan permukaan tebing jadi lumpur licin
 * 5. lahanMonokultur: Kebun sayur semusim berakar dangkal mudah tergerus di lereng curam
 * 
 * 5 Solusi Hijau:
 * 1. tanamPohon: Vetiver & pohon kayu berakar tunjang dalam mengunci batuan dasar (X-Ray)
 * 2. terasering: Undakan berjenjang memecah kecepatan aliran air hujan
 * 3. bronjong: Dinding penahan kawat batu (gabion) di kaki tebing menahan luncuran tanah
 * 4. drainaseLereng: Saluran beton bertingkat mengalirkan kelebihan air lereng dengan aman
 * 5. sensorLereng: Ekstensometer pemantau dini tanah dengan lampu sirene LED berkedip
 */
export default function LandslideDiorama3D({
  weatherIntensity,
  xrayMode,
  actions,
  onSelectHotspot,
  showLabels = true,
}: DioramaProps) {
  // References for animation
  const slideBlockRef = useRef<THREE.Group>(null);
  const rainGroupRef = useRef<THREE.Group>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const topsoilMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const houseTiltRef = useRef<THREE.Group>(null);
  const vulnerableHouseRef = useRef<THREE.Group>(null);
  const crackMeshRef = useRef<THREE.Mesh>(null);
  const sensorLedRef = useRef<THREE.Mesh>(null);
  const slopeDrainageFlowRef = useRef<THREE.Group>(null);
  const wastewaterFlowRef = useRef<THREE.Group>(null);
  const fallingPebblesRef = useRef<THREE.Group>(null);
  const treesGroupRef = useRef<THREE.Group>(null);

  // Smooth lerp values
  const currentSlide = useRef(0);
  const currentSoilDarkness = useRef(0);

  // 1. Partikel Hujan (Low-poly raindrops)
  const rainCount = 85;
  const rainPositions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 1] = 1.0 + Math.random() * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
    }
    return pos;
  }, []);

  // Flags kondisi simulasi
  const hasTrees = !!(actions.tanamPohon || actions.rumputVetiver);
  const hasTerracing = !!actions.terasering;
  const hasBronjong = !!actions.bronjong;
  const isDeforested = !!(actions.tebangLiar || actions.lahanMonokultur);
  const isSteepCut = !!(actions.potongTebing || actions.limbahLereng);

  // Kondisi kritis longsor terjadi jika ada aksi risiko & cuaca hujan tinggi tanpa perlindungan bronjong/pohon
  const isProtected = (hasTrees && hasBronjong) || (hasTerracing && hasBronjong);
  const isLandslideTriggered = (isDeforested || isSteepCut) && weatherIntensity > 50 && !isProtected;

  // 2. Loop Animasi useFrame
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // A. Animasi Hujan
    if (rainGroupRef.current) {
      const isRaining = weatherIntensity > 10;
      rainGroupRef.current.visible = isRaining;

      if (isRaining) {
        const speed = 4 + (weatherIntensity / 100) * 11;
        const drops = rainGroupRef.current.children;
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          drop.position.y -= speed * delta;
          if (drop.position.y < 0.2) {
            drop.position.y = 5.5 + Math.random() * 1.5;
          }
        }
      }
    }

    // B. Awan Melayang Rendah
    if (cloudGroupRef.current) {
      cloudGroupRef.current.position.x = Math.sin(time * 0.35) * 0.3;
      cloudGroupRef.current.position.z = Math.cos(time * 0.28) * 0.3;
    }

    // C. Luncuran Massa Tanah Longsor (Lerp)
    // Jika ada bronjong, pergerakan longsor terhambat di kaki lereng
    const targetSlide = isLandslideTriggered ? (hasBronjong ? 0.35 : 1.0) : 0.0;
    currentSlide.current = THREE.MathUtils.lerp(currentSlide.current, targetSlide, delta * 2.2);

    if (slideBlockRef.current) {
      const s = currentSlide.current;
      slideBlockRef.current.position.x = -0.4 + s * 1.45;
      slideBlockRef.current.position.y = 0.95 - s * 0.65;
      slideBlockRef.current.rotation.z = -s * 0.22;
      slideBlockRef.current.visible = isDeforested || isSteepCut;
    }

    // Retakan tanah di lereng atas merekah saat mendekati longsor
    if (crackMeshRef.current) {
      const crackIntensity = isDeforested && weatherIntensity > 35 ? Math.min(1, (weatherIntensity - 35) / 45) : 0;
      crackMeshRef.current.scale.set(1, crackIntensity, 1);
      crackMeshRef.current.visible = crackIntensity > 0.05;
    }

    // Rumah mini tertimbun / terdorong
    if (houseTiltRef.current) {
      const dangerTilt = currentSlide.current > 0.6 ? (currentSlide.current - 0.6) * 0.28 : 0;
      houseTiltRef.current.rotation.z = dangerTilt;
      houseTiltRef.current.position.y = -dangerTilt * 0.2;
    }

    if (vulnerableHouseRef.current) {
      const dangerTilt = currentSlide.current > 0.4 ? (currentSlide.current - 0.4) * 0.45 : 0;
      vulnerableHouseRef.current.rotation.z = dangerTilt;
      vulnerableHouseRef.current.position.y = 0.14 - dangerTilt * 0.25;
      vulnerableHouseRef.current.rotation.x = dangerTilt * 0.3;
    }

    // D. Warna Tanah Menghitam Karena Jenuh Air (Waterlogged mud)
    const targetSaturation = (isDeforested || actions.limbahLereng) && weatherIntensity > 50 ? (weatherIntensity - 50) / 50 : 0;
    currentSoilDarkness.current = THREE.MathUtils.lerp(currentSoilDarkness.current, targetSaturation, delta * 3.0);

    if (topsoilMatRef.current) {
      const baseCol = new THREE.Color("#6b4423");
      const wetCol = new THREE.Color("#26160d");
      topsoilMatRef.current.color.copy(baseCol).lerp(wetCol, currentSoilDarkness.current);
    }

    // E. Animasi Lampu Sensor Peringatan Dini (sensorLereng)
    if (sensorLedRef.current && actions.sensorLereng) {
      const mat = sensorLedRef.current.material as THREE.MeshStandardMaterial;
      if (isLandslideTriggered) {
        // Bahaya besar: Merah kedip cepat
        const blink = Math.sin(time * 16) > 0 ? 1 : 0.1;
        mat.color.set("#ef4444");
        mat.emissive.set("#ef4444");
        mat.emissiveIntensity = blink * 2.5;
      } else if (weatherIntensity > 50) {
        // Waspada: Kuning kedip sedang
        const blink = Math.sin(time * 8) > 0 ? 1 : 0.2;
        mat.color.set("#eab308");
        mat.emissive.set("#eab308");
        mat.emissiveIntensity = blink * 1.8;
      } else {
        // Aman: Hijau stabil
        mat.color.set("#22c55e");
        mat.emissive.set("#22c55e");
        mat.emissiveIntensity = 0.8;
      }
    }

    // F. Animasi Air Mengalir Cepat di Saluran Drainase Lereng (drainaseLereng)
    if (slopeDrainageFlowRef.current) {
      slopeDrainageFlowRef.current.visible = actions.drainaseLereng && weatherIntensity > 15;
      if (actions.drainaseLereng) {
        slopeDrainageFlowRef.current.children.forEach((waterDrop, idx) => {
          const flowCycle = (time * 3.2 + idx * 0.35) % 1.0;
          // Meluncur miring sepanjang saluran V
          waterDrop.position.x = -1.2 + flowCycle * 2.0;
          waterDrop.position.y = 0.85 - flowCycle * 0.7;
        });
      }
    }

    // G. Animasi Aliran Air Limbah Mencemari Lereng (limbahLereng)
    if (wastewaterFlowRef.current) {
      wastewaterFlowRef.current.visible = actions.limbahLereng;
      if (actions.limbahLereng) {
        wastewaterFlowRef.current.children.forEach((drop, idx) => {
          const flowCycle = (time * 2.0 + idx * 0.4) % 1.0;
          drop.position.x = -1.1 + flowCycle * 1.3;
          drop.position.y = 0.78 - flowCycle * 0.5;
          drop.position.z = -0.5 + flowCycle * 0.2;
        });
      }
    }

    // H. Animasi Kerikil Jatuh pada Tebing Terpotong (potongTebing)
    if (fallingPebblesRef.current) {
      fallingPebblesRef.current.visible = actions.potongTebing;
      if (actions.potongTebing) {
        fallingPebblesRef.current.children.forEach((peb, idx) => {
          const fallCycle = (time * (1.5 + idx * 0.5) + idx * 0.8) % 1.0;
          peb.position.y = 0.65 - fallCycle * 0.5;
          peb.position.x = -0.15 + Math.sin(time * 5 + idx) * 0.05;
        });
      }
    }

    // I. Goyangan Pohon Terhembus Angin
    if (treesGroupRef.current) {
      treesGroupRef.current.children.forEach((tree, idx) => {
        tree.rotation.z = Math.sin(time * 1.8 + idx) * 0.035;
      });
    }
  });

  // Material X-Ray Setting
  const groundOpacity = xrayMode ? 0.25 : 1.0;
  const groundTransparent = xrayMode;

  return (
    <group position={[0, -0.3, 0]}>
      {/* =========================================================================
          1. PARTIKEL HUJAN & AWAN
         ========================================================================= */}
      <group ref={rainGroupRef}>
        {Array.from({ length: rainCount }).map((_, i) => (
          <mesh
            key={i}
            position={[
              rainPositions[i * 3],
              rainPositions[i * 3 + 1],
              rainPositions[i * 3 + 2],
            ]}
          >
            <cylinderGeometry args={[0.015, 0.015, 0.28, 4]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
        ))}
      </group>

      <group ref={cloudGroupRef} position={[0, 4.5, 0]}>
        <group position={[-1.2, 0, -1.0]}>
          <mesh castShadow position={[0, 0, 0]}>
            <sphereGeometry args={[0.65, 7, 7]} />
            <meshStandardMaterial color={weatherIntensity > 65 ? "#64748b" : "#ffffff"} roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0.45, -0.1, 0.2]}>
            <sphereGeometry args={[0.5, 7, 7]} />
            <meshStandardMaterial color={weatherIntensity > 65 ? "#64748b" : "#ffffff"} roughness={0.9} />
          </mesh>
          <mesh castShadow position={[-0.45, -0.05, 0]}>
            <sphereGeometry args={[0.45, 7, 7]} />
            <meshStandardMaterial color={weatherIntensity > 65 ? "#64748b" : "#ffffff"} roughness={0.9} />
          </mesh>
        </group>
        <group position={[1.4, 0.2, 0.8]}>
          <mesh castShadow position={[0, 0, 0]}>
            <sphereGeometry args={[0.55, 7, 7]} />
            <meshStandardMaterial color={weatherIntensity > 65 ? "#475569" : "#f8fafc"} roughness={0.9} />
          </mesh>
          <mesh castShadow position={[0.4, -0.08, 0]}>
            <sphereGeometry args={[0.4, 7, 7]} />
            <meshStandardMaterial color={weatherIntensity > 65 ? "#475569" : "#f8fafc"} roughness={0.9} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          2. POTONGAN 3 LAPISAN GEOLOGI (CROSS-SECTION CUTAWAY)
         ========================================================================= */}
      {/* A. LAPISAN 1: BATUAN DASAR (BEDROCK) */}
      <mesh receiveShadow position={[0, -1.15, 0]}>
        <boxGeometry args={[5.4, 0.9, 5.4]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.95}
          metalness={0.1}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>
      <mesh position={[0, -0.7, 2.71]}>
        <boxGeometry args={[5.4, 0.04, 0.02]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh position={[2.71, -0.7, 0]}>
        <boxGeometry args={[0.02, 0.04, 5.4]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>

      {/* B. LAPISAN 2: LAPISAN LEMPUNG (CLAY - BIDANG GELINCIR) */}
      <mesh receiveShadow position={[1.35, -0.4, 0]}>
        <boxGeometry args={[2.7, 0.6, 5.4]} />
        <meshStandardMaterial
          color="#8d4925"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>
      <group position={[-0.8, -0.15, 0]} rotation={[0, 0, 0.32]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 0.65, 5.4]} />
          <meshStandardMaterial
            color="#8d4925"
            roughness={0.9}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>
      </group>
      <mesh receiveShadow position={[-2.1, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.8, 5.4]} />
        <meshStandardMaterial
          color="#8d4925"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* Aksen Indikator Bidang Gelincir dalam X-Ray */}
      {xrayMode && (
        <group position={[-0.75, 0.22, 0]} rotation={[0, 0, 0.32]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.9, 0.03, 5.42]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      )}

      {/* C. LAPISAN 3: LAPISAN TOPSOIL & RUMPUT KAKI LERENG */}
      <mesh receiveShadow position={[1.35, 0.0, 0]}>
        <boxGeometry args={[2.7, 0.22, 5.4]} />
        <meshStandardMaterial
          ref={topsoilMatRef}
          color="#5c4033"
          roughness={0.85}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>
      <mesh receiveShadow position={[1.35, 0.12, 0]}>
        <boxGeometry args={[2.7, 0.04, 5.4]} />
        <meshStandardMaterial
          color={isDeforested && weatherIntensity > 65 ? "#4d5b43" : "#38a169"}
          roughness={0.7}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* =========================================================================
          3. KONTUR LERENG: LERENG CURAM VS TERASERING BERUNDAK
         ========================================================================= */}
      {!hasTerracing ? (
        <group position={[-0.8, 0.45, 0]} rotation={[0, 0, 0.32]}>
          <mesh receiveShadow castShadow position={[0, 0, 0]}>
            <boxGeometry args={[2.7, 0.24, 5.4]} />
            <meshStandardMaterial
              color="#5c4033"
              roughness={0.85}
              transparent={groundTransparent}
              opacity={groundOpacity}
            />
          </mesh>
          <mesh receiveShadow position={[0, 0.13, 0]}>
            <boxGeometry args={[2.7, 0.04, 5.4]} />
            <meshStandardMaterial
              color={
                isDeforested
                  ? isLandslideTriggered
                    ? "#332219"
                    : "#6c584c"
                  : "#2f855a"
              }
              roughness={0.8}
              transparent={groundTransparent}
              opacity={groundOpacity}
            />
          </mesh>
        </group>
      ) : (
        /* Skenario B: Terasering Berundak-undak (Stepped Bench Terraces) */
        <group position={[0, 0, 0]}>
          {/* Undakan Terasering 1 (Bawah) */}
          <group position={[0.2, 0.22, 0]}>
            <mesh receiveShadow castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.9, 0.24, 5.38]} />
              <meshStandardMaterial color="#40916c" roughness={0.7} />
            </mesh>
            <mesh position={[0.43, -0.06, 0]}>
              <boxGeometry args={[0.08, 0.35, 5.38]} />
              <meshStandardMaterial color="#64748b" roughness={0.9} />
            </mesh>
          </group>

          {/* Undakan Terasering 2 (Tengah) */}
          <group position={[-0.6, 0.48, 0]}>
            <mesh receiveShadow castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.95, 0.26, 5.38]} />
              <meshStandardMaterial color="#38a169" roughness={0.7} />
            </mesh>
            <mesh position={[-0.38, 0.12, 0]}>
              <boxGeometry args={[0.12, 0.05, 5.38]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
            <mesh position={[0.45, -0.07, 0]}>
              <boxGeometry args={[0.08, 0.4, 5.38]} />
              <meshStandardMaterial color="#64748b" roughness={0.9} />
            </mesh>
          </group>

          {/* Undakan Terasering 3 (Atas) */}
          <group position={[-1.45, 0.76, 0]}>
            <mesh receiveShadow castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.95, 0.28, 5.38]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
            </mesh>
            <mesh position={[0.45, -0.08, 0]}>
              <boxGeometry args={[0.08, 0.45, 5.38]} />
              <meshStandardMaterial color="#64748b" roughness={0.9} />
            </mesh>
          </group>
        </group>
      )}

      {/* Puncak Bukit Sebelah Kiri */}
      <group position={[-2.2, 0.88, 0]}>
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.0, 0.32, 5.4]} />
          <meshStandardMaterial
            color="#5c4033"
            roughness={0.85}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>
        <mesh receiveShadow position={[0, 0.17, 0]}>
          <boxGeometry args={[1.0, 0.04, 5.4]} />
          <meshStandardMaterial
            color={isDeforested ? "#524339" : "#2d6a4f"}
            roughness={0.7}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>
      </group>

      {/* =========================================================================
          4. AKSI RISIKO 2: PEMOTONGAN LERENG TERJAL (potongTebing)
         ========================================================================= */}
      {actions.potongTebing && (
        <group position={[-0.1, 0.45, 0]}>
          {/* Potongan Tebing Vertikal Menganga Tanpa Dinding Penahan */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.14, 0.65, 5.38]} />
            <meshStandardMaterial color="#78350f" roughness={0.95} />
          </mesh>
          {/* Bebatuan Kerikil Kasar yang Runtuh Berjatuhan */}
          <group ref={fallingPebblesRef}>
            {[-1.2, 0, 1.2].map((zPos, idx) => (
              <mesh key={idx} position={[0, 0, zPos]}>
                <dodecahedronGeometry args={[0.05, 0]} />
                <meshStandardMaterial color="#475569" roughness={0.9} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* =========================================================================
          5. AKSI RISIKO 4: LIMBAH CAIR MENJENUHKAN LERENG (limbahLereng)
         ========================================================================= */}
      {actions.limbahLereng && (
        <group position={[-1.2, 0.85, -0.6]}>
          {/* Pipa Paralon PVC Limbah Menjorok Keluar Lereng */}
          <mesh rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.2} roughness={0.4} />
          </mesh>
          {/* Saluran Rembesan Lumpur Basah Berminyak di Permukaan Lereng */}
          <mesh position={[0.4, -0.22, 0.1]} rotation={[-Math.PI / 2, 0, 0.35]}>
            <planeGeometry args={[0.25, 0.8]} />
            <meshStandardMaterial color="#1c1917" roughness={0.2} metalness={0.3} transparent opacity={0.85} />
          </mesh>
          {/* Animasi Tetesan Air Limbah */}
          <group ref={wastewaterFlowRef}>
            {[0, 1, 2].map((idx) => (
              <mesh key={idx} position={[0, 0, 0]}>
                <sphereGeometry args={[0.03, 5, 5]} />
                <meshBasicMaterial color="#334155" />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* =========================================================================
          6. AKSI RISIKO 5: KEBUN MONOKULTUR BERAKAR PENDEK (lahanMonokultur)
         ========================================================================= */}
      {actions.lahanMonokultur && (
        <group position={[-1.0, 0.65, 0.6]}>
          {/* Barisan Petak Sayur Kol / Kubis Semusim di Lereng Curam */}
          {[-0.6, 0, 0.6].map((zOff, rIdx) => (
            <group key={rIdx} position={[0, 0, zOff]}>
              <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0.32]}>
                <boxGeometry args={[0.4, 0.04, 0.35]} />
                <meshStandardMaterial color="#713f12" roughness={0.9} />
              </mesh>
              {/* Tanaman Kubis Berakar Dangkal */}
              <mesh position={[0, 0.08, 0]}>
                <dodecahedronGeometry args={[0.09, 0]} />
                <meshStandardMaterial color="#84cc16" />
              </mesh>
              {/* Akar dangkal sangat pendek (terlihat di X-Ray) */}
              {xrayMode && (
                <mesh position={[0, -0.08, 0]}>
                  <cylinderGeometry args={[0.015, 0.005, 0.12, 4]} />
                  <meshStandardMaterial color="#a16207" />
                </mesh>
              )}
            </group>
          ))}
        </group>
      )}

      {/* =========================================================================
          7. RETAKAN TANAH & BLOK LONGSOR YANG MELUNCUR (LANDSLIDE MASS)
         ========================================================================= */}
      <group ref={crackMeshRef} position={[-1.6, 0.95, 0]}>
        <mesh position={[0, 0, -0.8]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.08, 0.14, 1.6]} />
          <meshBasicMaterial color="#180e07" />
        </mesh>
        <mesh position={[0.1, 0, 0.9]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.09, 0.15, 1.8]} />
          <meshBasicMaterial color="#180e07" />
        </mesh>
      </group>

      {/* Massa Blok Tanah Longsor yang Meluncur */}
      <group ref={slideBlockRef} position={[-0.4, 0.95, 0]}>
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.1, 0.28, 2.2]} />
          <meshStandardMaterial color="#3b2314" roughness={0.95} />
        </mesh>
        <mesh position={[0.05, 0.12, 0]}>
          <boxGeometry args={[0.9, 0.08, 2.0]} />
          <meshStandardMaterial color="#22130a" roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0.4, 0.15, 0.5]} rotation={[0.4, 0.5, 0.2]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0.3, 0.12, -0.6]} rotation={[0.2, -0.4, 0.6]}>
          <dodecahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[-0.3, 0.1, 0.2]} rotation={[0.1, 0.8, -0.3]}>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#524339" roughness={0.9} />
        </mesh>
      </group>

      {/* =========================================================================
          8. PEPOHONAN & JARING AKAR PENGIKAT (tanamPohon)
         ========================================================================= */}
      {hasTrees && (
        <group ref={treesGroupRef} position={[0, 0, 0]}>
          {/* Pohon 1: Puncak Bukit Kiri */}
          <group position={[-2.1, 1.05, -1.0]}>
            <mesh castShadow position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.8, 6]} />
              <meshStandardMaterial color="#452c1e" roughness={0.8} />
            </mesh>
            <mesh castShadow position={[0, 1.0, 0]}>
              <coneGeometry args={[0.45, 0.9, 6]} />
              <meshStandardMaterial color="#1b4332" roughness={0.6} />
            </mesh>
            <mesh castShadow position={[0, 1.45, 0]}>
              <coneGeometry args={[0.35, 0.7, 6]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
            </mesh>

            {/* JARING AKAR 1: Tembus Lempung Hingga Batuan Dasar */}
            <group position={[0, 0, 0]}>
              <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.06, 0.03, 1.8, 6]} />
                <meshStandardMaterial
                  color="#78350f"
                  roughness={0.9}
                  emissive={xrayMode ? "#b45309" : "#000000"}
                  emissiveIntensity={xrayMode ? 0.4 : 0}
                />
              </mesh>
              <mesh position={[0.2, -0.4, 0.15]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.035, 0.015, 0.7, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
              <mesh position={[-0.15, -0.6, -0.2]} rotation={[0, 0, 0.4]}>
                <cylinderGeometry args={[0.03, 0.015, 0.6, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Pohon 2: Lereng Atas Tengah */}
          <group position={[-1.2, 0.9, 0.8]}>
            <mesh castShadow position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.09, 0.12, 0.9, 6]} />
              <meshStandardMaterial color="#3e2723" roughness={0.8} />
            </mesh>
            <mesh castShadow position={[0, 1.15, 0]}>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
            </mesh>
            <mesh castShadow position={[0.2, 1.45, -0.1]}>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial color="#40916c" roughness={0.7} />
            </mesh>

            {/* JARING AKAR 2 */}
            <group position={[0, 0, 0]}>
              <mesh position={[0.05, -0.85, 0]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.07, 0.035, 1.7, 6]} />
                <meshStandardMaterial
                  color="#78350f"
                  roughness={0.9}
                  emissive={xrayMode ? "#d97706" : "#000000"}
                  emissiveIntensity={xrayMode ? 0.45 : 0}
                />
              </mesh>
              <mesh position={[0.35, -0.45, -0.2]} rotation={[0.3, 0, -0.6]}>
                <cylinderGeometry args={[0.04, 0.02, 0.8, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Rumpun Rumput Vetiver Serabut Dalam */}
          <group position={[-0.2, 0.45, 0.4]}>
            <mesh position={[0, 0.08, 0]}>
              <coneGeometry args={[0.22, 0.25, 5]} />
              <meshStandardMaterial color="#48bb78" />
            </mesh>
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.025, 0.01, 0.8, 5]} />
              <meshStandardMaterial color="#92400e" />
            </mesh>
          </group>
        </group>
      )}

      {/* Tunggul Kayu Bekas Tebasan (tebangLiar) */}
      {actions.tebangLiar && (
        <group position={[0, 0, 0]}>
          <group position={[-1.2, 0.82, 0.8]}>
            <mesh castShadow position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.09, 0.11, 0.16, 6]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.085, 6]} />
              <meshStandardMaterial color="#d4a373" />
            </mesh>
            <mesh castShadow position={[0.25, 0.06, 0.3]} rotation={[0.2, 0.8, 1.5]}>
              <cylinderGeometry args={[0.07, 0.08, 0.65, 6]} />
              <meshStandardMaterial color="#4a2c11" roughness={0.9} />
            </mesh>
          </group>

          <group position={[-0.6, 0.58, -0.7]}>
            <mesh castShadow position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.14, 6]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.075, 6]} />
              <meshStandardMaterial color="#d4a373" />
            </mesh>
          </group>
        </group>
      )}

      {/* =========================================================================
          9. AKSI RISIKO 3: RUMAH TEPAT DI KAKI TEBING (rumahKakiBukit)
         ========================================================================= */}
      {actions.rumahKakiBukit && (
        <group ref={vulnerableHouseRef} position={[0.7, 0.14, 0.75]}>
          {/* Pondasi Ringkih */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.55, 0.1, 0.55]} />
            <meshStandardMaterial color="#94a3b8" />
          </mesh>
          {/* Badan Rumah Kayu */}
          <mesh castShadow position={[0, 0.22, 0]}>
            <boxGeometry args={[0.5, 0.26, 0.5]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Atap Pelana Genteng Merah Peringatan Bahaya */}
          <mesh castShadow position={[0, 0.44, 0]}>
            <coneGeometry args={[0.45, 0.24, 4]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* Rumah Warga Aman di Kaki Lereng */}
      <group ref={houseTiltRef} position={[1.4, 0.14, -0.7]}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.7, 0.12, 0.7]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.28, 0]}>
          <boxGeometry args={[0.62, 0.34, 0.62]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0.56, 0]}>
          <coneGeometry args={[0.55, 0.32, 4]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
      </group>

      <group position={[2.0, 0.14, 0.8]}>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.75, 0.12, 0.75]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.68, 0.36, 0.68]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.6, 0.36, 4]} />
          <meshStandardMaterial color="#c2410c" roughness={0.6} />
        </mesh>
      </group>

      {/* =========================================================================
          10. AKSI SOLUSI 3: DINDING PENAHAN BRONJONG BATU (bronjong)
         ========================================================================= */}
      {actions.bronjong && (
        <group position={[0.45, 0.24, 0]}>
          {/* Tumpukan Kotak Bronjong Kawat Besi Isi Batu Kali */}
          {[-1.5, -0.5, 0.5, 1.5].map((zPos, idx) => (
            <group key={idx} position={[0, 0, zPos]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.22, 0.38, 0.95]} />
                <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.7} />
              </mesh>
              {/* Kawat Penjepit Logam Silang */}
              <mesh position={[0.115, 0, 0]}>
                <boxGeometry args={[0.01, 0.36, 0.92]} />
                <meshStandardMaterial color="#334155" wireframe />
              </mesh>
              {/* Batuan Granit Padat di Dalam Keranjang Bronjong */}
              <mesh position={[0, 0.12, 0]}>
                <dodecahedronGeometry args={[0.09, 0]} />
                <meshStandardMaterial color="#475569" roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* =========================================================================
          11. AKSI SOLUSI 4: SALURAN DRAINASE LERENG (drainaseLereng)
         ========================================================================= */}
      {actions.drainaseLereng && (
        <group position={[0, 0.25, 0]}>
          {/* Saluran Beton V Melintang Lereng Mengalirkan Air Hujan */}
          <mesh position={[-0.2, 0.22, 0]} rotation={[0, 0, -0.42]}>
            <boxGeometry args={[2.4, 0.08, 0.2]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
          </mesh>
          {/* Aliran Air Deras yang Aman Terkumpul di Saluran */}
          <group ref={slopeDrainageFlowRef}>
            {[0, 1, 2, 3].map((idx) => (
              <mesh key={idx} position={[0, 0, 0]}>
                <sphereGeometry args={[0.035, 6, 6]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* =========================================================================
          12. AKSI SOLUSI 5: SENSOR EKSTENSOMETER PERINGATAN DINI (sensorLereng)
         ========================================================================= */}
      {actions.sensorLereng && (
        <group position={[-0.8, 0.92, -1.2]}>
          {/* Tiang Besi Sensor */}
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.02, 0.025, 0.9, 6]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          {/* Panel Surya Mini */}
          <mesh position={[0, 0.85, 0.06]} rotation={[-0.5, 0, 0]}>
            <boxGeometry args={[0.18, 0.02, 0.14]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Box Sirine & Modul Telemetri */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[0.1, 0.14, 0.1]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          {/* Lampu Beacon LED Kedip Peringatan */}
          <mesh ref={sensorLedRef} position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.0} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          13. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}
      {/* Hotspot 1: Akar Pengikat Tanah */}
      <HotspotPin3D
        position={[-1.7, 1.55, -1.2]}
        title="Akar Pengikat Tanah"
        badge="Paku Bumi Biologis"
        color="bg-emerald-600"
        showLabel={showLabels}
        description="Akar pohon keras dan rumput vetiver menembus lapisan lempung hingga batuan dasar sedalam 2-4 meter, mengunci massa tanah bagaikan paku bumi biologis sehingga lereng tidak mudah runtuh saat basah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Terasering Lereng */}
      <HotspotPin3D
        position={[-0.1, 0.95, 0.9]}
        title="Terasering Lereng"
        badge="Rekayasa Kontur"
        color="bg-amber-600"
        showLabel={showLabels}
        description="Sistem undakan terasering memotong sudut kemiringan lereng yang curam dan memperlambat limpasan air hujan. Air diarahkan ke saluran drainase agar tidak menumpuk dan menjebol tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Zona Rawan Kaki Bukit */}
      <HotspotPin3D
        position={[1.6, 0.75, 0.5]}
        title="Zona Rawan Kaki Bukit"
        badge="Tata Ruang Aman"
        color="bg-rose-600"
        showLabel={showLabels}
        description="Area kaki lereng adalah jalur luncuran utama material longsor (run-out zone). Pemukiman membutuhkan zona penyangga aman, dinding penahan tanah (talud/bronjong), atau relokasi jika lereng di atasnya gundul."
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
