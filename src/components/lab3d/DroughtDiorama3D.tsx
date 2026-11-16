import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * DroughtDiorama3D: Diorama 3D Interaktif Kekeringan, Pertanian & Cadangan Air Tanah
 * 
 * Fitur:
 * - Matahari 3D yang membesar & bersinar terik sesuai weatherIntensity (indeks kemarau)
 * - Potongan geologi dengan tangki cadangan air tanah (akuifer) bawah tanah & sumur galian desa
 * - Petak kebun/sawah: berubah dari hijau segar ke retak-retak kering gersang saat kekeringan
 * - Tanaman melayu/menyusut jika kekurangan air
 * - Tandon pemanen air hujan (rainwater harvesting) di samping rumah warga (actions.tandonHujan / tandonAir)
 * - Jalur pipa mikro irigasi tetes (drip irrigation) dengan animasi tetesan air biru (actions.irigasiTetes)
 * - Efek pompa air tanah boros (actions.borosAir / sedotAirDalam) yang menguras akuifer
 * - Mode X-Ray tembus pandang (xrayMode)
 * - 3 Hotspot Edukasi Sains
 */
export default function DroughtDiorama3D({
  weatherIntensity,
  xrayMode,
  actions,
  onSelectHotspot,
  showLabels = true,
}: DioramaProps) {
  // References for dynamic animated objects
  const sunGroupRef = useRef<THREE.Group>(null);
  const sunCoreRef = useRef<THREE.Mesh>(null);
  const aquiferWaterRef = useRef<THREE.Mesh>(null);
  const wellWaterRef = useRef<THREE.Mesh>(null);
  const soilPlotMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const dripParticlesRef = useRef<THREE.Group>(null);
  const plantsGroupRef = useRef<THREE.Group>(null);
  const cracksGroupRef = useRef<THREE.Group>(null);

  // Smooth lerp values
  const currentAquiferY = useRef(-0.85);
  const currentDryness = useRef(0.2);
  const currentSunScale = useRef(1.0);

  // Flags aksi simulasi (mendukung ID baru maupun fallback alias)
  const hasRainTank = !!(actions.tandonHujan || actions.tandonAir);
  const hasDripIrrigation = !!actions.irigasiTetes;
  const isWastefulPumping = !!(actions.borosAir || actions.sedotAirDalam);
  const isBurningResidue = !!actions.bakarJerami;

  // Setup partikel tetesan irigasi tetes
  const dripDropCount = 24;
  const dripDropOffsets = useMemo(() => {
    return Array.from({ length: dripDropCount }, (_, i) => ({
      x: 0.7 + (i % 4) * 0.45,
      z: -0.6 + Math.floor(i / 4) * 0.45,
      delay: Math.random() * 2,
    }));
  }, []);

  // 2. Loop Animasi Interaktif useFrame
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // A. Animasi & Rotasi Matahari 3D
    const targetSunScale = 0.7 + (weatherIntensity / 100) * 0.7;
    currentSunScale.current = THREE.MathUtils.lerp(currentSunScale.current, targetSunScale, delta * 3);

    if (sunGroupRef.current) {
      sunGroupRef.current.scale.setScalar(currentSunScale.current);
      // Rotasi pelan lidah api matahari
      sunGroupRef.current.rotation.y = time * 0.25;
      sunGroupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }

    if (sunCoreRef.current) {
      const heatFactor = weatherIntensity / 100;
      const coreMat = sunCoreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 0.5 + heatFactor * 1.5;
    }

    // B. Kalkulasi Kekeringan Tanah (Dryness Level 0 s/d 1)
    // Dryness naik saat cuaca terik + boros pompa, dan turun jika ada irigasi tetes & tandon
    let targetDryness = (weatherIntensity / 100) * 0.75;
    if (isWastefulPumping) targetDryness += 0.35;
    if (isBurningResidue) targetDryness += 0.15;
    if (hasDripIrrigation) targetDryness -= 0.45;
    if (hasRainTank) targetDryness -= 0.2;
    targetDryness = Math.max(0.05, Math.min(1.0, targetDryness));

    currentDryness.current = THREE.MathUtils.lerp(currentDryness.current, targetDryness, delta * 2.5);

    // C. Ketinggian Cadangan Air Tanah / Akuifer (Lerp)
    // Full level: -0.72, Kering tandus: -1.45
    let targetWaterY = -0.75 - (weatherIntensity / 100) * 0.35;
    if (isWastefulPumping) targetWaterY -= 0.35;
    if (hasRainTank) targetWaterY += 0.25;
    if (hasDripIrrigation) targetWaterY += 0.12;
    targetWaterY = Math.max(-1.42, Math.min(-0.7, targetWaterY));

    currentAquiferY.current = THREE.MathUtils.lerp(currentAquiferY.current, targetWaterY, delta * 2.8);

    if (aquiferWaterRef.current) {
      aquiferWaterRef.current.position.y = currentAquiferY.current;
      aquiferWaterRef.current.position.y += Math.sin(time * 2.5) * 0.008;
    }

    if (wellWaterRef.current) {
      // Muka air di dalam tabung sumur desa
      wellWaterRef.current.position.y = currentAquiferY.current + 0.15;
    }

    // D. Warna Tanah Petak Sawah/Kebun (Hijau Subur -> Cokelat Retak Kering)
    if (soilPlotMatRef.current) {
      const fertileColor = new THREE.Color("#4d7c0f"); // Hijau subur segar
      const aridColor = new THREE.Color("#854d0e");    // Cokelat tanah kering
      soilPlotMatRef.current.color.copy(fertileColor).lerp(aridColor, currentDryness.current);
    }

    // Retakan tanah muncul jelas saat kekeringan melanda
    if (cracksGroupRef.current) {
      const crackVisibility = currentDryness.current > 0.45;
      cracksGroupRef.current.visible = crackVisibility;
      if (crackVisibility) {
        const crackScale = (currentDryness.current - 0.45) * 1.8;
        cracksGroupRef.current.scale.set(1, Math.min(1, crackScale), 1);
      }
    }

    // E. Tanaman Layu / Merunduk
    if (plantsGroupRef.current) {
      const wiltingFactor = currentDryness.current;
      // Skala tanaman mengecil saat layu
      const plantScale = 1.0 - wiltingFactor * 0.45;
      plantsGroupRef.current.children.forEach((plant, idx) => {
        plant.scale.set(plantScale, plantScale, plantScale);
        // Tundukan sedikit tanaman yang kering
        plant.rotation.z = Math.sin(time + idx) * 0.05 + wiltingFactor * 0.25;
      });
    }

    // F. Animasi Partikel Tetesan Irigasi Tetes
    if (dripParticlesRef.current) {
      dripParticlesRef.current.visible = hasDripIrrigation;
      if (hasDripIrrigation) {
        const drops = dripParticlesRef.current.children;
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          const dropData = dripDropOffsets[i % dripDropOffsets.length];
          const cycleTime = (time * 2.8 + dropData.delay) % 1.0;
          // Tetesan air jatuh dari pipa (y = 0.22) ke tanah (y = 0.12)
          drop.position.y = 0.22 - cycleTime * 0.1;
          const mat = (drop as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = 1.0 - cycleTime * 0.7;
        }
      }
    }
  });

  // Material X-Ray Setting
  const groundOpacity = xrayMode ? 0.25 : 1.0;
  const groundTransparent = xrayMode;

  return (
    <group position={[0, -0.3, 0]}>
      {/* =========================================================================
          1. MATAHARI 3D (LOW-POLY BLAZING SUN)
         ========================================================================= */}
      <group position={[1.8, 3.8, -1.8]} ref={sunGroupRef}>
        {/* Bola Inti Matahari */}
        <mesh ref={sunCoreRef} castShadow>
          <sphereGeometry args={[0.65, 12, 12]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#f59e0b"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>

        {/* Lidah Api / Mahkota Sinar Matahari (Low-poly Corona Cones) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.85, Math.sin(angle) * 0.85, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}
            >
              <coneGeometry args={[0.18, 0.45, 4]} />
              <meshBasicMaterial
                color={weatherIntensity > 65 ? "#f97316" : "#fbbf24"}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}

        {/* Cincin Pendaran Panas Halus */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1.25, 16]} />
          <meshBasicMaterial
            color="#fb923c"
            transparent
            opacity={0.25 + (weatherIntensity / 100) * 0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* =========================================================================
          2. POTONGAN 3 LAPISAN GEOLOGI (CROSS-SECTION CUTAWAY)
         ========================================================================= */}

      {/* A. BATUAN DASAR KEDAP AIR (IMPERMEABLE BEDROCK BASE) */}
      <mesh receiveShadow position={[0, -1.2, 0]}>
        <boxGeometry args={[5.4, 0.8, 5.4]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* B. LAPISAN PORUS AKUIFER (SAND & GRAVEL POROUS LAYER) */}
      {/* Sisi Dinding Luar Akuifer (Cutaway frame) */}
      <mesh receiveShadow position={[0, -0.65, 0]}>
        <boxGeometry args={[5.4, 0.7, 5.4]} />
        <meshStandardMaterial
          color="#78350f"
          roughness={0.95}
          transparent={groundTransparent}
          opacity={groundOpacity * 0.9}
        />
      </mesh>

      {/* C. TANGKI CADANGAN AIR TANAH ALAMI (AQUIFER WATER BODY) */}
      <group position={[0, 0, 0]}>
        <mesh ref={aquiferWaterRef} position={[0, -0.85, 0]}>
          <boxGeometry args={[5.25, 0.45, 5.25]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={xrayMode ? 0.6 : 0.25}
            roughness={0.1}
            metalness={0.3}
            transparent
            opacity={0.78}
          />
        </mesh>

        {/* Efek Indikator Permukaan Air Tanah (Glow Mesh saat X-Ray) */}
        {xrayMode && (
          <mesh position={[0, -0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5.26, 5.26]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.35}
              wireframe
            />
          </mesh>
        )}
      </group>

      {/* D. LAPISAN TOPSOIL ATAS & KEBUN */}
      <mesh receiveShadow position={[0, 0.0, 0]}>
        <boxGeometry args={[5.4, 0.26, 5.4]} />
        <meshStandardMaterial
          color="#5c4033"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* =========================================================================
          3. KONTUR LANSEKAP PERMUKAAN: BUKIT HULU & LEMBAH PERTANIAN
         ========================================================================= */}

      {/* A. Bukit Hulu di Belakang (Upstream Ridge) */}
      <group position={[0, 0.25, -2.1]}>
        <mesh receiveShadow castShadow position={[-1.4, 0.4, 0]}>
          <boxGeometry args={[2.5, 0.8, 1.1]} />
          <meshStandardMaterial
            color={weatherIntensity > 60 ? "#713f12" : "#2f855a"}
            roughness={0.8}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>
        <mesh receiveShadow castShadow position={[1.2, 0.3, 0]}>
          <boxGeometry args={[2.8, 0.6, 1.1]} />
          <meshStandardMaterial
            color={weatherIntensity > 60 ? "#854d0e" : "#38a169"}
            roughness={0.8}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>

        {/* Pohon Hulu Lereng */}
        <group position={[-1.8, 0.85, 0]}>
          <mesh castShadow position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.6, 5]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh castShadow position={[0, 0.75, 0]}>
            <coneGeometry args={[0.38, 0.7, 5]} />
            <meshStandardMaterial color={weatherIntensity > 70 ? "#a16207" : "#166534"} />
          </mesh>
        </group>
        <group position={[1.6, 0.65, 0]}>
          <mesh castShadow position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.5, 5]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh castShadow position={[0, 0.6, 0]}>
            <coneGeometry args={[0.32, 0.6, 5]} />
            <meshStandardMaterial color={weatherIntensity > 70 ? "#a16207" : "#15803d"} />
          </mesh>
        </group>
      </group>

      {/* B. Rumput Halaman Depan & Pedesaan (Sisi Kiri) */}
      <mesh receiveShadow position={[-1.35, 0.135, 0.4]}>
        <boxGeometry args={[2.5, 0.03, 3.6]} />
        <meshStandardMaterial
          color={weatherIntensity > 65 ? "#a16207" : "#4ade80"}
          roughness={0.7}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* C. Petak Sawah / Kebun Pertanian (Sisi Kanan) */}
      <group position={[1.35, 0.14, 0.4]}>
        {/* Bedengan Lahan Kebun */}
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.04, 3.6]} />
          <meshStandardMaterial
            ref={soilPlotMatRef}
            color="#4d7c0f"
            roughness={0.9}
          />
        </mesh>

        {/* Pematang / Pembatas Petak Tanah */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.08, 0.04, 3.55]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[2.45, 0.04, 0.08]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>

        {/* Garis-Garis Retakan Tanah Sawah Kering (Cracked Soil) */}
        <group ref={cracksGroupRef} position={[0, 0.025, 0]}>
          {/* Garis Retakan 1 */}
          <mesh position={[-0.5, 0, -0.6]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.2]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          {/* Garis Retakan 2 */}
          <mesh position={[0.6, 0, 0.5]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.4]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          {/* Garis Retakan 3 */}
          <mesh position={[-0.4, 0, 0.8]} rotation={[0, 0.8, 0]}>
            <boxGeometry args={[0.035, 0.02, 0.9]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          {/* Garis Retakan 4 */}
          <mesh position={[0.5, 0, -0.9]} rotation={[0, -0.3, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.0]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
        </group>

        {/* Tanaman Sayur / Padi di Petak Kebun */}
        <group ref={plantsGroupRef} position={[0, 0.03, 0]}>
          {dripDropOffsets.map((pt, i) => (
            <group key={i} position={[pt.x - 1.35, 0, pt.z - 0.4]}>
              {/* Batang Tanaman */}
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.02, 0.025, 0.2, 5]} />
                <meshStandardMaterial
                  color={
                    hasDripIrrigation
                      ? "#22c55e"
                      : weatherIntensity > 65
                      ? "#854d0e"
                      : "#15803d"
                  }
                />
              </mesh>
              {/* Tajuk Daun Tanaman */}
              <mesh position={[0, 0.22, 0]}>
                <dodecahedronGeometry args={[0.08, 0]} />
                <meshStandardMaterial
                  color={
                    hasDripIrrigation
                      ? "#4ade80"
                      : weatherIntensity > 65
                      ? "#ca8a04"
                      : "#22c55e"
                  }
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* =========================================================================
            AKSI 1: SISTEM IRIGASI TETES (DRIP IRRIGATION SYSTEM)
           ========================================================================= */}
        {hasDripIrrigation && (
          <group position={[0, 0.03, 0]}>
            {/* Pipa Induk Hitam di Pinggir Petak */}
            <mesh position={[-1.15, 0.02, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 3.4, 6]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>

            {/* Pipa Distribusi Lateral Mengalir di Sepanjang Barisan Tanaman */}
            {[-1.0, -0.2, 0.6, 1.4].map((zPos, idx) => (
              <group key={idx} position={[0, 0.015, zPos - 0.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.015, 2.2, 6]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.4} />
                </mesh>
              </group>
            ))}

            {/* Partikel Tetesan Air Biru Menetes ke Akar (Drippers) */}
            <group ref={dripParticlesRef}>
              {dripDropOffsets.map((pt, idx) => (
                <mesh key={idx} position={[pt.x - 1.35, 0.15, pt.z - 0.4]}>
                  <sphereGeometry args={[0.022, 5, 5]} />
                  <meshBasicMaterial color="#38bdf8" transparent opacity={0.9} />
                </mesh>
              ))}
            </group>
          </group>
        )}
      </group>

      {/* =========================================================================
          4. RUMAH WARGA, SUMUR DESA, DAN TANDON PEMANEN HUJAN
         ========================================================================= */}

      {/* A. Rumah Warga Pedesaan */}
      <group position={[-1.3, 0.15, -0.4]}>
        {/* Pondasi Lantai */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.2, 0.16, 1.1]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        {/* Dinding Rumah Kayu Hangat */}
        <mesh castShadow position={[0, 0.42, 0]}>
          <boxGeometry args={[1.05, 0.52, 0.95]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        {/* Atap Pelana Genteng */}
        <mesh castShadow position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.9, 0.45, 4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.6} />
        </mesh>
        {/* Pintu & Jendela */}
        <mesh position={[0.53, 0.36, 0]}>
          <boxGeometry args={[0.02, 0.32, 0.2]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0.53, 0.46, 0.26]}>
          <boxGeometry args={[0.02, 0.16, 0.16]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.4} />
        </mesh>

        {/* Talang Air di Ujung Atap Rumah (Gutter Pipe) */}
        {hasRainTank && (
          <group position={[0.56, 0.68, 0]}>
            <mesh>
              <boxGeometry args={[0.04, 0.04, 0.98]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
            {/* Pipa Penebeng Mengarah ke Tangki Tandon */}
            <mesh position={[0, -0.25, 0.52]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          </group>
        )}
      </group>

      {/* =========================================================================
          AKSI 2: TANDON PEMANEN AIR HUJAN (RAINWATER HARVESTING TANK)
         ========================================================================= */}
      {hasRainTank && (
        <group position={[-0.65, 0.15, 0.15]}>
          {/* Dudukan Tangki Beton */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.55, 0.16, 0.55]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>

          {/* Tabung Silinder Tangki Air Biru Tosca */}
          <mesh castShadow position={[0, 0.46, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.6, 12]} />
            <meshStandardMaterial
              color="#0284c7"
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>

          {/* Tutup Tangki Atas */}
          <mesh position={[0, 0.77, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 0.06, 12]} />
            <meshStandardMaterial color="#0369a1" />
          </mesh>

          {/* Indikator Level Air & Keran Distribusi */}
          <mesh position={[0.25, 0.42, 0]}>
            <boxGeometry args={[0.02, 0.4, 0.04]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[0.25, 0.22, 0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 0.08, 5]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.8} />
          </mesh>
        </group>
      )}

      {/* B. Sumur Desa (Village Well) & Poros Pipa Sumur Masuk ke Bawah Tanah */}
      <group position={[-1.25, 0.15, 1.45]}>
        {/* Dinding Batu Melingkar Sumur di Permukaan */}
        <mesh castShadow position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.32, 10]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>
        {/* Bibir Dalam Sumur Gelap */}
        <mesh position={[0, 0.325, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 10]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Tiang Kayu & Atap Peneduh Sumur */}
        <mesh position={[-0.26, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.68, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh position={[0.26, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.68, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        {/* Balok Melintang & Roda Kerek Katrol */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.56, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh position={[0, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 6, 12]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Ember Kayu Timba Air */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.07, 0.05, 0.12, 6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Tali Tambang Gantung */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.25, 4]} />
          <meshStandardMaterial color="#d4a373" />
        </mesh>

        {/* POROS TABUNG SUMUR MENEMBUS BAWAH TANAH (WELL SHAFT EXTENSION) */}
        {/* Tabung Silinder Sumur Bawah Tanah yang tembus ke Akuifer */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 1.3, 10]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.9}
            transparent={groundTransparent}
            opacity={xrayMode ? 0.45 : 1.0}
          />
        </mesh>

        {/* Permukaan Air di Dalam Sumur (Bergerak Naik/Turun Sesuai Kondisi) */}
        <mesh ref={wellWaterRef} position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 10]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Pagar Kayu Sederhana di Depan Rumah */}
      <group position={[-0.4, 0.15, 1.45]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.4, 0.1, 0]}>
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.2, 0.14, 0]}>
          <boxGeometry args={[0.44, 0.03, 0.02]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
      </group>

      {/* =========================================================================
          5. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}

      {/* Hotspot 1: Tandon Pemanen Air Hujan (Kiri Belakang Rumah) */}
      <HotspotPin3D
        position={[-1.3, 1.25, -0.6]}
        title="Tandon Pemanen Air Hujan"
        badge="Rainwater Harvesting"
        color="bg-sky-600"
        showLabel={showLabels}
        description="Menampung limpasan air hujan dari talang atap rumah saat musim basah sebagai cadangan ratusan liter air tawar mandiri saat kemarau panjang tanpa menguras air tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Irigasi Tetes Hemat Air (Kanan Depan Kebun) */}
      <HotspotPin3D
        position={[1.3, 0.75, 0.8]}
        title="Irigasi Tetes Hemat Air"
        badge="Mikro-Irigasi Presisi"
        color="bg-emerald-600"
        showLabel={showLabels}
        description="Sistem mikro-irigasi menyalurkan air langsung ke perakaran tanaman tetes demi tetes, menghemat hingga 80% air dan mencegah penguapan sia-sia di permukaan tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Cadangan Air Tanah (Akuifer) (Kiri Depan Bawah) */}
      <HotspotPin3D
        position={[-0.6, -0.45, 2.0]}
        title="Cadangan Air Tanah (Akuifer)"
        badge="Tabungan Air Alami"
        color="bg-cyan-600"
        showLabel={showLabels}
        description="Lapisan akuifer adalah tabungan air alami bumi. Pengambilan air tanah yang berlebihan tanpa pengisian resapan menyebabkan muka air tanah anjlok dan sumur warga mengering total."
        onSelect={onSelectHotspot}
      />
    </group>
  );
}
