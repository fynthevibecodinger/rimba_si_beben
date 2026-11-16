import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DioramaProps } from "./types";
import HotspotPin3D from "./HotspotPin3D";

/**
 * DroughtDiorama3D: Diorama 3D Interaktif Kekeringan, Pertanian & Cadangan Air Tanah
 * 
 * Lengkap dengan 10 Parameter Aksi Manusia & Rekayasa:
 * 5 Aksi Risiko:
 * 1. borosAir: Keran halaman bocor mengalir deras terus-menerus, membuang air bersih percuma
 * 2. tebangMataAir: Penebangan hutan sekitar mata air hulu, celah mata air kering berbatu
 * 3. sedotAirTanah: Mesin pompa diesel menyedot air tanah dalam dengan getaran mesin kencang
 * 4. cemarSungai: Parit irigasi tercemar busa limbah kehitaman yang mematikan tanaman
 * 5. lahanTerbuka: Tanah kebun dibiarkan gundul tanpa mulsa sehingga uap panas merekahkannya
 * 
 * 5 Solusi Hijau:
 * 1. tandonHujan: Tandon biru penampung air hujan dari talang atap menjaga ketersediaan air
 * 2. irigasiTetes: Jaringan pipa mikro dengan tetesan air biru tepat ke perakaran tanaman
 * 3. reboisasiHulu: Hutan hulu rimbun menjaga spons resapan dan mengalirkan mata air alami
 * 4. embungDesa: Waduk embung penampung air desa bertepi batu mengairi sawah warga
 * 5. mulsaOrganik: Selimut mulsa jerami daun emas menahan penguapan dan menjaga kelembapan tanah
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
  const runningFaucetFlowRef = useRef<THREE.Group>(null);
  const dieselPumpRef = useRef<THREE.Group>(null);
  const springStreamRef = useRef<THREE.Group>(null);
  const embungWaterRef = useRef<THREE.Mesh>(null);
  const heatShimmerRef = useRef<THREE.Group>(null);

  // Smooth lerp values
  const currentAquiferY = useRef(-0.85);
  const currentDryness = useRef(0.2);
  const currentSunScale = useRef(1.0);

  // Flags aksi simulasi
  const hasRainTank = !!actions.tandonHujan;
  const hasDripIrrigation = !!actions.irigasiTetes;
  const isWastefulPumping = !!(actions.borosAir || actions.sedotAirTanah || actions.tebangMataAir);
  const hasMulch = !!actions.mulsaOrganik;
  const hasReforestation = !!actions.reboisasiHulu;
  const hasEmbung = !!actions.embungDesa;

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
      sunGroupRef.current.rotation.y = time * 0.25;
      sunGroupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }

    if (sunCoreRef.current) {
      const heatFactor = weatherIntensity / 100;
      const coreMat = sunCoreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 0.5 + heatFactor * 1.5;
    }

    // B. Kalkulasi Kekeringan Tanah (Dryness Level 0 s/d 1)
    let targetDryness = (weatherIntensity / 100) * 0.75;
    if (actions.borosAir) targetDryness += 0.2;
    if (actions.sedotAirTanah) targetDryness += 0.25;
    if (actions.tebangMataAir) targetDryness += 0.2;
    if (actions.lahanTerbuka) targetDryness += 0.2;
    if (actions.cemarSungai) targetDryness += 0.15;
    if (hasDripIrrigation) targetDryness -= 0.4;
    if (hasMulch) targetDryness -= 0.25;
    if (hasRainTank) targetDryness -= 0.15;
    if (hasReforestation) targetDryness -= 0.2;
    if (hasEmbung) targetDryness -= 0.2;
    targetDryness = Math.max(0.05, Math.min(1.0, targetDryness));

    currentDryness.current = THREE.MathUtils.lerp(currentDryness.current, targetDryness, delta * 2.5);

    // C. Ketinggian Cadangan Air Tanah / Akuifer (Lerp)
    let targetWaterY = -0.75 - (weatherIntensity / 100) * 0.35;
    if (actions.sedotAirTanah) targetWaterY -= 0.35;
    if (actions.borosAir) targetWaterY -= 0.2;
    if (actions.tebangMataAir) targetWaterY -= 0.2;
    if (hasRainTank) targetWaterY += 0.18;
    if (hasReforestation) targetWaterY += 0.25;
    if (hasEmbung) targetWaterY += 0.18;
    targetWaterY = Math.max(-1.42, Math.min(-0.7, targetWaterY));

    currentAquiferY.current = THREE.MathUtils.lerp(currentAquiferY.current, targetWaterY, delta * 2.8);

    if (aquiferWaterRef.current) {
      aquiferWaterRef.current.position.y = currentAquiferY.current;
      aquiferWaterRef.current.position.y += Math.sin(time * 2.5) * 0.008;
    }

    if (wellWaterRef.current) {
      wellWaterRef.current.position.y = currentAquiferY.current + 0.15;
    }

    // D. Warna Tanah Petak Sawah/Kebun
    if (soilPlotMatRef.current) {
      const fertileColor = new THREE.Color("#4d7c0f");
      const aridColor = new THREE.Color("#854d0e");
      soilPlotMatRef.current.color.copy(fertileColor).lerp(aridColor, currentDryness.current);
    }

    // Retakan tanah
    if (cracksGroupRef.current) {
      const crackVisibility = currentDryness.current > 0.4;
      cracksGroupRef.current.visible = crackVisibility;
      if (crackVisibility) {
        const crackScale = (currentDryness.current - 0.4) * 1.8;
        cracksGroupRef.current.scale.set(1, Math.min(1, crackScale), 1);
      }
    }

    // E. Tanaman Layu / Merunduk
    if (plantsGroupRef.current) {
      const wiltingFactor = currentDryness.current;
      const plantScale = hasDripIrrigation || hasMulch ? 1.0 : (1.0 - wiltingFactor * 0.45);
      plantsGroupRef.current.children.forEach((plant, idx) => {
        plant.scale.set(plantScale, plantScale, plantScale);
        plant.rotation.z = Math.sin(time + idx) * 0.05 + (hasDripIrrigation ? 0 : wiltingFactor * 0.25);
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
          drop.position.y = 0.22 - cycleTime * 0.1;
          const mat = (drop as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = 1.0 - cycleTime * 0.7;
        }
      }
    }

    // G. Animasi Keran Bocor / Boros Air (borosAir)
    if (runningFaucetFlowRef.current) {
      runningFaucetFlowRef.current.visible = actions.borosAir;
      if (actions.borosAir) {
        runningFaucetFlowRef.current.children.forEach((drop, idx) => {
          const streamCycle = (time * 4.5 + idx * 0.3) % 1.0;
          drop.position.y = 0.35 - streamCycle * 0.25;
        });
      }
    }

    // H. Animasi Getaran Mesin Sedot Air Tanah (sedotAirTanah)
    if (dieselPumpRef.current) {
      dieselPumpRef.current.visible = actions.sedotAirTanah;
      if (actions.sedotAirTanah) {
        dieselPumpRef.current.position.y = 0.15 + Math.sin(time * 30) * 0.008;
      }
    }

    // I. Animasi Riak Air Alami Mata Air Hulu (reboisasiHulu)
    if (springStreamRef.current) {
      springStreamRef.current.visible = actions.reboisasiHulu;
      if (actions.reboisasiHulu) {
        springStreamRef.current.children.forEach((ripple, idx) => {
          const springCycle = (time * 2.0 + idx * 0.5) % 1.0;
          ripple.position.z = -1.8 + springCycle * 0.6;
        });
      }
    }

    // J. Animasi Riak Air Embung Desa (embungDesa)
    if (embungWaterRef.current) {
      embungWaterRef.current.position.y = 0.18 + Math.sin(time * 2.5) * 0.008;
    }

    // K. Animasi Gelombang Panas Menari di Atas Lahan Terbuka (lahanTerbuka)
    if (heatShimmerRef.current) {
      heatShimmerRef.current.visible = actions.lahanTerbuka && weatherIntensity > 40;
      if (actions.lahanTerbuka) {
        heatShimmerRef.current.children.forEach((wave, idx) => {
          const waveCycle = (time * 1.8 + idx * 0.4) % 1.0;
          wave.position.y = 0.25 + waveCycle * 0.5;
          const mat = (wave as THREE.Mesh).material as THREE.MeshBasicMaterial;
          mat.opacity = Math.sin(waveCycle * Math.PI) * 0.6;
        });
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
        <mesh ref={sunCoreRef} castShadow>
          <sphereGeometry args={[0.65, 12, 12]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#f59e0b"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>

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
      {/* A. BATUAN DASAR KEDAP AIR (BEDROCK BASE) */}
      <mesh receiveShadow position={[0, -1.2, 0]}>
        <boxGeometry args={[5.4, 0.8, 5.4]} />
        <meshStandardMaterial
          color="#334155"
          roughness={0.9}
          transparent={groundTransparent}
          opacity={groundOpacity}
        />
      </mesh>

      {/* B. LAPISAN PORUS AKUIFER (POROUS LAYER) */}
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
      {/* A. Bukit Hulu di Belakang */}
      <group position={[0, 0.25, -2.1]}>
        <mesh receiveShadow castShadow position={[-1.4, 0.4, 0]}>
          <boxGeometry args={[2.5, 0.8, 1.1]} />
          <meshStandardMaterial
            color={actions.tebangMataAir ? "#5c3a21" : weatherIntensity > 60 ? "#713f12" : "#2f855a"}
            roughness={0.8}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>
        <mesh receiveShadow castShadow position={[1.2, 0.3, 0]}>
          <boxGeometry args={[2.8, 0.6, 1.1]} />
          <meshStandardMaterial
            color={actions.tebangMataAir ? "#6b4423" : weatherIntensity > 60 ? "#854d0e" : "#38a169"}
            roughness={0.8}
            transparent={groundTransparent}
            opacity={groundOpacity}
          />
        </mesh>

        {/* AKSI RISIKO 2: TEBANG POHON MATA AIR (tebangMataAir) */}
        {actions.tebangMataAir ? (
          <group position={[-1.6, 0.82, 0]}>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.16, 6]} />
              <meshStandardMaterial color="#5c3a21" />
            </mesh>
            <mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.075, 6]} />
              <meshStandardMaterial color="#d4a373" />
            </mesh>
            {/* Celah Mata Air Kering Kerontang */}
            <mesh position={[0.4, -0.15, 0.2]}>
              <boxGeometry args={[0.3, 0.08, 0.4]} />
              <meshStandardMaterial color="#382215" roughness={1} />
            </mesh>
          </group>
        ) : actions.reboisasiHulu ? (
          /* AKSI SOLUSI 3: REBOISASI HUTAN HULU & ALIRAN MATA AIR (reboisasiHulu) */
          <group position={[-1.6, 0.82, 0]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.7, 6]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
            <mesh position={[0, 0.85, 0]} castShadow>
              <coneGeometry args={[0.48, 0.9, 6]} />
              <meshStandardMaterial color="#1b4332" />
            </mesh>
            <mesh position={[0.4, 0.25, 0.2]} castShadow>
              <coneGeometry args={[0.35, 0.7, 6]} />
              <meshStandardMaterial color="#2d6a4f" />
            </mesh>
            {/* Mata Air Sejuk Beriak Keluar */}
            <group ref={springStreamRef}>
              {[0, 1, 2].map((idx) => (
                <mesh key={idx} position={[0.2, -0.1, 0.2]}>
                  <sphereGeometry args={[0.035, 6, 6]} />
                  <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} />
                </mesh>
              ))}
            </group>
          </group>
        ) : (
          /* Pohon Alami Hulu */
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
        )}
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
        <mesh receiveShadow castShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.04, 3.6]} />
          <meshStandardMaterial
            ref={soilPlotMatRef}
            color="#4d7c0f"
            roughness={0.9}
          />
        </mesh>

        {/* AKSI SOLUSI 5: SELIMUT MULSA ORGANIK (mulsaOrganik) */}
        {hasMulch && (
          <mesh position={[0, 0.025, 0]}>
            <boxGeometry args={[2.45, 0.02, 3.5]} />
            <meshStandardMaterial color="#d97706" roughness={0.95} />
          </mesh>
        )}

        {/* Garis-Garis Retakan Tanah Sawah Kering (Cracked Soil) */}
        <group ref={cracksGroupRef} position={[0, 0.025, 0]}>
          <mesh position={[-0.5, 0, -0.6]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.2]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          <mesh position={[0.6, 0, 0.5]} rotation={[0, -0.5, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.4]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          <mesh position={[-0.4, 0, 0.8]} rotation={[0, 0.8, 0]}>
            <boxGeometry args={[0.035, 0.02, 0.9]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
          <mesh position={[0.5, 0, -0.9]} rotation={[0, -0.3, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.0]} />
            <meshBasicMaterial color="#3b1d07" />
          </mesh>
        </group>

        {/* AKSI RISIKO 5: GELOMBANG PANAS DI LAHAN TERBUKA (lahanTerbuka) */}
        <group ref={heatShimmerRef} position={[0, 0.05, 0]}>
          {[-0.6, 0, 0.6].map((xOff, idx) => (
            <mesh key={idx} position={[xOff, 0.2, (idx - 1) * 0.7]}>
              <cylinderGeometry args={[0.03, 0.03, 0.35, 4]} />
              <meshBasicMaterial color="#fb923c" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>

        {/* Tanaman Sayur / Padi di Petak Kebun */}
        <group ref={plantsGroupRef} position={[0, 0.03, 0]}>
          {dripDropOffsets.map((pt, i) => (
            <group key={i} position={[pt.x - 1.35, 0, pt.z - 0.4]}>
              <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.02, 0.025, 0.2, 5]} />
                <meshStandardMaterial
                  color={
                    hasDripIrrigation || hasMulch
                      ? "#22c55e"
                      : weatherIntensity > 65
                      ? "#854d0e"
                      : "#15803d"
                  }
                />
              </mesh>
              <mesh position={[0, 0.22, 0]}>
                <dodecahedronGeometry args={[0.08, 0]} />
                <meshStandardMaterial
                  color={
                    hasDripIrrigation || hasMulch
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

        {/* AKSI SOLUSI 2: SISTEM IRIGASI TETES (irigasiTetes) */}
        {hasDripIrrigation && (
          <group position={[0, 0.03, 0]}>
            <mesh position={[-1.15, 0.02, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 3.4, 6]} />
              <meshStandardMaterial color="#1e293b" roughness={0.5} />
            </mesh>

            {[-1.0, -0.2, 0.6, 1.4].map((zPos, idx) => (
              <group key={idx} position={[0, 0.015, zPos - 0.2]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.015, 2.2, 6]} />
                  <meshStandardMaterial color="#0f172a" roughness={0.4} />
                </mesh>
              </group>
            ))}

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
          4. AKSI RISIKO 4: PARIT TERCEMAR LIMBAH (cemarSungai)
         ========================================================================= */}
      {actions.cemarSungai && (
        <group position={[0, 0.14, 0.4]}>
          {/* Parit Aliran Air Limbah Keruh Kehitaman */}
          <mesh position={[0, -0.04, 0]}>
            <boxGeometry args={[0.22, 0.06, 3.6]} />
            <meshStandardMaterial color="#292524" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Busa Racun Limbah Terapung */}
          {[-1.0, 0.2, 1.1].map((zPos, idx) => (
            <mesh key={idx} position={[0, -0.01, zPos]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshStandardMaterial color="#84cc16" emissive="#4d7c0f" emissiveIntensity={0.6} />
            </mesh>
          ))}
        </group>
      )}

      {/* =========================================================================
          5. AKSI SOLUSI 4: EMBUNG DESA / KOLAM RETENSI AIR (embungDesa)
         ========================================================================= */}
      {actions.embungDesa && (
        <group position={[-1.3, 0.14, -1.8]}>
          {/* Tanggul Pasangan Batu Kolam Embung */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[1.6, 0.18, 1.3]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>
          {/* Cekungan Kolam Air Biru Menampung Ratusan Liter */}
          <mesh ref={embungWaterRef} position={[0, 0.1, 0]}>
            <boxGeometry args={[1.42, 0.14, 1.12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.3} transparent opacity={0.9} />
          </mesh>
          {/* Dermaga / Pompa Distribusi Embung */}
          <mesh position={[0.7, 0.16, 0]}>
            <boxGeometry args={[0.15, 0.04, 0.4]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
        </group>
      )}

      {/* =========================================================================
          6. RUMAH WARGA, SUMUR DESA, DAN AKSI LAINNYA
         ========================================================================= */}
      <group position={[-1.3, 0.15, -0.4]}>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.2, 0.16, 1.1]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, 0.42, 0]}>
          <boxGeometry args={[1.05, 0.52, 0.95]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.9, 0.45, 4]} />
          <meshStandardMaterial color="#991b1b" roughness={0.6} />
        </mesh>
        <mesh position={[0.53, 0.36, 0]}>
          <boxGeometry args={[0.02, 0.32, 0.2]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0.53, 0.46, 0.26]}>
          <boxGeometry args={[0.02, 0.16, 0.16]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.4} />
        </mesh>

        {/* Talang Air ke Tandon */}
        {hasRainTank && (
          <group position={[0.56, 0.68, 0]}>
            <mesh>
              <boxGeometry args={[0.04, 0.04, 0.98]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
            <mesh position={[0, -0.25, 0.52]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
          </group>
        )}
      </group>

      {/* AKSI RISIKO 1: KERAN HALAMAN BOCOR / BOROS AIR (borosAir) */}
      {actions.borosAir && (
        <group position={[-0.6, 0.15, -0.3]}>
          {/* Tiang Pipa Keran Berdiri */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          {/* Kepala Keran Terbuka */}
          <mesh position={[0.06, 0.48, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.025, 0.12, 6]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          {/* Ember Meluap Tumpah */}
          <mesh position={[0.1, 0.08, 0]}>
            <cylinderGeometry args={[0.12, 0.09, 0.18, 8]} />
            <meshStandardMaterial color="#2563eb" />
          </mesh>
          {/* Genangan Air Terbuang Percuma */}
          <mesh position={[0.12, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.3, 10]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.1} transparent opacity={0.8} />
          </mesh>
          {/* Animasi Curahan Air Mengalir */}
          <group ref={runningFaucetFlowRef}>
            {[0, 1, 2].map((idx) => (
              <mesh key={idx} position={[0.1, 0.3, 0]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshStandardMaterial color="#38bdf8" />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* AKSI SOLUSI 1: TANDON PEMANEN AIR HUJAN (tandonHujan) */}
      {hasRainTank && (
        <group position={[-0.65, 0.15, 0.15]}>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.55, 0.16, 0.55]} />
            <meshStandardMaterial color="#64748b" roughness={0.8} />
          </mesh>
          <mesh castShadow position={[0, 0.46, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.6, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.77, 0]}>
            <cylinderGeometry args={[0.18, 0.24, 0.06, 12]} />
            <meshStandardMaterial color="#0369a1" />
          </mesh>
          <mesh position={[0.25, 0.42, 0]}>
            <boxGeometry args={[0.02, 0.4, 0.04]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
        </group>
      )}

      {/* AKSI RISIKO 3: MESIN POMPA SEDOT AIR TANAH BERLEBIHAN (sedotAirTanah) */}
      {actions.sedotAirTanah && (
        <group ref={dieselPumpRef} position={[-0.6, 0.15, 1.45]}>
          {/* Mesin Genset / Pompa Diesel Keras Bergetar */}
          <mesh position={[0, 0.16, 0]}>
            <boxGeometry args={[0.35, 0.28, 0.4]} />
            <meshStandardMaterial color="#b91c1c" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Pipa Bor Dalam Menembus ke Akuifer */}
          <mesh position={[0, -0.65, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.4, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          {/* Knalpot Asap Mesin */}
          <mesh position={[-0.1, 0.35, -0.1]}>
            <cylinderGeometry args={[0.02, 0.02, 0.18, 6]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
        </group>
      )}

      {/* B. Sumur Desa (Village Well) */}
      <group position={[-1.25, 0.15, 1.45]}>
        <mesh castShadow position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.32, 10]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.325, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.02, 10]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.26, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.68, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh position={[0.26, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.68, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.56, 5]} />
          <meshStandardMaterial color="#5c3a21" />
        </mesh>
        <mesh position={[0, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.015, 6, 12]} />
          <meshStandardMaterial color="#475569" />
        </mesh>

        {/* Tabung Silinder Sumur Bawah Tanah */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 1.3, 10]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.9}
            transparent={groundTransparent}
            opacity={xrayMode ? 0.45 : 1.0}
          />
        </mesh>

        {/* Permukaan Air di Dalam Sumur */}
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

      {/* =========================================================================
          7. TIGA (3) HOTSPOT PIN EDUKASI 3D
         ========================================================================= */}
      {/* Hotspot 1: Tandon Pemanen Air Hujan */}
      <HotspotPin3D
        position={[-1.3, 1.25, -0.6]}
        title="Tandon Pemanen Air Hujan"
        badge="Rainwater Harvesting"
        color="bg-sky-600"
        showLabel={showLabels}
        description="Menampung limpasan air hujan dari talang atap rumah saat musim basah sebagai cadangan ratusan liter air tawar mandiri saat kemarau panjang tanpa menguras air tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 2: Irigasi Tetes Hemat Air */}
      <HotspotPin3D
        position={[1.3, 0.75, 0.8]}
        title="Irigasi Tetes Hemat Air"
        badge="Mikro-Irigasi Presisi"
        color="bg-emerald-600"
        showLabel={showLabels}
        description="Sistem mikro-irigasi menyalurkan air langsung ke perakaran tanaman tetes demi tetes, menghemat hingga 80% air dan mencegah penguapan sia-sia di permukaan tanah."
        onSelect={onSelectHotspot}
      />

      {/* Hotspot 3: Cadangan Air Tanah (Akuifer) */}
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
