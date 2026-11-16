import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * LandslideDiorama3D: Diorama 3D Interaktif Tanah Longsor & Lereng Bukit
 * 
 * Fitur:
 * - 3 Lapisan Geologi (Batuan Dasar Abu-abu, Lempung Cokelat Kemerahan, Topsoil Subur)
 * - Terasering Undakan Berjenjang (actions.terasering)
 * - Pepohonan Low-Poly dengan Jaringan Akar Dalam Tembus Batuan Dasar (actions.tanamPohon)
 * - Retakan & Luncuran Massa Longsor Menuju Kaki Bukit (actions.tebangLiar && weatherIntensity > 65)
 * - Mode X-Ray Transparan (xrayMode) memperlihatkan jaring akar dan batas lempung
 * - 2 Rumah Mini di Zona Kaki Lereng
 * - 3 Hotspot Edukasi Sains
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
  const crackMeshRef = useRef<THREE.Mesh>(null);

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
  const isDeforested = !!actions.tebangLiar;

  // Kondisi kritis longsor terjadi jika lereng ditebang liar dan hujan deras > 65
  // Jika ada terasering dan pohon, risiko longsor tertahan
  const isLandslideTriggered = isDeforested && weatherIntensity > 65 && !hasTrees;

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

    // C. Kalkulasi Luncuran Massa Tanah Longsor (Lerp)
    const targetSlide = isLandslideTriggered ? 1.0 : 0.0;
    currentSlide.current = THREE.MathUtils.lerp(currentSlide.current, targetSlide, delta * 2.2);

    if (slideBlockRef.current) {
      // Luncuran bergerak miring ke kanan-bawah menuju kaki bukit
      const s = currentSlide.current;
      slideBlockRef.current.position.x = -0.4 + s * 1.45;
      slideBlockRef.current.position.y = 0.95 - s * 0.65;
      slideBlockRef.current.rotation.z = -s * 0.22;
      slideBlockRef.current.visible = isDeforested;
    }

    // Retakan tanah di lereng atas merekah saat mendekati longsor
    if (crackMeshRef.current) {
      const crackIntensity = isDeforested && weatherIntensity > 40 ? Math.min(1, (weatherIntensity - 40) / 40) : 0;
      crackMeshRef.current.scale.set(1, crackIntensity, 1);
      crackMeshRef.current.visible = crackIntensity > 0.05;
    }

    // Rumah mini di kaki bukit sedikit terdorong / miring saat tertimbun material longsor
    if (houseTiltRef.current) {
      const dangerTilt = currentSlide.current > 0.7 ? (currentSlide.current - 0.7) * 0.25 : 0;
      houseTiltRef.current.rotation.z = dangerTilt;
      houseTiltRef.current.position.y = -dangerTilt * 0.2;
    }

    // D. Warna Tanah Menghitam Karena Jenuh Air (Waterlogged mud)
    const targetSaturation = isDeforested && weatherIntensity > 60 ? (weatherIntensity - 60) / 40 : 0;
    currentSoilDarkness.current = THREE.MathUtils.lerp(currentSoilDarkness.current, targetSaturation, delta * 3.0);

    if (topsoilMatRef.current) {
      // Lerp dari cokelat tanah subur (#6b4423) ke lumpur jenuh (#26160d)
      const baseCol = new THREE.Color("#6b4423");
      const wetCol = new THREE.Color("#26160d");
      topsoilMatRef.current.color.copy(baseCol).lerp(wetCol, currentSoilDarkness.current);
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
        {/* Awan Stylized Low-Poly */}
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

      {/* A. LAPISAN 1: BATUAN DASAR ABU-ABU (BEDROCK / BASEMENT ROCK) */}
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
      {/* Garis batas batuan dasar aksen */}
      <mesh position={[0, -0.7, 2.71]}>
        <boxGeometry args={[5.4, 0.04, 0.02]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>
      <mesh position={[2.71, -0.7, 0]}>
        <boxGeometry args={[0.02, 0.04, 5.4]} />
        <meshBasicMaterial color="#1e293b" />
      </mesh>

      {/* B. LAPISAN 2: LAPISAN LEMPUNG (CLAY / SUBSOIL - BIDANG GELINCIR) */}
      {/* Bagian datar bawah kaki lereng (x: 0.5 s/d 2.7) */}
      <mesh receiveShadow position={[1.35, -0.4, 0]}>
        <boxGeometry args={[2.7, 0.6, 5.4]} />
        <meshStandardMaterial
          color="#8d4925"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>
      {/* Bagian lempung miring ke puncak lereng (x: -2.7 s/d 0.0) */}
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
      {/* Bagian lempung puncak bukit kiri (x: -2.0 s/d -2.7) */}
      <mesh receiveShadow position={[-2.1, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.8, 5.4]} />
        <meshStandardMaterial
          color="#8d4925"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* Aksen Indikator Bidang Gelincir (Slip Plane Marker) dalam X-Ray */}
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

      {/* C. LAPISAN 3: LAPISAN TOPSOIL SUBUR & PERMUKAAN RUMPUT */}
      {/* Topsoil kaki lereng datar (zona pemukiman) */}
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
      {/* Rumput hijau kaki lereng */}
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
        /* Skenario A: Lereng Alami Curam Halus (Tanpa Terasering) */
        <group position={[-0.8, 0.45, 0]} rotation={[0, 0, 0.32]}>
          {/* Topsoil lereng curam */}
          <mesh receiveShadow castShadow position={[0, 0, 0]}>
            <boxGeometry args={[2.7, 0.24, 5.4]} />
            <meshStandardMaterial
              color="#5c4033"
              roughness={0.85}
              transparent={groundTransparent}
              opacity={groundOpacity}
            />
          </mesh>
          {/* Permukaan lereng curam (rumput atau tanah gundul jika ditebang) */}
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
            {/* Dinding batu penguat tebing undakan (batu kali / talud) */}
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
            {/* Saluran drainase air di sudut undakan */}
            <mesh position={[-0.38, 0.12, 0]}>
              <boxGeometry args={[0.12, 0.05, 5.38]} />
              <meshStandardMaterial color="#475569" roughness={0.6} />
            </mesh>
            {/* Dinding batu penguat */}
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
            {/* Dinding batu penguat */}
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
          4. RETAKAN TANAH & BLOK LONGSOR YANG MELUNCUR (LANDSLIDE MASS)
         ========================================================================= */}

      {/* A. Retakan Merekah di Kepala Lereng (Fissure Cracks) */}
      <group ref={crackMeshRef} position={[-1.6, 0.95, 0]}>
        {/* Garis retakan 1 */}
        <mesh position={[0, 0, -0.8]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[0.08, 0.14, 1.6]} />
          <meshBasicMaterial color="#180e07" />
        </mesh>
        {/* Garis retakan 2 */}
        <mesh position={[0.1, 0, 0.9]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.09, 0.15, 1.8]} />
          <meshBasicMaterial color="#180e07" />
        </mesh>
      </group>

      {/* B. Massa Blok Tanah Longsor yang Meluncur (Sliding Mud & Soil Mass) */}
      <group ref={slideBlockRef} position={[-0.4, 0.95, 0]}>
        {/* Bongkahan Utama Tanah Lumpur */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[1.1, 0.28, 2.2]} />
          <meshStandardMaterial color="#3b2314" roughness={0.95} />
        </mesh>
        {/* Lapisan lumpur basah berkilau */}
        <mesh position={[0.05, 0.12, 0]}>
          <boxGeometry args={[0.9, 0.08, 2.0]} />
          <meshStandardMaterial color="#22130a" roughness={0.4} />
        </mesh>
        {/* Serpihan Batu-Batu Kasar yang Terbawa Longsor */}
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
          5. PEPOHONAN & JARING-JARING AKAR PENGIKAT (ROOT NETWORK)
         ========================================================================= */}

      {/* Jika Aksi Tanam Pohon / Konservasi Aktif */}
      {hasTrees && (
        <group position={[0, 0, 0]}>
          {/* Pohon 1: Puncak Bukit Kiri */}
          <group position={[-2.1, 1.05, -1.0]}>
            {/* Batang */}
            <mesh castShadow position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.8, 6]} />
              <meshStandardMaterial color="#452c1e" roughness={0.8} />
            </mesh>
            {/* Tajuk Daun Segitiga Pinus / Cemara */}
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
              {/* Akar Tunjang Utama (Taproot) */}
              <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.06, 0.03, 1.8, 6]} />
                <meshStandardMaterial
                  color="#78350f"
                  roughness={0.9}
                  emissive={xrayMode ? "#b45309" : "#000000"}
                  emissiveIntensity={xrayMode ? 0.4 : 0}
                />
              </mesh>
              {/* Cabang Akar Lateral 1 */}
              <mesh position={[0.2, -0.4, 0.15]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.035, 0.015, 0.7, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
              {/* Cabang Akar Lateral 2 */}
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
            {/* Tajuk Daun Rimbun Bulat Low-Poly */}
            <mesh castShadow position={[0, 1.15, 0]}>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
            </mesh>
            <mesh castShadow position={[0.2, 1.45, -0.1]}>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial color="#40916c" roughness={0.7} />
            </mesh>

            {/* JARING AKAR 2: Cengkeraman Bidang Gelincir */}
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
              <mesh position={[-0.3, -0.5, 0.25]} rotation={[-0.2, 0, 0.5]}>
                <cylinderGeometry args={[0.035, 0.015, 0.7, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Pohon 3: Lereng Tengah */}
          <group position={[-0.5, 0.65, -0.9]}>
            <mesh castShadow position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.07, 0.09, 0.7, 6]} />
              <meshStandardMaterial color="#4e342e" roughness={0.8} />
            </mesh>
            <mesh castShadow position={[0, 0.9, 0]}>
              <coneGeometry args={[0.42, 0.8, 6]} />
              <meshStandardMaterial color="#1b4332" roughness={0.6} />
            </mesh>
            <mesh castShadow position={[0, 1.3, 0]}>
              <coneGeometry args={[0.3, 0.6, 6]} />
              <meshStandardMaterial color="#38a169" roughness={0.6} />
            </mesh>

            {/* JARING AKAR 3: Menembus Batuan Dasar */}
            <group position={[0, 0, 0]}>
              <mesh position={[0, -0.75, 0]}>
                <cylinderGeometry args={[0.05, 0.025, 1.5, 6]} />
                <meshStandardMaterial
                  color="#78350f"
                  roughness={0.9}
                  emissive={xrayMode ? "#b45309" : "#000000"}
                  emissiveIntensity={xrayMode ? 0.4 : 0}
                />
              </mesh>
              <mesh position={[0.25, -0.35, 0.15]} rotation={[0, 0, -0.55]}>
                <cylinderGeometry args={[0.03, 0.015, 0.6, 5]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
              </mesh>
            </group>
          </group>

          {/* Rumpun Rumput Vetiver / Semak Berakar Dalam */}
          <group position={[-0.2, 0.45, 0.4]}>
            <mesh position={[0, 0.08, 0]}>
              <coneGeometry args={[0.22, 0.25, 5]} />
              <meshStandardMaterial color="#48bb78" />
            </mesh>
            {/* Akar wangi serabut tebal masuk ke dalam */}
            <mesh position={[0, -0.4, 0]}>
              <cylinderGeometry args={[0.025, 0.01, 0.8, 5]} />
              <meshStandardMaterial color="#92400e" />
            </mesh>
          </group>
        </group>
      )}

      {/* Jika Ditebang Liar (actions.tebangLiar): Tampilkan Tunggul Kayu Bekas Tebasan */}
      {isDeforested && (
        <group position={[0, 0, 0]}>
          {/* Tunggul 1 */}
          <group position={[-1.2, 0.82, 0.8]}>
            <mesh castShadow position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.09, 0.11, 0.16, 6]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.9} />
            </mesh>
            {/* Lingkaran tahun potongan kayu */}
            <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.085, 6]} />
              <meshStandardMaterial color="#d4a373" />
            </mesh>
            {/* Batang kayu gelondongan tumbang */}
            <mesh castShadow position={[0.25, 0.06, 0.3]} rotation={[0.2, 0.8, 1.5]}>
              <cylinderGeometry args={[0.07, 0.08, 0.65, 6]} />
              <meshStandardMaterial color="#4a2c11" roughness={0.9} />
            </mesh>
          </group>

          {/* Tunggul 2 */}
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
          6. DUA (2) RUMAH MINI DI KAKI BUKIT (PEMUKIMAN ZONA RAWAN)
         ========================================================================= */}

      {/* Rumah 1: Paling Dekat Lereng (Bisa Terdampak Longsor) */}
      <group ref={houseTiltRef} position={[0.95, 0.14, -0.6]}>
        {/* Pondasi Beton / Batu Rumah */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.7, 0.12, 0.7]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        {/* Badan Rumah Kayu */}
        <mesh castShadow position={[0, 0.28, 0]}>
          <boxGeometry args={[0.62, 0.34, 0.62]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        {/* Atap Pelana Genteng Merah */}
        <mesh castShadow position={[0, 0.56, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.55, 0.32, 4]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.6} />
        </mesh>
        {/* Pintu Rumah */}
        <mesh position={[0.315, 0.24, 0]}>
          <boxGeometry args={[0.02, 0.22, 0.14]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        {/* Jendela Kuning Hangat */}
        <mesh position={[0.315, 0.32, 0.16]}>
          <boxGeometry args={[0.02, 0.1, 0.1]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Rumah 2: Di Sisi Kanan Kaki Bukit */}
      <group position={[1.85, 0.14, 0.7]}>
        {/* Pondasi */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.8, 0.12, 0.75]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
        {/* Badan Rumah Cream / Putih */}
        <mesh castShadow position={[0, 0.3, 0]}>
          <boxGeometry args={[0.72, 0.36, 0.68]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.6} />
        </mesh>
        {/* Atap Genteng Hijau Hutan */}
        <mesh castShadow position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.62, 0.36, 4]} />
          <meshStandardMaterial color="#15803d" roughness={0.6} />
        </mesh>
        {/* Cerobong Asap Bata */}
        <mesh position={[0.18, 0.7, 0.12]}>
          <boxGeometry args={[0.08, 0.2, 0.08]} />
          <meshStandardMaterial color="#7f1d1d" />
        </mesh>
        {/* Pintu & Jendela */}
        <mesh position={[0, 0.25, 0.345]}>
          <boxGeometry args={[0.14, 0.22, 0.02]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[-0.2, 0.32, 0.345]}>
          <boxGeometry args={[0.1, 0.1, 0.02]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Jalan Setapak Kaki Bukit & Pagar Sederhana */}
      <mesh position={[1.4, 0.13, 0.05]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <planeGeometry args={[0.35, 4.2]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.9} />
      </mesh>

      {/* Dinding Penahan Tanah (Talud / Bronjong Kaki Bukit) jika Terasering Aktif */}
      {hasTerracing && (
        <group position={[0.55, 0.22, -0.3]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.12, 0.32, 2.2]} />
            <meshStandardMaterial color="#64748b" roughness={0.9} />
          </mesh>
          <mesh position={[0.04, 0.08, 0]}>
            <boxGeometry args={[0.06, 0.08, 2.2]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          7. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}

      {/* Hotspot 1: Akar Pengikat Tanah (Kiri Belakang Puncak Bukit) */}
      <HotspotPin3D
        position={[-1.7, 1.55, -1.2]}
        title="Akar Pengikat Tanah"
        badge="Paku Bumi Biologis"
        color="bg-emerald-600"
        showLabel={showLabels}
        description="Akar pohon keras dan rumput vetiver menembus lapisan lempung hingga batuan dasar sedalam 2-4 meter, mengunci massa tanah bagaikan paku bumi biologis sehingga lereng tidak mudah runtuh saat basah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Terasering Lereng (Tengah Depan) */}
      <HotspotPin3D
        position={[-0.1, 0.95, 0.9]}
        title="Terasering Lereng"
        badge="Rekayasa Kontur"
        color="bg-amber-600"
        showLabel={showLabels}
        description="Sistem undakan terasering memotong sudut kemiringan lereng yang curam dan memperlambat limpasan air hujan. Air diarahkan ke saluran drainase agar tidak menumpuk dan menjebol tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Zona Rawan Kaki Bukit (Kanan Kaki Lereng) */}
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
