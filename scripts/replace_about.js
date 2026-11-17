const fs = require('fs');
const path = 'd:/5_Project Team/rimba_si_beben/src/pages/About.tsx';
let content = fs.readFileSync(path, 'utf8');
// Ensure translation import exists (already added)
// Define replacement map
const map = [
  {pattern: /\{isEn \? \"Nature & Eco Learning Hub\" : \"Tempat Belajar tentang Alam\"\}/g, replace: '{t("nature_and_eco_hub", isEn)}'},
  {pattern: /\{isEn \? \"Empowering Eco-Conscious & Climate-Resilient Generations\" : \"Membangun Generasi Peduli Alam dan Tangguh Bencana\"\}/g, replace: '{t("empowering_tagline", isEn)}'},
  {pattern: /\{isEn\s*\?\s*\"An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges\.\"\s*:\s*\"Media belajar di web yang membantu anak-anak menjaga alam, merawat lingkungan, dan kesiapan bencana untuk pelajar Indonesia\.\"\}/g, replace: '{t("header_description", isEn)}'},
  {pattern: /\{isEn \? \[\"Learn\", \"Explore\", \"Act\"\] : \[\"Belajar\", \"Bermain\", \"Beraksi\"\]\}/g, replace: '{isEn ? [t("learn", isEn), t("explore", isEn), t("act", isEn)] : [t("learn", false), t("explore", false), t("act", false)]}'},
  {pattern: /\{isEn\s*\?\s*\"Warm greetings! I\\'m Rimba, the hornbill guardian of the rainforest canopy!\"\s*:\s*\"Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!\"\}/g, replace: '{t("mascot_speech", isEn)}'},
  {pattern: /\"Profil Karakter Maskot\"/g, replace: '{t("core_value_resilient", isEn)}'},
  {pattern: /\"Rimba si Rangkong Eco-Ranger\"/g, replace: '{t("core_value_resilient", isEn)}'},
  {pattern: /\"Tangguh\"/g, replace: '{t("core_value_resilient", isEn)}'},
  {pattern: /\"Berani bersiap, sigap menghadapi risiko, dan mampu bangkit bersama.\"/g, replace: '{t("core_value_resilient_text", isEn)}'},
  {pattern: /\"Peduli Alam\"/g, replace: '{t("core_value_care", isEn)}'},
  {pattern: /\"Menjaga ekosistem sebagai bagian penting dari upaya mengurangi risiko bencana.\"/g, replace: '{t("core_value_care_text", isEn)}'},
  {pattern: /\"Berbasis Sains\"/g, replace: '{t("core_value_science", isEn)}'},
  {pattern: /\"Mengutamakan informasi yang masuk akal, relevan, dan dapat dipertanggungjawabkan.\"/g, replace: '{t("core_value_science_text", isEn)}'},
  {pattern: /\"Kolaboratif\"/g, replace: '{t("core_value_collaborative", isEn)}'},
  {pattern: /\"Membangun kesiapan melalui kepedulian dan kerja sama lintas komunitas.\"/g, replace: '{t("core_value_collaborative_text", isEn)}'},
  {pattern: /\"3 Pilar Pembelajaran Berkelanjutan\"/g, replace: '{t("learning_pillars", isEn)}'},
  {pattern: /\"1\. Sains &amp; Sebab-Akibat\"/g, replace: '{t("pillar_science", isEn)}'},
  {pattern: /\"Meluruskan pemahaman yang keliru bahwa bencana alam semata-mata takdir tak terduga\. Bencana adalah perpaduan ancaman alam dan kondisi yang membuat mudah terdampak aktivitas manusia\.\"/g, replace: '{t("pillar_science_desc", isEn)}'},
  {pattern: /\"2\. Simulasi Interaktif\"/g, replace: '{t("pillar_simulation", isEn)}'},
  {pattern: /\"Pelajar tidak hanya membaca teks hafalan, tetapi bereksperimen mengubah variabel iklim dan melihat respon kanvas ekologi secara visual\.\"/g, replace: '{t("pillar_simulation_desc", isEn)}'},
  {pattern: /\"3\. Aksi Nyata Pelajar\"/g, replace: '{t("pillar_action", isEn)}'},
  {pattern: /\"Panduan praktis membuat lubang resapan, menyiapkan tas darurat 3 hari, dan menyelamatkan diri bersama keluarga\.\"/g, replace: '{t("pillar_action_desc", isEn)}'},
  {pattern: /\"Siap Menjadi Pahlawan Kesiapsiagaan Bencana\?\"/g, replace: '{t("cta_ready", isEn)}'},
  {pattern: /\"Mulailah dengan memilih salah satu materi lingkungan atau mencoba permainan simulasi\.\"/g, replace: '{t("cta_start", isEn)}'},
  {pattern: />Jelajahi Materi</g, replace: '>\{t("cta_explore_material", isEn)}<'},
  {pattern: />Masuk Simulasi</g, replace: '>\{t("cta_enter_simulation", isEn)}<'},
  {pattern: /\"Visi &amp; Misi\"/g, replace: '{t("vision_mission", isEn)}'},
  {pattern: /\"Latar Belakang Masalah\"/g, replace: '{t("background_problem", isEn)}'},
  {pattern: /\"Kesiapsiagaan dimulai dari pengetahuan\"/g, replace: '{t("preparation_knowledge", isEn)}'},
  {pattern: /\"Visi\"/g, replace: '{t("vision", isEn)}'},
  {pattern: /\"Mewujudkan generasi Indonesia yang tangguh bencana, peduli lingkungan, dan mampu mengambil tindakan berbasis pengetahuan\.\"/g, replace: '{t("vision_text", isEn)}'},
  {pattern: /\"Misi\"/g, replace: '{t("mission", isEn)}'},
  {pattern: /\"Menyajikan literasi bencana dan iklim yang mudah dipahami\.\"/g, replace: '{t("mission_item_1", isEn)}'},
  {pattern: /\"Menghadirkan simulasi untuk melatih nalar dan pengambilan keputusan\.\"/g, replace: '{t("mission_item_2", isEn)}'},
  {pattern: /\"Mendorong aksi kecil yang berdampak bagi keluarga, lingkungan, dan alam\.\"/g, replace: '{t("mission_item_3", isEn)}'},
  {pattern: /\"Di Balik Rimba\"/g, replace: '{t("behind_rimba", isEn)}'},
  {pattern: /\"Tim Pengembang\"/g, replace: '{t("dev_team", isEn)}'},
  {pattern: /\"Rimba dibuat bersama untuk membantu anak-anak belajar, bermain, lalu ikut menjaga alam\.\"/g, replace: '{t("team_desc", isEn)}'},
];
map.forEach(entry => {
  content = content.replace(entry.pattern, entry.replace);
});
fs.writeFileSync(path, content, 'utf8');
console.log('About.tsx translation replacements applied');
