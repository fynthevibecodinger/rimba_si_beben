$files = @(
    "d:/5_Project Team/rimba_si_beben/src/pages/About.tsx",
    "d:/5_Project Team/rimba_si_beben/src/pages/Contact.tsx",
    "d:/5_Project Team/rimba_si_beben/src/pages/EcosystemSimulation.tsx",
    "d:/5_Project Team/rimba_si_beben/src/pages/Gallery.tsx",
    "d:/5_Project Team/rimba_si_beben/src/pages/Home.tsx",
    "d:/5_Project Team/rimba_si_beben/src/pages/IssueDetail.tsx"
)

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    # Ensure translation import exists after useLanguage import (if present)
    if ($content -match "import \{ useLanguage \} from \"..\\/..\\/context\\/LanguageContext\"") {
        if (-not $content.Contains('import { t } from "../utils/translate"')) {
            $content = $content -replace "(import \{ useLanguage \} from \"..\\/..\\/context\\/LanguageContext\";)",
                "`$1`nimport { t } from \"../utils/translate\";"
        }
    }
    # Simple replacements (add more as needed)
    $replacements = @{
        "{isEn ? \"Nature & Eco Learning Hub\" : \"Tempat Belajar tentang Alam\"}" = "{t('nature_and_eco_hub', isEn)}";
        "{isEn ? \"Empowering Eco-Conscious &amp; Climate-Resilient Generations\" : \"Membangun Generasi Peduli Alam dan Tangguh Bencana\"}" = "{t('empowering_tagline', isEn)}";
        "{isEn ? \"An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges.\" : \"Media belajar di web yang membantu anak-anak menjaga alam, merawat lingkungan, dan kesiapan bencana untuk pelajar Indonesia.\"}" = "{t('header_description', isEn)}";
        "{isEn ? [\"Learn\", \"Explore\", \"Act\"] : [\"Belajar\", \"Bermain\", \"Beraksi\"]}" = "{isEn ? [t('learn', isEn), t('explore', isEn), t('act', isEn)] : [t('learn', false), t('explore', false), t('act', false)]}";
        "{isEn ? \"Warm greetings! I\\'m Rimba, the hornbill guardian of the rainforest canopy!\" : \"Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!\"}" = "{t('mascot_speech', isEn)}";
        "\"Profil Karakter Maskot\"" = "{t('core_value_resilient', isEn)}";
        "\"Rimba si Rangkong Eco-Ranger\"" = "{t('core_value_resilient', isEn)}";
        "\"Tangguh\"" = "{t('core_value_resilient', isEn)}";
        "\"Berani bersiap, sigap menghadapi risiko, dan mampu bangkit bersama.\"" = "{t('core_value_resilient_text', isEn)}";
        "\"Peduli Alam\"" = "{t('core_value_care', isEn)}";
        "\"Menjaga ekosistem sebagai bagian penting dari upaya mengurangi risiko bencana.\"" = "{t('core_value_care_text', isEn)}";
        "\"Berbasis Sains\"" = "{t('core_value_science', isEn)}";
        "\"Mengutamakan informasi yang masuk akal, relevan, dan dapat dipertanggungjawabkan.\"" = "{t('core_value_science_text', isEn)}";
        "\"Kolaboratif\"" = "{t('core_value_collaborative', isEn)}";
        "\"Membangun kesiapan melalui kepedulian dan kerja sama lintas komunitas.\"" = "{t('core_value_collaborative_text', isEn)}";
        "\"3 Pilar Pembelajaran Berkelanjutan\"" = "{t('learning_pillars', isEn)}";
        "\"1. Sains &amp; Sebab-Akibat\"" = "{t('pillar_science', isEn)}";
        "\"Meluruskan pemahaman yang keliru bahwa bencana alam semata-mata takdir tak terduga. Bencana adalah perpaduan ancaman alam dan kondisi yang membuat mudah terdampak aktivitas manusia.\"" = "{t('pillar_science_desc', isEn)}";
        "\"2. Simulasi Interaktif\"" = "{t('pillar_simulation', isEn)}";
        "\"Pelajar tidak hanya membaca teks hafalan, tetapi bereksperimen mengubah variabel iklim dan melihat respon kanvas ekologi secara visual.\"" = "{t('pillar_simulation_desc', isEn)}";
        "\"3. Aksi Nyata Pelajar\"" = "{t('pillar_action', isEn)}";
        "\"Panduan praktis membuat lubang resapan, menyiapkan tas darurat 3 hari, dan menyelamatkan diri bersama keluarga.\"" = "{t('pillar_action_desc', isEn)}";
        "\"Siap Menjadi Pahlawan Kesiapsiagaan Bencana?\"" = "{t('cta_ready', isEn)}";
        "\"Mulailah dengan memilih salah satu materi lingkungan atau mencoba permainan simulasi.\"" = "{t('cta_start', isEn)}";
        ">Jelajahi Materi<" = ">\{t('cta_explore_material', isEn)}<";
        ">Masuk Simulasi<" = ">\{t('cta_enter_simulation', isEn)}<";
        "\"Visi &amp; Misi\"" = "{t('vision_mission', isEn)}";
        "\"Latar Belakang Masalah\"" = "{t('background_problem', isEn)}";
        "\"Kesiapsiagaan dimulai dari pengetahuan\"" = "{t('preparation_knowledge', isEn)}";
        "\"Visi\"" = "{t('vision', isEn)}";
        "\"Mewujudkan generasi Indonesia yang tangguh bencana, peduli lingkungan, dan mampu mengambil tindakan berbasis pengetahuan.\"" = "{t('vision_text', isEn)}";
        "\"Misi\"" = "{t('mission', isEn)}";
        "\"Menyajikan literasi bencana dan iklim yang mudah dipahami.\"" = "{t('mission_item_1', isEn)}";
        "\"Menghadirkan simulasi untuk melatih nalar dan pengambilan keputusan.\"" = "{t('mission_item_2', isEn)}";
        "\"Mendorong aksi kecil yang berdampak bagi keluarga, lingkungan, dan alam.\"" = "{t('mission_item_3', isEn)}";
        "\"Di Balik Rimba\"" = "{t('behind_rimba', isEn)}";
        "\"Tim Pengembang\"" = "{t('dev_team', isEn)}";
        "\"Rimba dibuat bersama untuk membantu anak-anak belajar, bermain, lalu ikut menjaga alam.\"" = "{t('team_desc', isEn)}";
    }
    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }
    Set-Content -Path $file -Value $content -Encoding utf8
    Write-Host "Processed $file"
}
