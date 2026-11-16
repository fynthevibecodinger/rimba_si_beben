import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

export default function FloodDiorama3D({
  weatherIntensity,
  xrayMode,
  actions,
  onSelectHotspot,
  showLabels = true,
}: DioramaProps) {
  // References for dynamic animated objects
  const riverWaterRef = useRef<THREE.Mesh>(null);
  const roadFloodRef = useRef<THREE.Mesh>(null);
  const aquiferWaterRef = useRef<THREE.Mesh>(null);
  const rainGroupRef = useRef<THREE.Group>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const bioporiWaterFlowRef = useRef<THREE.Group>(null);

  // Smooth interpolated water heights
  const currentRiverY = useRef(-0.35);
  const currentFloodOpacity = useRef(0);
  const currentAquiferScale = useRef(1);

  // 1. Partikel Hujan (Low-poly raindrops)
  const rainCount = 90;
  const rainPositions = useMemo(() => {
    const pos = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 1] = 0.5 + Math.random() * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6.5;
    }
    return pos;
  }, []);

  // 2. Loop Animasi Interaktif useFrame
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // A. Animasi Hujan
    if (rainGroupRef.current) {
      const isRaining = weatherIntensity > 5;
      rainGroupRef.current.visible = isRaining;

      if (isRaining) {
        const speed = 4 + (weatherIntensity / 100) * 10;
        const children = rainGroupRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const drop = children[i];
          drop.position.y -= speed * delta;
          if (drop.position.y < 0.3) {
            drop.position.y = 5.5 + Math.random() * 1.5;
          }
        }
      }
    }

    // B. Animasi Awan Mengambang
    if (cloudGroupRef.current) {
      cloudGroupRef.current.position.x = Math.sin(time * 0.4) * 0.35;
      cloudGroupRef.current.position.z = Math.cos(time * 0.3) * 0.35;
    }

    // C. Kalkulasi Target Ketinggian Air Sungai & Banjir
    // Base height = -0.35. Batas tanggul jalan = 0.38
    const rainLevel = (weatherIntensity / 100) * 0.65;
    const trashPenalty = actions.sampahSungai ? 0.45 : 0;
    const bioporiBonus = actions.biopori ? 0.35 : 0;
    const mangroveBonus = (actions.mangrove || actions.tanamPohon) ? 0.25 : 0;
    const pavementPenalty = actions.betonPenuh ? 0.3 : 0;

    // Target ketinggian air sungai
    let targetRiverLevel = -0.35 + rainLevel + trashPenalty + pavementPenalty - bioporiBonus - mangroveBonus;
    targetRiverLevel = Math.max(-0.45, Math.min(0.85, targetRiverLevel));

    // Apakah meluap ke jalan?
    const isOverflowing = targetRiverLevel > 0.38;
    const targetFloodOpacity = isOverflowing ? Math.min(0.85, (targetRiverLevel - 0.38) * 2.2) : 0;

    // Target volume air tanah / akuifer
    // Meningkat jika ada biopori + hujan
    const targetAquifer = 0.8 + (actions.biopori ? 0.6 : 0.1) * (weatherIntensity / 100);

    // D. Interpolasi Lembut (Lerp)
    currentRiverY.current = THREE.MathUtils.lerp(currentRiverY.current, targetRiverLevel, delta * 3.5);
    currentFloodOpacity.current = THREE.MathUtils.lerp(currentFloodOpacity.current, targetFloodOpacity, delta * 3.5);
    currentAquiferScale.current = THREE.MathUtils.lerp(currentAquiferScale.current, targetAquifer, delta * 2.5);

    if (riverWaterRef.current) {
      riverWaterRef.current.position.y = currentRiverY.current;
      // Efek riak air kecil
      riverWaterRef.current.position.y += Math.sin(time * 3 + riverWaterRef.current.position.x) * 0.012;
    }

    if (roadFloodRef.current) {
      roadFloodRef.current.visible = currentFloodOpacity.current > 0.02;
      (roadFloodRef.current.material as THREE.MeshStandardMaterial).opacity = currentFloodOpacity.current;
    }

    if (aquiferWaterRef.current) {
      aquiferWaterRef.current.scale.set(1, currentAquiferScale.current, 1);
    }

    // E. Aliran air biopori animasi
    if (bioporiWaterFlowRef.current) {
      bioporiWaterFlowRef.current.visible = actions.biopori && weatherIntensity > 15;
      bioporiWaterFlowRef.current.children.forEach((p, idx) => {
        p.position.y = -0.1 - ((time * 1.5 + idx * 0.3) % 0.8);
      });
    }
  });

  // Material X-Ray vs Material Padat Normal
  const soilOpacity = xrayMode ? 0.25 : 1.0;
  const isSoilTransparent = xrayMode;

  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================================
          1. BLOK LANSKAP DASAR (BASE SLICE TERRAIN)
         ========================================================================= */}
      
      {/* Sisi Kiri (Area Pemukiman / Jalan Kota) */}
      <group position={[-1.75, 0, 0]}>
        {/* Lapisan Rumput Atas */}
        <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.5, 0.4, 5.5]} />
          <meshStandardMaterial
            color={actions.betonPenuh ? "#94a3b8" : "#40916c"}
            roughness={0.7}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>

        {/* Jalan Aspal & Marka */}
        <mesh position={[-0.4, 0.46, 0]} receiveShadow>
          <boxGeometry args={[1.3, 0.05, 5.5]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Garis Marka Putih Jalan */}
        <mesh position={[-0.4, 0.49, 0]}>
          <boxGeometry args={[0.08, 0.02, 5.0]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>

        {/* Lapisan Tanah Subsoil (Cokelat) */}
        <mesh position={[0, -0.45, 0]} receiveShadow>
          <boxGeometry args={[2.5, 1.0, 5.5]} />
          <meshStandardMaterial
            color="#785038"
            roughness={0.9}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>

        {/* Lapisan Batuan Bawah / Bedrock (Abu Gelap) */}
        <mesh position={[0, -1.35, 0]} receiveShadow>
          <boxGeometry args={[2.5, 0.8, 5.5]} />
          <meshStandardMaterial
            color="#38302b"
            roughness={1}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>
      </group>

      {/* Sisi Kanan (Area Hutan Alami / Tanggul Hijau) */}
      <group position={[1.75, 0, 0]}>
        {/* Lapisan Rumput Hijau */}
        <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.5, 0.4, 5.5]} />
          <meshStandardMaterial
            color="#52b788"
            roughness={0.7}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>

        {/* Lapisan Tanah Subsoil */}
        <mesh position={[0, -0.45, 0]} receiveShadow>
          <boxGeometry args={[2.5, 1.0, 5.5]} />
          <meshStandardMaterial
            color="#785038"
            roughness={0.9}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>

        {/* Lapisan Batuan Bawah */}
        <mesh position={[0, -1.35, 0]} receiveShadow>
          <boxGeometry args={[2.5, 0.8, 5.5]} />
          <meshStandardMaterial
            color="#38302b"
            roughness={1}
            transparent={isSoilTransparent}
            opacity={soilOpacity}
          />
        </mesh>
      </group>

      {/* Dasar Palung Sungai Tengah */}
      <mesh position={[0, -0.7, 0]} receiveShadow>
        <boxGeometry args={[1.0, 0.5, 5.5]} />
        <meshStandardMaterial
          color="#524338"
          roughness={0.9}
          transparent={isSoilTransparent}
          opacity={soilOpacity}
        />
      </mesh>

      {/* Dinding Tebing Sungai Kiri & Kanan (Sloped Riverbank) */}
      <mesh position={[-0.55, -0.15, 0]} rotation={[0, 0, -Math.PI / 8]} receiveShadow>
        <boxGeometry args={[0.3, 0.7, 5.5]} />
        <meshStandardMaterial
          color="#604735"
          roughness={0.9}
          transparent={isSoilTransparent}
          opacity={soilOpacity}
        />
      </mesh>
      <mesh position={[0.55, -0.15, 0]} rotation={[0, 0, Math.PI / 8]} receiveShadow>
        <boxGeometry args={[0.3, 0.7, 5.5]} />
        <meshStandardMaterial
          color="#604735"
          roughness={0.9}
          transparent={isSoilTransparent}
          opacity={soilOpacity}
        />
      </mesh>

      {/* =========================================================================
          2. AIR SUNGAI DINAMIS (DYNAMIC RIVER WATER MESH)
         ========================================================================= */}
      <mesh
        ref={riverWaterRef}
        position={[0, -0.35, 0]}
        receiveShadow
      >
        <boxGeometry args={[1.15, 0.25, 5.5]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.15}
          metalness={0.3}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Genangan Banjir yang Meluap ke Jalan Kota */}
      <mesh
        ref={roadFloodRef}
        position={[-1.75, 0.49, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.5, 5.4]} />
        <meshStandardMaterial
          color="#0369a1"
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0}
        />
      </mesh>

      {/* =========================================================================
          3. LAPISAN AKUIFER AIR TANAH (GROUNDWATER AQUIFER IN SUBTERRANEAN)
         ========================================================================= */}
      <group position={[-1.75, -1.35, 0]}>
        {/* Wadah Rongga Akuifer */}
        <mesh
          ref={aquiferWaterRef}
          position={[0, 0, 0]}
        >
          <boxGeometry args={[2.1, 0.55, 4.8]} />
          <meshStandardMaterial
            color={actions.biopori ? "#38bdf8" : "#0284c7"}
            emissive={actions.biopori ? "#0284c7" : "#000000"}
            emissiveIntensity={actions.biopori ? 0.35 : 0}
            roughness={0.2}
            transparent
            opacity={xrayMode ? 0.95 : 0.65}
          />
        </mesh>

        {/* Butiran Pasir & Kerikil Akuifer */}
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[2.2, 0.1, 4.9]} />
          <meshStandardMaterial color="#473a2b" roughness={1} />
        </mesh>
      </group>

      {/* Gorong-gorong Bawah Tanah (Underground Culvert Pipe) */}
      <group position={[-0.85, 0.05, 0.2]}>
        {/* Pipa beton silinder mengalirkan air dari bawah kota ke sungai */}
        <mesh rotation={[0, 0, Math.PI / 2]} receiveShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.8, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        {/* Lubang dalam pipa */}
        <mesh position={[0.41, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* =========================================================================
          4. OBJEK KOTA: RUMAH-RUMAH MINI (LOW-POLY HOUSES)
         ========================================================================= */}
      {/* Rumah 1 (Depan) */}
      <group position={[-2.1, 0.46, 1.3]}>
        {/* Badan Rumah */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.7, 0.9]} />
          <meshStandardMaterial color="#fef9c3" roughness={0.6} />
        </mesh>
        {/* Atap Pelana Genteng */}
        <mesh position={[0, 0.85, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[0.7, 0.45, 4]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.5} />
        </mesh>
        {/* Pintu Kayu */}
        <mesh position={[0.41, 0.25, 0]}>
          <boxGeometry args={[0.02, 0.45, 0.25]} />
          <meshStandardMaterial color="#854d0e" />
        </mesh>
        {/* Jendela */}
        <mesh position={[0.41, 0.45, 0.26]}>
          <boxGeometry args={[0.02, 0.2, 0.2]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} />
        </mesh>
      </group>

      {/* Rumah 2 (Belakang) */}
      <group position={[-2.1, 0.46, -1.3]}>
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.8, 1.0]} />
          <meshStandardMaterial color="#f0fdf4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <coneGeometry args={[0.75, 0.5, 4]} />
          <meshStandardMaterial color="#c2410c" roughness={0.5} />
        </mesh>
        <mesh position={[0.43, 0.28, 0]}>
          <boxGeometry args={[0.02, 0.48, 0.25]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Cerobong Asap */}
        <mesh position={[-0.2, 1.05, 0.2]} castShadow>
          <boxGeometry args={[0.15, 0.35, 0.15]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Tiang Lampu Jalan */}
      <group position={[-1.0, 0.46, -0.6]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.035, 1.0, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.08, 0.95, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.18, 0.88, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Jembatan Kecil Menyeberangi Sungai */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.08, 0.7]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </mesh>
        {/* Pagar Jembatan */}
        <mesh position={[0, 0.15, 0.32]}>
          <boxGeometry args={[1.3, 0.15, 0.04]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, 0.15, -0.32]}>
          <boxGeometry args={[1.3, 0.15, 0.04]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>

      {/* =========================================================================
          5. AKSI 1: SAMPAH SUNGAI (PLASTIC & TRASH PILE)
         ========================================================================= */}
      {actions.sampahSungai && (
        <group position={[0, -0.22, 0.4]}>
          {/* Kardus bekas */}
          <mesh position={[-0.15, 0.08, -0.1]} rotation={[0.2, 0.4, -0.1]} castShadow>
            <boxGeometry args={[0.25, 0.2, 0.28]} />
            <meshStandardMaterial color="#b45309" roughness={0.9} />
          </mesh>
          {/* Kantong kresek / sampah plastik */}
          <mesh position={[0.12, 0.05, 0.1]} rotation={[-0.1, 0.8, 0.3]} castShadow>
            <dodecahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color="#ef4444" roughness={0.4} />
          </mesh>
          <mesh position={[-0.05, 0.14, 0.15]} rotation={[0.4, -0.3, 0.2]}>
            <dodecahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.4} />
          </mesh>
          {/* Botol / Kaleng terapung */}
          <mesh position={[0.2, 0.02, -0.2]} rotation={[Math.PI / 2, 0.3, 0.5]}>
            <cylinderGeometry args={[0.04, 0.04, 0.18, 8]} />
            <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Ranting pohon tersangkut */}
          <mesh position={[-0.2, 0.06, 0.05]} rotation={[0, 0.5, 0.2]}>
            <cylinderGeometry args={[0.02, 0.03, 0.6, 6]} />
            <meshStandardMaterial color="#451a03" roughness={1} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          6. AKSI 2: LUBANG RESAPAN BIOPORI (PERCOLATION CYLINDERS IN YARD)
         ========================================================================= */}
      {actions.biopori && (
        <group position={[-1.35, 0.46, 0]}>
          {/* Barisan 3 Lubang Biopori di Halaman */}
          {[-0.55, 0, 0.55].map((zOffset, idx) => (
            <group key={idx} position={[0, 0, zOffset]}>
              {/* Tutup Pori Grill Besi di Permukaan */}
              <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.11, 0.11, 0.04, 16]} />
                <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Tutup Hijau Mulsa Kompos */}
              <mesh position={[0, 0.03, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.045, 12]} />
                <meshStandardMaterial color="#15803d" />
              </mesh>
              {/* Silinder Pipa Biopori Masuk ke Dalam Tanah */}
              <mesh position={[0, -0.45, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.9, 12]} />
                <meshStandardMaterial
                  color="#38bdf8"
                  transparent
                  opacity={xrayMode ? 0.9 : 0.45}
                  roughness={0.3}
                />
              </mesh>
            </group>
          ))}

          {/* Partikel Animasi Air Meresap ke Bawah */}
          <group ref={bioporiWaterFlowRef}>
            {[-0.55, 0, 0.55].map((zOffset, idx) => (
              <mesh key={idx} position={[0, -0.3, zOffset]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* =========================================================================
          7. AKSI 3: POHON MANGROVE / VEGETASI TEPI SUNGAI (MANGROVE BUFFERS)
         ========================================================================= */}
      {(actions.mangrove || actions.tanamPohon) && (
        <group position={[0.75, 0.35, 0]}>
          {/* Pohon Mangrove 1 */}
          <group position={[0, 0, -1.2]}>
            {/* Akar Tunjang (Stilt Roots) */}
            <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.03, 0.04, 0.4, 6]} />
              <meshStandardMaterial color="#5c3a21" />
            </mesh>
            <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.03, 0.04, 0.4, 6]} />
              <meshStandardMaterial color="#5c3a21" />
            </mesh>
            {/* Batang Utama */}
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 0.6, 8]} />
              <meshStandardMaterial color="#4a2e1b" roughness={0.8} />
            </mesh>
            {/* Tajuk Daun Rimbun */}
            <mesh position={[0, 0.85, 0]} castShadow>
              <dodecahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial color="#15803d" roughness={0.6} />
            </mesh>
          </group>

          {/* Pohon Mangrove 2 (Tengah) */}
          <group position={[0.1, 0, 0.3]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.7, 8]} />
              <meshStandardMaterial color="#4a2e1b" />
            </mesh>
            <mesh position={[0, 0.95, 0]} castShadow>
              <dodecahedronGeometry args={[0.45, 1]} />
              <meshStandardMaterial color="#166534" roughness={0.6} />
            </mesh>
          </group>

          {/* Pohon Mangrove 3 (Depan) */}
          <group position={[-0.05, 0, 1.4]}>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.07, 0.55, 8]} />
              <meshStandardMaterial color="#4a2e1b" />
            </mesh>
            <mesh position={[0, 0.75, 0]} castShadow>
              <dodecahedronGeometry args={[0.35, 1]} />
              <meshStandardMaterial color="#15803d" roughness={0.6} />
            </mesh>
          </group>
        </group>
      )}

      {/* Pepohonan Alami di Area Hutan Kanan (Permanen Hiasan) */}
      <group position={[2.2, 0.45, -0.5]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.09, 0.8, 8]} />
          <meshStandardMaterial color="#523924" />
        </mesh>
        <mesh position={[0, 1.05, 0]} castShadow>
          <coneGeometry args={[0.55, 1.1, 6]} />
          <meshStandardMaterial color="#1e4620" roughness={0.7} />
        </mesh>
      </group>
      <group position={[2.2, 0.45, 1.1]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 0.7, 8]} />
          <meshStandardMaterial color="#523924" />
        </mesh>
        <mesh position={[0, 0.9, 0]} castShadow>
          <coneGeometry args={[0.45, 0.95, 6]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          8. EFEK CUACA: PARTIKEL HUJAN & AWAN LOW-POLY
         ========================================================================= */}
      {/* Tetesan Hujan 3D */}
      <group ref={rainGroupRef}>
        {Array.from({ length: rainCount }).map((_, idx) => (
          <mesh
            key={idx}
            position={[
              rainPositions[idx * 3],
              rainPositions[idx * 3 + 1],
              rainPositions[idx * 3 + 2],
            ]}
          >
            <cylinderGeometry args={[0.012, 0.012, 0.35, 4]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
          </mesh>
        ))}
      </group>

      {/* Awan Tebal Low-Poly di Atas Diorama */}
      <group ref={cloudGroupRef} position={[0, 4.2, 0]}>
        {weatherIntensity > 15 && (
          <group position={[-0.8, 0, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <icosahedronGeometry args={[0.65, 1]} />
              <meshStandardMaterial
                color={weatherIntensity > 65 ? "#64748b" : "#f1f5f9"}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[0.5, -0.1, 0.2]} castShadow>
              <icosahedronGeometry args={[0.45, 1]} />
              <meshStandardMaterial
                color={weatherIntensity > 65 ? "#475569" : "#ffffff"}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[-0.4, -0.15, -0.2]} castShadow>
              <icosahedronGeometry args={[0.4, 1]} />
              <meshStandardMaterial
                color={weatherIntensity > 65 ? "#475569" : "#ffffff"}
                roughness={0.9}
              />
            </mesh>
          </group>
        )}

        {weatherIntensity > 40 && (
          <group position={[1.0, 0.2, 0.5]}>
            <mesh position={[0, 0, 0]} castShadow>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial
                color={weatherIntensity > 65 ? "#475569" : "#f8fafc"}
                roughness={0.9}
              />
            </mesh>
            <mesh position={[0.4, -0.1, -0.1]} castShadow>
              <icosahedronGeometry args={[0.38, 1]} />
              <meshStandardMaterial
                color={weatherIntensity > 65 ? "#334155" : "#ffffff"}
                roughness={0.9}
              />
            </mesh>
          </group>
        )}
      </group>

      {/* =========================================================================
          9. TIGA (3) HOTSPOT EDUKASI 3D (INTERACTIVE HOTSPOT PINS)
         ========================================================================= */}
      {/* Hotspot 1: Saluran Sungai & Drainase (Kanan Belakang) */}
      <HotspotPin3D
        position={[0.2, 0.85, -1.5]}
        title="Saluran Sungai & Drainase Kota"
        description="Sungai dan gorong-gorong adalah jalur utama air mengalir ke laut. Jika tersumbat sampah, air hujan tidak tertampung dan meluap membanjiri pemukiman warga."
        badge="Sungai & Saluran"
        color="bg-sky-600"
        showLabel={showLabels}
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Lubang Resapan Biopori (Kiri Depan) */}
      <HotspotPin3D
        position={[-1.5, 0.95, 1.2]}
        title="Lubang Resapan Biopori"
        description="Pipa silinder berpori di tanah yang diisi sampah organik/kompos. Membantu air hujan meresap cepat ke tanah hingga 40%, mengurangi genangan permukaan dan menyuburkan tanah."
        badge="Biopori Tanah"
        color="bg-emerald-600"
        showLabel={showLabels}
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Lapisan Akuifer Air Tanah (Kanan Depan Bawah) */}
      <HotspotPin3D
        position={[1.3, -0.75, 2.0]}
        title="Lapisan Akuifer Air Tanah"
        description="Lapisan batu dan pasir alami di bawah tanah yang menyimpan air tawar bersih. Air yang meresap lewat biopori mengisi akuifer ini sebagai cadangan air sumur saat kemarau."
        badge="Akuifer Bawah Tanah"
        color="bg-cyan-600"
        showLabel={showLabels}
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
