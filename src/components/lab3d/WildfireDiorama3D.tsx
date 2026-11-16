import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * WildfireDiorama3D: Diorama 3D Interaktif Kebakaran Hutan & Lahan Gambut Tropis
 * 
 * Fitur:
 * - Potongan kubah gambut tebal berwarna cokelat tua gelap dengan parit kanal membelah hutan
 * - Pohon hutan hujan tropis & akar napas khas lahan basah gambut
 * - 2 Satwa Endemik Low-Poly: Orangutan & Burung Rangkong (Enggang)
 * - Api permukaan & bara api bawah tanah (smoldering peat fire) yang menyala saat kemarau + ada bara
 * - Partikel asap 3D membubung naik ke atmosfer
 * - Konstruksi Sekat Kanal (Canal Blocking) dari kayu yang menaikkan muka air dan membasahi gambut
 * - Evakuasi satwa secara dinamis saat kebakaran melanda
 * - Mode X-Ray tembus pandang (xrayMode) memperlihatkan penjalaran api bawah tanah
 * - 3 Hotspot Edukasi Sains
 */
export default function WildfireDiorama3D({
  weatherIntensity,
  xrayMode,
  actions,
  onSelectHotspot,
  showLabels = true,
}: DioramaProps) {
  // References for dynamic animated objects
  const canalWaterRef = useRef<THREE.Mesh>(null);
  const smokeGroupRef = useRef<THREE.Group>(null);
  const fireGroupRef = useRef<THREE.Group>(null);
  const undergroundEmbersRef = useRef<THREE.Group>(null);
  const peatMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const wildlifeGroupRef = useRef<THREE.Group>(null);
  const canalDamRef = useRef<THREE.Group>(null);

  // Smooth lerp values
  const currentWaterY = useRef(-0.45);
  const currentFireIntensity = useRef(0);
  const currentPeatWetness = useRef(0.5);
  const currentWildlifeOffset = useRef(0);

  // Flags aksi (mendukung ID baru maupun fallback alias)
  const isIgnited = !!(actions.baraApi || actions.bakarLahan);
  const hasCanalBlock = !!(actions.sekatKanal || actions.sekatGambut);
  const isPatrolled = !!(actions.patroliHutan || actions.patroliDrone);

  // Api menyala aktif jika disulut bara api / bakar lahan, dan curah hujan/kebasahan rendah
  // Sekat kanal membasahi lahan dan memadamkan api secara efektif
  const fireTarget = isIgnited && !hasCanalBlock ? Math.min(1.0, 0.4 + (weatherIntensity / 100) * 0.6) : 0.0;

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

    const fireActive = currentFireIntensity.current > 0.02;

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
      undergroundEmbersRef.current.visible = fireActive;
      if (fireActive) {
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

          // Siklus hidup partikel asap
          if (smokeNode.position.y > 4.2) {
            smokeNode.position.y = 0.3 + Math.random() * 0.4;
            smokeNode.position.x = p.x;
          }

          // Partikel membesar dan memudar saat naik tinggi
          const progress = (smokeNode.position.y - 0.3) / 3.9;
          const currentScale = p.scale * (1 + progress * 2.5) * density;
          smokeNode.scale.set(currentScale, currentScale, currentScale);

          const mat = (smokeNode as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, (1 - progress) * 0.65 * density);
        });
      }
    }

    // E. Ketinggian Muka Air Parit Kanal (Canal Water Level)
    // Tinggi saat ada sekat: -0.06 (penuh membasahi gambut). Rendah/kering: -0.48
    const targetWater = hasCanalBlock ? -0.06 : -0.48;
    currentWaterY.current = THREE.MathUtils.lerp(currentWaterY.current, targetWater, delta * 3.0);

    if (canalWaterRef.current) {
      canalWaterRef.current.position.y = currentWaterY.current;
      canalWaterRef.current.position.y += Math.sin(time * 2.5) * 0.006;
    }

    // F. Warna Kelembapan Lapisan Gambut (Peat Rewetting Color)
    const targetWetness = hasCanalBlock ? 1.0 : (isIgnited ? 0.0 : 0.4);
    currentPeatWetness.current = THREE.MathUtils.lerp(currentPeatWetness.current, targetWetness, delta * 2.2);

    if (peatMaterialRef.current) {
      // Gambut basah: cokelat hitam legam (#180f09). Gambut kering: cokelat berdebu (#452b1b)
      const dryColor = new THREE.Color("#452b1b");
      const wetColor = new THREE.Color("#180f09");
      peatMaterialRef.current.color.copy(dryColor).lerp(wetColor, currentPeatWetness.current);
    }

    // G. Perilaku Satwa Hutan (Orangutan & Rangkong Evakuasi Menjauhi Api)
    // Satwa mengungsi ke sisi kiri terjauh jika api membara
    const targetWildlifeMove = fireActive ? -0.85 : 0.0;
    currentWildlifeOffset.current = THREE.MathUtils.lerp(currentWildlifeOffset.current, targetWildlifeMove, delta * 2.0);

    if (wildlifeGroupRef.current) {
      wildlifeGroupRef.current.position.x = currentWildlifeOffset.current;
      // Getaran cemas saat ada kebakaran
      if (fireActive) {
        wildlifeGroupRef.current.position.y = Math.sin(time * 10) * 0.02;
      } else {
        wildlifeGroupRef.current.position.y = Math.sin(time * 1.5) * 0.01;
      }
    }
  });

  // Material X-Ray Setting
  const groundOpacity = xrayMode ? 0.25 : 1.0;
  const groundTransparent = xrayMode;

  return (
    <group position={[0, -0.3, 0]}>
      {/* =========================================================================
          1. PARTIKEL ASAP 3D (RISING SMOKE MESHES)
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
          2. POTONGAN 3 LAPISAN GEOLOGI TANAH GAMBUT (PEAT DOME CROSS-SECTION)
         ========================================================================= */}

      {/* A. Lapisan Tanah Mineral Substrat Bawah (Mineral Soil Substrate) */}
      <mesh receiveShadow position={[0, -1.25, 0]}>
        <boxGeometry args={[5.4, 0.7, 5.4]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* B. Lapisan Kubah Gambut Tebal (Thick Peat Layer ~2-3 Meter Nyata) */}
      {/* Balok Gambut Sisi Kiri Kanal (x: -2.7 s/d -0.35) */}
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

      {/* Balok Gambut Sisi Kanan Kanal (x: 0.35 s/d 2.7) */}
      <mesh receiveShadow position={[1.52, -0.4, 0]}>
        <boxGeometry args={[2.35, 1.0, 5.4]} />
        <meshStandardMaterial
          color="#180f09"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* Dasar Palung Kanal Tengah (x: -0.35 s/d 0.35, y: -0.7) */}
      <mesh receiveShadow position={[0, -0.7, 0]}>
        <boxGeometry args={[0.7, 0.4, 5.4]} />
        <meshStandardMaterial
          color="#180f09"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* C. Permukaan Lantai Hutan Tropis (Moss, Leaf Litter, Vegetasi Gambut) */}
      {/* Sisi Kiri */}
      <mesh receiveShadow position={[-1.52, 0.11, 0]}>
        <boxGeometry args={[2.35, 0.04, 5.4]} />
        <meshStandardMaterial
          color={isIgnited && !hasCanalBlock ? "#523620" : "#2d6a4f"}
          roughness={0.8}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* Sisi Kanan (Area Konsentrasi Api jika Terbakar) */}
      <mesh receiveShadow position={[1.52, 0.11, 0]}>
        <boxGeometry args={[2.35, 0.04, 5.4]} />
        <meshStandardMaterial
          color={isIgnited && !hasCanalBlock ? "#3f2514" : "#1b4332"}
          roughness={0.8}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* =========================================================================
          3. PARIT KANAL DRAINASE & SEKAT KANAL (CANAL BLOCKING DAM)
         ========================================================================= */}

      {/* Air Parit Kanal (Canal Water Body) */}
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

      {/* AKSI 1: KONSTRUKSI SEKAT KANAL DARI KAYU (TIMBER CANAL DAM) */}
      {hasCanalBlock && (
        <group ref={canalDamRef} position={[0, -0.05, 0]}>
          {/* Balok Log Kayu Utama Melintang Kanal */}
          {[-0.32, -0.16, 0.0, 0.12].map((yOffset, i) => (
            <mesh key={i} position={[0, yOffset, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.07, 0.07, 0.72, 8]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.8} />
            </mesh>
          ))}

          {/* Tiang Pancang Vertikal Pengunci Sekat Kayu */}
          <mesh position={[-0.28, -0.1, -0.12]}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0.28, -0.1, -0.12]}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, -0.1, 0.12]}>
            <cylinderGeometry args={[0.04, 0.04, 0.75, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>

          {/* Limpasan Air Melewati Pintu Sekat (Spillway Overflow) */}
          <mesh position={[0, 0.08, 0.14]}>
            <boxGeometry args={[0.25, 0.04, 0.2]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {/* Pos Pantau / Menara Pengawas Patroli Hutan (jika actions.patroliHutan aktif) */}
      {(actions.patroliHutan || actions.patroliDrone) && (
        <group position={[-2.1, 0.13, -1.8]}>
          {/* 4 Kaki Menara Kayu */}
          {[-0.2, 0.2].map((x) =>
            [-0.2, 0.2].map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.65, z]}>
                <cylinderGeometry args={[0.02, 0.025, 1.3, 4]} />
                <meshStandardMaterial color="#5c3a21" />
              </mesh>
            ))
          )}
          {/* Platform Gardu Pantau */}
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.55, 0.06, 0.55]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {/* Atap Pelindung Menara */}
          <mesh position={[0, 1.75, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.42, 0.35, 4]} />
            <meshStandardMaterial color="#b91c1c" />
          </mesh>
          {/* Sensor Kamera / Telemetri Drone Pemantau */}
          <mesh position={[0, 1.45, 0.28]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          4. TITIK API PERMUKAAN & BARA API GAMBUT BAWAH TANAH
         ========================================================================= */}

      {/* A. Titik Api Permukaan (Surface Flames di Sisi Kanan) */}
      <group ref={fireGroupRef} position={[1.4, 0.14, 0]}>
        {/* Lidah Api 1 */}
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

        {/* Lidah Api 2 */}
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

        {/* Lidah Api 3 */}
        <group position={[0.6, 0.12, -0.8]}>
          <mesh position={[0, 0.12, 0]}>
            <coneGeometry args={[0.18, 0.45, 5]} />
            <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Arang Batang Kayu Hangus di Tanah */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0.6, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.1]} />
          <meshStandardMaterial color="#171717" roughness={0.9} />
        </mesh>
      </group>

      {/* B. BARA API GAMBUT BAWAH TANAH (SUBTERRANEAN SMOLDERING EMBERS) */}
      {/* Sangat jelas terlihat saat mode X-Ray aktif */}
      <group ref={undergroundEmbersRef} position={[1.4, -0.35, 0]}>
        {/* Titik Bara 1 (Kedalaman -0.3 m) */}
        <mesh position={[-0.3, 0.1, -0.5]}>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ff4500"
            emissiveIntensity={1.5}
            roughness={0.3}
          />
        </mesh>
        {/* Titik Bara 2 (Kedalaman -0.5 m di dalam rongga gambut) */}
        <mesh position={[0.2, -0.12, 0.4]}>
          <dodecahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color="#dc2626"
            emissive="#f97316"
            emissiveIntensity={1.8}
            roughness={0.3}
          />
        </mesh>
        {/* Titik Bara 3 (Menjalar mendekati dinding kanal bawah tanah) */}
        <mesh position={[-0.8, 0.0, 0.2]}>
          <dodecahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial
            color="#b91c1c"
            emissive="#ef4444"
            emissiveIntensity={1.4}
            roughness={0.3}
          />
        </mesh>

        {/* Indikator Garis Penjalaran Api Bawah Tanah saat X-Ray */}
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

      {/* Pohon Raksasa Kiri (Pohon Meranti / Nyatoh Gambut) */}
      <group position={[-1.4, 0.14, 0.4]}>
        {/* Batang Pohon Silinder Menjulang */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.14, 0.18, 1.6, 7]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
        {/* Akar Lutut / Napas Khas Hutan Rawa Gambut */}
        <mesh position={[0.18, 0.1, 0.15]} rotation={[0.4, 0, -0.4]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 5]} />
          <meshStandardMaterial color="#3b1d07" />
        </mesh>
        <mesh position={[-0.18, 0.1, -0.15]} rotation={[-0.3, 0, 0.4]}>
          <cylinderGeometry args={[0.04, 0.06, 0.35, 5]} />
          <meshStandardMaterial color="#3b1d07" />
        </mesh>
        {/* Tajuk Kanopi Rimbun Berlapis */}
        <mesh castShadow position={[0, 1.7, 0]}>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial color="#1b4332" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0.25, 2.1, -0.1]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
        </mesh>
      </group>

      {/* Pohon Sedang Sisi Kiri Depan */}
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
            color={isIgnited && !hasCanalBlock ? "#262626" : "#451a03"}
          />
        </mesh>
        <mesh castShadow position={[0, 1.5, 0]}>
          <icosahedronGeometry args={[0.65, 1]} />
          <meshStandardMaterial
            color={isIgnited && !hasCanalBlock ? "#854d0e" : "#15803d"}
          />
        </mesh>
      </group>

      {/* =========================================================================
          6. DUA (2) SATWA ENDEMIK HUTAN GAMBUT: ORANGUTAN & BURUNG RANGKONG
         ========================================================================= */}
      <group ref={wildlifeGroupRef} position={[0, 0, 0]}>
        {/* SATWA 1: ORANGUTAN KALIMANTAN (Di Cabang / Batang Pohon Aman Sisi Kiri) */}
        <group position={[-1.15, 0.85, 0.35]}>
          {/* Tubuh Bulat Berbulu Oranye-Cokelat */}
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.18, 7, 7]} />
            <meshStandardMaterial color="#c2410c" roughness={0.8} />
          </mesh>
          {/* Kepala Orangutan */}
          <mesh position={[0, 0.38, 0.05]}>
            <sphereGeometry args={[0.12, 7, 7]} />
            <meshStandardMaterial color="#9a3412" roughness={0.7} />
          </mesh>
          {/* Wajah / Bantalan Pipi Melingkar (Flange Wajah Khas) */}
          <mesh position={[0, 0.38, 0.14]}>
            <circleGeometry args={[0.07, 7]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Lengan Panjang Mengayun / Bergelantung */}
          <mesh position={[-0.14, 0.18, 0.05]} rotation={[0, 0, 0.7]}>
            <cylinderGeometry args={[0.035, 0.03, 0.3, 5]} />
            <meshStandardMaterial color="#c2410c" />
          </mesh>
          <mesh position={[0.14, 0.22, 0.05]} rotation={[0, 0, -0.6]}>
            <cylinderGeometry args={[0.035, 0.03, 0.3, 5]} />
            <meshStandardMaterial color="#c2410c" />
          </mesh>
        </group>

        {/* SATWA 2: BURUNG RANGKONG / ENGGANG (Perched di Dahan Atas Sisi Kiri) */}
        <group position={[-1.55, 1.85, 0.2]}>
          {/* Badan Hitam */}
          <mesh position={[0, 0.08, 0]}>
            <capsuleGeometry args={[0.07, 0.14, 4, 6]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
          {/* Ekor Putih Panjang Khas Rangkong */}
          <mesh position={[0, -0.06, -0.1]} rotation={[-0.5, 0, 0]}>
            <boxGeometry args={[0.05, 0.18, 0.02]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
          {/* Kepala Hitam */}
          <mesh position={[0, 0.22, 0.05]}>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Paruh Besar Kuning Lengkung (Casque) */}
          <mesh position={[0, 0.23, 0.14]} rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.045, 0.16, 5]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.3} />
          </mesh>
          {/* Helm Tanduk Merah / Oranye di Atas Paruh */}
          <mesh position={[0, 0.28, 0.1]}>
            <boxGeometry args={[0.04, 0.05, 0.09]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          7. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}

      {/* Hotspot 1: Lapisan Tanah Gambut (Kanan Depan Bawah) */}
      <HotspotPin3D
        position={[1.4, -0.4, 2.0]}
        title="Lapisan Tanah Gambut"
        badge="Spons Karbon Raksasa"
        color="bg-amber-700"
        showLabel={showLabels}
        description="Gambut adalah timbunan bahan organik tumbuhan purba terendam air ribuan tahun. Jika parit kanal menguras airnya, gambut menjadi kering bagaikan batu bara dan memicu kebakaran bawah tanah yang sulit dipadamkan."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Sekat Kanal Pembasah (Tengah Belakang) */}
      <HotspotPin3D
        position={[0.0, 0.6, -1.3]}
        title="Sekat Kanal Pembasah"
        badge="Restorasi Rewetting"
        color="bg-sky-600"
        showLabel={showLabels}
        description="Penyekatan parit kanal menahan aliran air agar tidak terkuras keluar, menaikkan muka air tanah kembali, dan membasahi kubah gambut sehingga api bawah tanah tidak mungkin menyala."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Habitat Satwa Hutan (Kiri Atas Satwa) */}
      <HotspotPin3D
        position={[-1.5, 1.6, 0.5]}
        title="Habitat Satwa Hutan"
        badge="Biodiversitas Tropis"
        color="bg-emerald-600"
        showLabel={showLabels}
        description="Hutan rawa gambut alami adalah rumah bagi satwa endemik langka seperti Orangutan dan Burung Rangkong. Menjaga kelembapan gambut melindungi satwa dari ancaman kepunahan akibat kabut asap kebakaran."
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
