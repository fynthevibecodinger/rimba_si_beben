export interface Experiment {
  title: string;
  tools: string[];
  steps: string[];
  observe: string; // apa yang diamati
  lesson: string; // kesimpulan
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}

export interface IssueExtra {
  analogy: string; // perumpamaan supaya mudah dibayangkan
  story: { title: string; text: string }; // cerita fiksi ilustrasi
  experiment: Experiment;
  glossary: GlossaryItem[];
  challenge7Days: string[]; // 7 misi, satu per hari
  askYourself: string[]; // pertanyaan diskusi
}

export const issuesExtra: Record<string, IssueExtra> = {
  banjir: {
    analogy:
      "Bayangkan hujan sebagai ember air dan tanah sebagai spons. Spons yang kering menyerap air. Kalau spons diganti lantai keramik, air tidak masuk dan mengalir ke mana saja, termasuk ke rumahmu.",
    story: {
      title: "Cerita Rani dan Selokan yang Penuh (fiksi ilustrasi)",
      text: "Rani melihat air hujan mengalir deras di depan sekolah. Selokannya penuh botol plastik dan daun. Air mencari jalan lain dan masuk ke halaman kelas. Besoknya, Rani mengajak teman-teman kerja bakti bersih selokan dan membuat lima lubang biopori di kebun sekolah. Saat hujan berikutnya, genangan di halaman jauh lebih cepat surut.",
    },
    experiment: {
      title: "Lomba Serap Air: Tanah vs Lantai",
      tools: ["3 wadah atau nampan miring", "Tanah dan rumput", "Tanah kosong", "Plastik atau keramik", "Gelas ukur", "Air 200 ml"],
      steps: [
        "Isi wadah 1 dengan tanah dan rumput, wadah 2 dengan tanah kosong, wadah 3 dengan plastik atau keramik.",
        "Miringkan semua wadah dengan sudut yang sama dan taruh gelas di ujung bawahnya.",
        "Tuang 200 ml air ke bagian atas tiap wadah dengan kecepatan sama.",
        "Ukur air yang tertampung di gelas masing-masing.",
      ],
      observe: "Wadah mana yang menghasilkan air larian paling banyak dan paling sedikit?",
      lesson: "Permukaan kedap seperti beton menghasilkan limpasan lebih banyak. Tanah dan tanaman menahan serta menyerap air.",
    },
    glossary: [
      { term: "Limpasan (run-off)", meaning: "Air hujan yang mengalir di permukaan karena tidak terserap tanah." },
      { term: "Infiltrasi", meaning: "Proses air meresap ke dalam tanah." },
      { term: "Biopori", meaning: "Lubang kecil di tanah untuk membantu air meresap dan tempat sampah organik jadi kompos." },
      { term: "Daerah aliran sungai (DAS)", meaning: "Wilayah dari hulu sampai hilir yang airnya mengalir ke satu sungai." },
      { term: "Kolam retensi", meaning: "Kolam penampung air sementara agar sungai tidak langsung meluap." },
    ],
    challenge7Days: [
      "Hari 1: Cek selokan di depan rumah. Ada sampah yang menyumbat?",
      "Hari 2: Pilah sampah plastik dan organik di rumah.",
      "Hari 3: Cari satu tempat di rumah atau sekolah yang cocok untuk biopori.",
      "Hari 4: Buat atau tanyakan cara membuat satu lubang biopori.",
      "Hari 5: Cari tahu titik kumpul dan jalur evakuasi terdekat.",
      "Hari 6: Siapkan tas siaga: senter, peluit, dokumen dalam plastik, obat pribadi.",
      "Hari 7: Ajak satu teman atau keluarga melakukan satu hal dari minggu ini.",
    ],
    askYourself: [
      "Di sekitar rumahku, bagian mana yang tertutup beton dan bisa diberi tanah terbuka?",
      "Kalau air masuk rumah malam ini, apa tiga hal pertama yang kulakukan?",
    ],
  },

  "tanah-longsor": {
    analogy:
      "Lereng itu seperti tumpukan pasir di pantai. Kalau dibiarkan kering dan dipegang akar, ia bertahan. Kalau basah kuyup dan tidak ada yang menahan, ia meluncur.",
    story: {
      title: "Cerita Dimas dan Retakan di Kebun (fiksi ilustrasi)",
      text: "Setelah hujan tiga hari, Dimas melihat retakan melengkung di tanah dekat kebun belakang rumah. Pohon pisang di dekatnya mulai miring. Ia tidak menunggu, langsung memberi tahu ketua RT. Warga memeriksa, menjauhi area itu, dan menanam vetiver di lereng. Retakan itu jadi tanda yang menyelamatkan banyak orang.",
    },
    experiment: {
      title: "Uji Lereng: Dengan Akar vs Tanpa Akar",
      tools: ["2 nampan atau kotak plastik", "Tanah dan pasir", "Rumput atau tanaman kecil berakar", "Botol semprot atau gelas air", "Ganjalan untuk memiringkan"],
      steps: [
        "Isi kedua nampan dengan campuran tanah dan pasir setebal sama.",
        "Tanam rumput berakar di salah satu nampan dan tunggu beberapa hari sampai akarnya menyatu.",
        "Miringkan kedua nampan dengan sudut sama.",
        "Siram keduanya dengan jumlah air dan kecepatan sama, lalu amati tanah yang bergeser.",
      ],
      observe: "Di nampan mana tanahnya lebih banyak ikut hanyut?",
      lesson: "Akar mengikat tanah. Lereng yang tidak punya vegetasi lebih mudah terkikis dan meluncur.",
    },
    glossary: [
      { term: "Bidang gelincir", meaning: "Lapisan di dalam tanah tempat massa tanah mulai meluncur." },
      { term: "Terasering", meaning: "Lereng yang dibuat bertingkat seperti tangga untuk memperlambat air dan tanah." },
      { term: "Drainase lereng", meaning: "Saluran yang mengalirkan air keluar dari lereng agar tanah tidak jenuh." },
      { term: "Jenuh air", meaning: "Kondisi tanah penuh air sehingga bobotnya naik dan ikatannya melemah." },
      { term: "Vetiver (akar wangi)", meaning: "Rumput berakar dalam yang sering ditanam untuk memperkuat lereng." },
    ],
    challenge7Days: [
      "Hari 1: Lihat lereng atau tebing di sekitarmu. Ada retakan atau pohon miring?",
      "Hari 2: Cari tahu apakah daerahmu termasuk rawan longsor.",
      "Hari 3: Pelajari tiga tanda longsor: retakan, pohon miring, suara gemuruh.",
      "Hari 4: Tanam satu bibit pohon atau rumput di tanah yang gundul.",
      "Hari 5: Bicarakan jalur evakuasi bersama keluarga.",
      "Hari 6: Latihan: lari ke samping, bukan ke bawah. Cek jalur yang aman.",
      "Hari 7: Bagikan satu tanda bahaya longsor ke temanmu.",
    ],
    askYourself: [
      "Di mana pohon berakar dalam bisa ditanam di sekitarku?",
      "Kenapa kita tidak boleh kembali mengambil barang saat tanda longsor muncul?",
    ],
  },

  kekeringan: {
    analogy:
      "Air tanah itu seperti tabungan. Hujan adalah uang masuk, dan sumur adalah uang keluar. Kalau terus dipakai tanpa diisi, tabungan menipis dan akhirnya habis.",
    story: {
      title: "Cerita Salsa dan Ember Cucian Beras (fiksi ilustrasi)",
      text: "Saat kemarau panjang, sumur di dekat rumah Salsa menyusut. Ibunya mulai menampung air cucian beras untuk menyiram tanaman, dan Salsa menutup keran setiap kali menyikat gigi. Mereka juga menutup tanah di kebun dengan daun kering. Dua minggu kemudian, tanaman mereka tetap segar sementara kebun tetangga mulai layu.",
    },
    experiment: {
      title: "Uji Mulsa: Tanah Ditutup vs Terbuka",
      tools: ["2 pot atau gelas plastik", "Tanah", "Daun kering atau jerami", "Air", "Tempat yang terkena matahari"],
      steps: [
        "Isi kedua pot dengan tanah dan siram dengan jumlah air sama.",
        "Tutup permukaan satu pot dengan daun kering setebal 2-3 cm. Biarkan yang lain terbuka.",
        "Taruh keduanya di tempat yang sama selama 3 hari.",
        "Setiap hari, sentuh tanah dan bandingkan kelembapannya.",
      ],
      observe: "Pot mana yang tanahnya lebih lama lembap?",
      lesson: "Mulsa mengurangi penguapan, sehingga tanah menyimpan air lebih lama.",
    },
    glossary: [
      { term: "Kekeringan meteorologis", meaning: "Kekeringan karena hujan jauh di bawah normal." },
      { term: "Kekeringan hidrologis", meaning: "Kekeringan karena sungai, danau, dan air tanah menyusut." },
      { term: "El Niño", meaning: "Fenomena iklim yang bisa membuat musim kemarau di Indonesia lebih kering." },
      { term: "Mulsa", meaning: "Penutup permukaan tanah, misalnya daun kering, untuk menahan penguapan." },
      { term: "Irigasi tetes", meaning: "Cara menyiram dengan menetes langsung ke akar agar hemat air." },
    ],
    challenge7Days: [
      "Hari 1: Catat berapa kali kamu menyalakan keran hari ini.",
      "Hari 2: Tutup keran saat menyikat gigi dan menyabuni tangan.",
      "Hari 3: Tampung air bilasan yang aman untuk menyiram tanaman.",
      "Hari 4: Cek kebocoran keran atau pipa di rumah.",
      "Hari 5: Tutup tanah pot atau kebun dengan daun kering.",
      "Hari 6: Pastikan penampung air tertutup rapat.",
      "Hari 7: Bandingkan pemakaian airmu dengan hari pertama.",
    ],
    askYourself: [
      "Kalau air di rumahku hanya setengah dari biasanya, apa yang harus kudahulukan?",
      "Di mana saja air terbuang percuma di sekolahku?",
    ],
  },

  "kebakaran-hutan": {
    analogy:
      "Gambut itu seperti kasur tebal yang terbuat dari sisa tumbuhan. Kalau basah, ia sulit terbakar. Kalau kering, bara kecil bisa menjalar diam-diam di dalamnya.",
    story: {
      title: "Cerita Bayu dan Langit yang Kelabu (fiksi ilustrasi)",
      text: "Saat kemarau, langit di kota Bayu berubah keruh dan matanya perih. Sekolah meliburkan kegiatan di luar kelas. Bayu belajar bahwa asap berasal dari lahan yang kering dan terbakar jauh dari rumahnya. Ia mulai memakai masker N95, menutup celah jendela, dan mengajak teman-temannya berhenti membakar sampah daun di halaman.",
    },
    experiment: {
      title: "Simulasi Sekat Kanal (Tanpa Api)",
      tools: ["Wadah plastik", "Spons atau tanah", "Air", "Paku atau pensil untuk melubangi sisi wadah", "Plester atau lilin mainan"],
      steps: [
        "Buat satu lubang kecil di sisi bawah wadah sebagai 'kanal'.",
        "Isi wadah dengan spons atau tanah dan tuang air sampai basah.",
        "Biarkan lubang terbuka, lalu amati seberapa cepat air keluar dan tanah mengering.",
        "Ulangi, tetapi sumbat lubang dengan plester atau lilin mainan sebagai 'sekat kanal'.",
      ],
      observe: "Mana yang lebih lama tetap basah, dengan kanal terbuka atau tersekat?",
      lesson: "Sekat kanal menahan air di dalam gambut agar tetap basah, sehingga lebih sulit terbakar.",
    },
    glossary: [
      { term: "Gambut", meaning: "Tanah dari sisa tumbuhan yang menumpuk lama dalam kondisi terendam air." },
      { term: "Hotspot", meaning: "Titik panas yang terdeteksi satelit dan bisa menjadi tanda kebakaran." },
      { term: "PM2.5", meaning: "Partikel halus di udara yang bisa masuk jauh ke paru-paru." },
      { term: "Sekat kanal", meaning: "Bendungan kecil di kanal untuk menahan air di lahan gambut." },
      { term: "ISPU", meaning: "Indeks Standar Pencemar Udara untuk menilai kualitas udara." },
    ],
    challenge7Days: [
      "Hari 1: Cek kualitas udara di aplikasi atau situs resmi.",
      "Hari 2: Pelajari perbedaan masker kain dan masker N95 atau KF94.",
      "Hari 3: Berhenti membakar sampah. Cari cara memilah dan mengelolanya.",
      "Hari 4: Cari tahu lokasi gambut atau hutan terdekat dari tempat tinggalmu.",
      "Hari 5: Pelajari cara melapor titik api ke pihak berwenang.",
      "Hari 6: Buat 'ruang aman' di rumah: tutup celah jendela dan siapkan masker.",
      "Hari 7: Ceritakan satu hal yang kamu pelajari tentang gambut ke temanmu.",
    ],
    askYourself: [
      "Kenapa api yang tidak terlihat justru bisa lebih berbahaya?",
      "Siapa saja yang paling terdampak kabut asap di sekitarku?",
    ],
  },
};

export const getExtra = (slug: string): IssueExtra | undefined => issuesExtra[slug];