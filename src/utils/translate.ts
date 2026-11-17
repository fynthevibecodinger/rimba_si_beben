export const translations = {
  // Header badge
  "nature_and_eco_hub": { id: "Tempat Belajar tentang Alam", en: "Nature & Eco Learning Hub" },
  // Main tagline
  "empowering_tagline": {
    id: "Membangun Generasi Peduli Alam dan Tangguh Bencana",
    en: "Empowering Eco‑Conscious & Climate‑Resilient Generations",
  },
  // Header description
  "header_description": {
    id: "Media belajar di web yang membantu anak-anak menjaga alam, merawat lingkungan, dan kesiapan bencana untuk pelajar Indonesia.",
    en: "An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges.",
  },
  // Learning words
  "learn": { id: "Belajar", en: "Learn" },
  "explore": { id: "Bermain", en: "Explore" },
  "act": { id: "Beraksi", en: "Act" },
  // Mascot speech
  "mascot_speech": {
    id: "Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!",
    en: "Warm greetings! I'm Rimba, the hornbill guardian of the rainforest canopy!",
  },
  // Core values titles
  "core_value_resilient": { id: "Tangguh", en: "Resilient" },
  "core_value_resilient_text": { id: "Berani bersiap, sigap menghadapi risiko, dan mampu bangkit bersama.", en: "Boldly prepare, respond to risks, and rise together." },
  "core_value_care": { id: "Peduli Alam", en: "Care for Nature" },
  "core_value_care_text": { id: "Menjaga ekosistem sebagai bagian penting dari upaya mengurangi risiko bencana.", en: "Protect ecosystems as a key part of disaster risk reduction." },
  "core_value_science": { id: "Berbasis Sains", en: "Science‑Based" },
  "core_value_science_text": { id: "Mengutamakan informasi yang masuk akal, relevan, dan dapat dipertanggungjawabkan.", en: "Prioritise sensible, relevant, and accountable information." },
  "core_value_collaborative": { id: "Kolaboratif", en: "Collaborative" },
  "core_value_collaborative_text": { id: "Membangun kesiapan melalui kepedulian dan kerja sama lintas komunitas.", en: "Build readiness through caring and cross‑community collaboration." },
  // Learning pillars titles
  "learning_pillars": { id: "3 Pilar Pembelajaran Berkelanjutan", en: "3 Sustainable Learning Pillars" },
  "pillar_science": { id: "1. Sains & Sebab-Akibat", en: "1. Science & Cause‑Effect" },
  "pillar_science_desc": { id: "Meluruskan pemahaman yang keliru bahwa bencana alam semata-mata takdir tak terduga. Bencana adalah perpaduan ancaman alam dan kondisi yang membuat mudah terdampak aktivitas manusia.", en: "Correct misconceptions that natural disasters are purely fate. Disasters are a mix of natural hazards and vulnerable human conditions." },
  "pillar_simulation": { id: "2. Simulasi Interaktif", en: "2. Interactive Simulation" },
  "pillar_simulation_desc": { id: "Pelajar tidak hanya membaca teks hafalan, tetapi bereksperimen mengubah variabel iklim dan melihat respon kanvas ekologi secara visual.", en: "Students don’t just read text, they experiment with climate variables and see visual ecosystem responses." },
  "pillar_action": { id: "3. Aksi Nyata Pelajar", en: "3. Real Student Action" },
  "pillar_action_desc": { id: "Panduan praktis membuat lubang resapan, menyiapkan tas darurat 3 hari, dan menyelamatkan diri bersama keluarga.", en: "Practical guide for digging infiltration holes, preparing a 3‑day emergency kit, and protecting families." },
  // CTA banner
  "cta_ready": { id: "Siap Menjadi Pahlawan Kesiapsiagaan Bencana?", en: "Ready to Become a Disaster‑Preparedness Hero?" },
  "cta_start": { id: "Mulailah dengan memilih salah satu materi lingkungan atau mencoba permainan simulasi.", en: "Start by selecting an environmental topic or trying the simulation game." },
  "cta_explore_material": { id: "Jelajahi Materi", en: "Explore Materials" },
  "contact_title": { id: "Hubungi Rimba", en: "Contact Rimba" },
  "tag_student_friendly": { id: "Ramah pelajar", en: "Student Friendly" },
  "tag_open_ideas": { id: "Terbuka untuk ide", en: "Open for Ideas" },
  "tag_learn_together": { id: "Belajar bersama", en: "Learn Together" },
  // Vision & Mission
  "vision_mission": { id: "Visi &amp; Misi", en: "Vision & Mission" },
  "background_problem": { id: "Latar Belakang Masalah", en: "Problem Background" },
  "preparation_knowledge": { id: "Kesiapsiagaan dimulai dari pengetahuan", en: "Preparedness Starts with Knowledge" },
  "vision": { id: "Visi", en: "Vision" },
  "mission": { id: "Misi", en: "Mission" },
  "vision_text": { id: "Mewujudkan generasi Indonesia yang tangguh bencana, peduli lingkungan, dan mampu mengambil tindakan berbasis pengetahuan.", en: "Create an Indonesian generation resilient to disasters, caring for the environment, and capable of knowledge‑based action." },
  "mission_item_1": { id: "Menyajikan literasi bencana dan iklim yang mudah dipahami.", en: "Provide easy‑to‑understand disaster and climate literacy." },
  "mission_item_2": { id: "Menghadirkan simulasi untuk melatih nalar dan pengambilan keputusan.", en: "Offer simulations to train reasoning and decision‑making." },
  "mission_item_3": { id: "Mendorong aksi kecil yang berdampak bagi keluarga, lingkungan, dan alam.", en: "Encourage small actions that impact families, communities, and nature." },
  // Team section
  "behind_rimba": { id: "Di Balik Rimba", en: "Behind Rimba" },
  "dev_team": { id: "Tim Pengembang", en: "Development Team" },
  "team_desc": { id: "Rimba dibuat bersama untuk membantu anak-anak belajar, bermain, lalu ikut menjaga alam.", en: "Rimba is built together to help children learn, play, and protect nature." },
};

export const t = (key: keyof typeof translations, isEn: boolean) =>
  isEn ? translations[key].en : translations[key].id;
