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
    # Ensure translation import after useLanguage import
    if ($content -match 'import \{ useLanguage \} from "\.\./\.\./context/LanguageContext";') {
        if (-not $content.Contains('import { t } from "../utils/translate";')) {
            $content = $content -replace '(import \{ useLanguage \} from "\.\./\.\./context/LanguageContext";)', "`$1`nimport { t } from \"../utils/translate\";"
        }
    }
    $replacements = @(
        @{ Pattern = '\{isEn \? "Nature & Eco Learning Hub" : "Tempat Belajar tentang Alam"\}'; Replace = '{t("nature_and_eco_hub", isEn)}' },
        @{ Pattern = '\{isEn \? "Empowering Eco-Conscious &amp; Climate-Resilient Generations" : "Membangun Generasi Peduli Alam dan Tangguh Bencana"\}'; Replace = '{t("empowering_tagline", isEn)}' },
        @{ Pattern = '\{isEn \? "An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges." : "Media belajar di web yang membantu anak-anak menjaga alam, merawat lingkungan, dan kesiapan bencana untuk pelajar Indonesia."\}'; Replace = '{t("header_description", isEn)}' },
        @{ Pattern = '\{isEn \? \["Learn", "Explore", "Act"\] : \["Belajar", "Bermain", "Beraksi"\]\}'; Replace = '{isEn ? [t("learn", isEn), t("explore", isEn), t("act", isEn)] : [t("learn", false), t("explore", false), t("act", false)]}' },
        @{ Pattern = '\{isEn \? "Warm greetings! I\\'m Rimba, the hornbill guardian of the rainforest canopy!" : "Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!"\}'; Replace = '{t("mascot_speech", isEn)}' },
        @{ Pattern = '\{isEn \? "Contact Rimba" : "Hubungi Rimba"\}'; Replace = '{t("contact_title", isEn)}' },
        @{ Pattern = '\{isEn\s*\?\s*"Have a question, eco story, or idea to make environmental learning even more exciting\? Reach out to us."\s*:\s*"Punya pertanyaan, cerita, atau ide untuk membuat belajar tentang alam jadi lebih seru\? Ceritakan kepada kami."\}'; Replace = '{t("contact_desc", isEn)}' },
        @{ Pattern = '\"Contact Rimba\"'; Replace = '{t("contact_title", isEn)}' },
        @{ Pattern = '\"Hubungi Rimba\"'; Replace = '{t("contact_title", false)}' }
        # Add more patterns as needed
    )
    foreach ($pair in $replacements) {
        $content = $content -replace $pair.Pattern, $pair.Replace
    }
    Set-Content -Path $file -Value $content -Encoding utf8
    Write-Host "Processed $file"
}
