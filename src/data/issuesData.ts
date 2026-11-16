export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudentActionItem {
  type: "pencegahan" | "penyelamatan";
  title: string;
  description: string;
  iconName: string;
}

// ===== BARU =====
export interface QuickFact {
  value: string; 
  label: string; 
}

export interface MythFact {
  myth: string;
  fact: string;
}

export interface ReadinessPlan {
  before: string[]; // sebelum bencana
  during: string[]; // saat bencana
  after: string[]; // sesudah bencana
}
// =================

export interface IssueSections {
  causeAndEffect: {
    title: string;
    description: string;
    humanActivities: string[];
    ecologicalProcess: string;
  };
  impact: {
    environmental: string[];
    socialEconomic: string[];
    vulnerabilityNote: string;
  };
  studentActions: StudentActionItem[];
  greenTechTrivia: {
    techName: string;
    category: "IoT Sensor" | "Satelit & Penginderaan Jauh" | "Nature-based Solutions" | "AI & Early Warning";
    description: string;
    factHighlight: string;
  };
  quickFacts: QuickFact[]; 
  mythsAndFacts: MythFact[]; 
  readiness: ReadinessPlan; 
}

export interface RealDisasterPhoto {
  src: string; 
  fallbackSrc: string; 
  alt: string;
  caption: string;
}

export interface IssueContent {
  slug: "banjir" | "tanah-longsor" | "kekeringan" | "kebakaran-hutan";
  title: string;
  subtitle: string;
  tagline: string;
  themeColor: string;
  accentBg: string;
  threatLevel: "Tinggi" | "Kritis" | "Sedang" | "Sangat Tinggi";
  heroBadge: string;
  icon: string;
  realPhoto: RealDisasterPhoto;
  sections: IssueSections;
  quiz: QuizQuestion[];
}

export const issuesData: Record<string, IssueContent> = {
  // ======================================================== BANJIR
  banjir: {
    slug: "banjir",
    title: "Banjir & Genangan Ekstrem",
    subtitle: "Dari hulu ke hilir: sungai, drainase kota, dan solusi berbasis alam",
    tagline: "Air selalu mencari jalan. Saat tanah tertutup beton dan sungai tersumbat, jalannya adalah rumah kita.",
    themeColor: "#0284c7",
    accentBg: "from-sky-500/20 to-blue-600/10",
    threatLevel: "Sangat Tinggi",
    heroBadge: "Hidrometeorologi Basah",
    icon: "CloudRainWind",
    realPhoto: {
      src: "/images/disasters/banjir.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata banjir merendam permukiman warga",
      caption: "Dokumentasi Riil Banjir",
    },
    sections: {
      causeAndEffect: {
        title: "Kenapa Air Meluap dan Menggenang?",
        description:
          "Hujan deras hanyalah pemicu. Penyebab sebenarnya ada di darat: permukaan yang tertutup aspal dan beton membuat air tidak bisa meresap, sehingga hampir semuanya menjadi limpasan (run-off). Air itu langsung mengalir ke selokan dan sungai yang sudah dangkal karena sedimen dan sampah, lalu meluap dalam hitungan jam.",
        humanActivities: [
          "Mengubah sempadan sungai dan rawa penampung air menjadi permukiman padat.",
          "Membuang sampah rumah tangga ke selokan dan sungai.",
          "Menyemen seluruh halaman tanpa menyisakan tanah terbuka atau lubang resapan.",
          "Membuka hutan di wilayah hulu sehingga tidak ada lagi akar yang menahan dan menyimpan air.",
        ],
        ecologicalProcess:
           "Air hujan tidak lagi masuk ke tanah. Air pun menumpuk di permukaan dan membuat sungai cepat penuh.",
      },
      impact: {
        environmental: [
          "Air bersih tercemar lumpur, limbah, dan bakteri sehingga sumber air minum tidak layak pakai.",
          "Vegetasi di tepi sungai rusak dan tebing mudah terkikis.",
          "Meningkatnya risiko leptospirosis, diare, dan penyakit kulit setelah banjir surut.",
        ],
        socialEconomic: [
          "Sekolah libur, jalan terputus, dan distribusi barang terhambat.",
          "Perabot, dokumen penting, dan perangkat elektronik rusak dan butuh biaya besar untuk diganti.",
        ],
        vulnerabilityNote:
          "Anak-anak, lansia, dan penyandang disabilitas di dataran rendah paling rentan, terutama saat air naik cepat di malam hari.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Buat Lubang Biopori di Rumah atau Sekolah",
          description:
            "Lubang silindris berdiameter sekitar 10 cm dan sedalam sekitar 100 cm, diisi sampah organik, membantu air hujan meresap dan menghasilkan kompos.",
          iconName: "Drill",
        },
        {
          type: "pencegahan",
          title: "Kerja Bakti Bersih Selokan",
          description:
            "Pastikan saluran air di sekitar kelas dan rumah bebas dari plastik kemasan dan botol yang sering menyumbat gorong-gorong.",
          iconName: "Trash2",
        },
        {
          type: "penyelamatan",
          title: "Siapkan Tas Siaga Bencana",
          description:
            "Isi dengan dokumen penting dalam plastik kedap air, senter, peluit, obat pribadi, power bank, dan makanan tahan lama.",
          iconName: "ShieldAlert",
        },
        {
          type: "penyelamatan",
          title: "Matikan Listrik Sebelum Air Masuk",
          description:
            "Bila air mulai masuk rumah, matikan MCB utama dan jauhi tiang listrik atau kabel putus. Air dan listrik adalah kombinasi yang mematikan.",
          iconName: "ZapOff",
        },
      ],
      greenTechTrivia: {
         techName: "Alat Pengukur Tinggi Air",
        category: "IoT Sensor",
        description:
          "Sensor bertenaga surya di jembatan atau pintu air mengukur tinggi muka air dan mengirim datanya secara nirkabel ke pusat pemantauan secara berkala.",
        factHighlight:
          "Kenaikan air di hulu terbaca lebih cepat, sehingga warga hilir punya waktu tambahan untuk mengungsi.",
      },
      quickFacts: [
        { value: "10 × 100 cm", label: "Ukuran umum lubang biopori (diameter × kedalaman)" },
        { value: "MCB", label: "Hal pertama yang dimatikan saat air masuk rumah" },
        { value: "Hulu–hilir", label: "Banjir kota sering berawal dari kerusakan di hulu" },
      ],
      mythsAndFacts: [
        {
          myth: "Banjir terjadi hanya karena hujan terlalu deras.",
          fact: "Hujan deras hanya pemicu. Hilangnya daerah resapan, sungai dangkal, dan drainase tersumbat membuat air tidak punya tempat pergi.",
        },
        {
          myth: "Banjir setinggi mata kaki masih aman diterobos.",
          fact: "Arus deras setinggi betis pun bisa menjatuhkan orang dewasa, dan air banjir bisa membawa kotoran serta aliran listrik.",
        },
      ],
      readiness: {
        before: [
          "Kenali jalur dan titik kumpul evakuasi terdekat.",
          "Simpan nomor darurat dan pantau informasi cuaca resmi.",
        ],
        during: [
          "Matikan listrik, naik ke tempat lebih tinggi, dan ikuti arahan petugas.",
          "Jangan berjalan atau berkendara menembus arus air.",
        ],
        after: [
          "Cuci tangan dengan sabun dan jangan minum air yang belum dimasak.",
          "Bersihkan rumah memakai sepatu bot dan sarung tangan, lalu laporkan kerusakan ke RT atau desa.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Mengapa halaman rumah yang seluruhnya disemen memperparah risiko banjir?",
        options: [
          "Air hujan menguap lebih cepat ke awan",
          "Tanah tidak bisa menyerap air sehingga air langsung menjadi limpasan ke selokan dan sungai",
          "Beton menarik air lebih kuat",
          "Selokan menjadi lebih bersih tanpa tanah",
        ],
        correctIndex: 1,
        explanation:
          "Beton kedap air. Tanpa tanah terbuka atau biopori, sebagian besar air hujan menjadi limpasan yang membebani drainase.",
      },
      {
        id: 2,
        question: "Apa tindakan paling penting saat air mulai masuk ke dalam rumah?",
        options: [
          "Mencari mainan yang hanyut",
          "Mematikan listrik utama (MCB) dan mencabut steker",
          "Menunggu air setinggi pinggang baru mengungsi",
          "Membuka semua keran agar pipa tidak pecah",
        ],
        correctIndex: 1,
        explanation:
          "Air menghantarkan listrik. Mematikan MCB mencegah sengatan listrik di dalam air.",
      },
      {
        id: 3,
        question: "Teknologi sederhana apa yang menangkap air hujan di tingkat rumah tangga sebelum meluap ke jalan?",
        options: [
          "Pemanenan air hujan dan sumur resapan",
          "AC berkapasitas besar",
          "Aspal sintetis",
          "Pagar seng bertingkat",
        ],
        correctIndex: 0,
        explanation:
          "Air dari talang ditampung untuk dipakai kembali, sedangkan kelebihannya dialirkan ke sumur resapan.",
      },
      {
        id: 4,
        question: "Mengapa kerusakan hutan di hulu bisa menyebabkan banjir di kota hilir?",
        options: [
          "Karena hutan menghasilkan lebih banyak hujan di kota",
          "Karena tanpa akar dan tanah yang menyerap air, aliran ke sungai menjadi lebih cepat dan besar",
          "Karena sungai menjadi lebih dalam",
          "Karena air laut naik ke hulu",
        ],
        correctIndex: 1,
        explanation:
          "Hutan hulu menahan dan menyimpan air. Bila rusak, air mengalir cepat ke hilir dan membawa sedimen yang mendangkalkan sungai.",
      },
      {
        id: 5,
        question: "Apa fungsi sensor tinggi muka air bertenaga surya di sungai?",
        options: [
          "Menghentikan hujan",
          "Memberi data dan peringatan dini agar warga hilir punya waktu bersiap",
          "Membersihkan sampah otomatis",
          "Menurunkan permukaan sungai",
        ],
        correctIndex: 1,
        explanation:
          "Sensor mengirim data kenaikan air secara berkala sehingga peringatan bisa diberikan sebelum air tiba di permukiman.",
      },
    ],
  },

  // ======================================================== TANAH LONGSOR
  "tanah-longsor": {
    slug: "tanah-longsor",
    title: "Tanah Longsor & Pergerakan Lereng",
    subtitle: "Akar, kemiringan, dan air: tiga penentu kestabilan lereng",
    tagline: "Akar pohon adalah paku bumi alami. Saat lereng gundul, gravitasi yang berkuasa.",
    themeColor: "#8d5b4c",
    accentBg: "from-amber-700/20 to-stone-800/10",
    threatLevel: "Tinggi",
    heroBadge: "Geohidrologi Lereng",
    icon: "Landslide",
    realPhoto: {
      src: "/images/disasters/tanah-longsor.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1618588507085-c79565432917?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata longsor pada tebing lereng curam",
      caption: "Dokumentasi Riil Tanah Longsor",
    },
    sections: {
      causeAndEffect: {
        title: "Bagaimana Tanah Bisa Tiba-Tiba Meluncur?",
        description:
          "Longsor terjadi ketika gaya pendorong (berat tanah jenuh air dan gravitasi) lebih besar daripada gaya penahan (kohesi tanah dan ikatan akar). Hujan yang lama meresap dan tertahan di atas lapisan kedap air, melumasi bidang gelincir hingga massa tanah di atasnya meluncur ke bawah.",
        humanActivities: [
          "Memotong tebing secara tegak tanpa terasering atau dinding penahan.",
          "Menebang pohon berakar dalam di lereng terjal.",
          "Membuat kolam atau sawah basah di puncak lereng sehingga beban air bertambah.",
          "Tidak membuat drainase lereng, sehingga air rembesan menumpuk dan membuka retakan.",
        ],
        ecologicalProcess:
          "Tanpa jaring akar, tanah kehilangan ikatan mekanis. Tanah lempung yang jenuh air berubah menjadi lumpur yang mudah mengalir.",
      },
      impact: {
        environmental: [
          "Material longsor menimbun tanah subur dan merusak lahan di dasar lembah.",
          "Longsoran bisa membendung sungai dan berisiko memicu banjir bandang saat bendungan alami jebol.",
          "Habitat satwa di lereng dan tepi hutan hilang.",
        ],
        socialEconomic: [
          "Rumah dan lahan tertimbun dalam waktu singkat, sehingga waktu evakuasi sangat pendek.",
          "Jalan penghubung antardesa terputus dan bantuan sulit masuk.",
        ],
        vulnerabilityNote:
          "Permukiman di lereng curam (di atas sekitar 20°) sangat berisiko ketika hujan berhari-hari membuat tanah jenuh air.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Tanam Vetiver dan Pohon Berakar Dalam",
          description:
            "Akar wangi (vetiver) bisa menembus tanah hingga beberapa meter dan mengikat tanah seperti jangkar hidup. Pilih jenis lokal yang sesuai lereng.",
          iconName: "Sprout",
        },
        {
          type: "pencegahan",
          title: "Laporkan Retakan atau Pohon Miring",
          description:
            "Retakan melengkung di tanah, pohon atau tiang yang mulai miring, dan air keruh yang muncul tiba-tiba perlu dilaporkan ke RT, guru, atau BPBD.",
          iconName: "AlertTriangle",
        },
        {
          type: "penyelamatan",
          title: "Kenali Suara Gemuruh dari Atas Bukit",
          description:
            "Gemuruh atau suara ranting patah beruntun bisa jadi tanda lereng mulai bergerak. Segera menjauh dan jangan kembali mengambil barang.",
          iconName: "Volume2",
        },
        {
          type: "penyelamatan",
          title: "Lari ke Samping, Bukan ke Bawah",
          description:
            "Hindari jalur luncuran. Bergeraklah tegak lurus ke samping menuju tanah yang stabil, bukan searah lumpur menuruni lembah.",
          iconName: "CornerUpRight",
        },
      ],
      greenTechTrivia: {
        techName: "Extensometer dan Tiltmeter Nirkabel",
        category: "IoT Sensor",
        description:
          "Alat ini mengukur pergeseran dan kemiringan tanah hingga skala milimeter. Jika retakan melebar melewati batas aman, sirine desa otomatis berbunyi.",
        factHighlight:
          "Sistem peringatan dini longsor berbasis sensor telah diuji dan dipasang di sejumlah daerah rawan di Indonesia.",
      },
      quickFacts: [
        { value: "> 20°", label: "Kemiringan lereng yang mulai dianggap rawan" },
        { value: "3–4 m", label: "Kedalaman akar vetiver yang bisa menembus tanah" },
        { value: "Samping", label: "Arah lari yang benar saat longsor, bukan ke bawah" },
      ],
      mythsAndFacts: [
        {
          myth: "Longsor hanya terjadi di gunung yang tinggi.",
          fact: "Longsor bisa terjadi di tebing galian jalan, tanggul, dan lereng di sekitar permukiman, termasuk di perbukitan rendah.",
        },
        {
          myth: "Pohon apa pun pasti memperkuat lereng.",
          fact: "Jenis pohon harus sesuai. Akar dalam dan tajuk ringan membantu, sedangkan pohon yang terlalu berat atau berakar dangkal di lereng curam bisa menambah risiko.",
        },
      ],
      readiness: {
        before: [
          "Cari tahu apakah rumah atau sekolahmu berada di zona rawan longsor.",
          "Siapkan jalur dan titik kumpul evakuasi yang tidak melewati kaki lereng.",
        ],
        during: [
          "Jauhi lereng dan alur sungai kecil di bawahnya, lalu lari ke samping jalur luncuran.",
          "Lindungi kepala dan jangan kembali ke zona longsor.",
        ],
        after: [
          "Waspadai longsor susulan, terutama bila hujan berlanjut.",
          "Jangan mendekati area longsoran sebelum dinyatakan aman oleh petugas.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Mengapa rumput vetiver (akar wangi) direkomendasikan di lereng rawan longsor?",
        options: [
          "Aromanya mengusir serangga",
          "Akarnya menembus dalam dan mengunci struktur tanah",
          "Tidak butuh air sama sekali",
          "Terlihat indah dari satelit",
        ],
        correctIndex: 1,
        explanation:
          "Akar vetiver panjang, rapat, dan kuat sehingga berfungsi sebagai paku bumi biologis.",
      },
      {
        id: 2,
        question: "Kamu di lereng dan mendengar gemuruh sementara pohon mulai miring. Ke mana sebaiknya bergerak?",
        options: [
          "Lari searah ke dasar lembah",
          "Bersembunyi di balik pohon besar",
          "Lari ke samping, tegak lurus jalur luncuran, menuju tanah stabil",
          "Merekam video di tepi tebing",
        ],
        correctIndex: 2,
        explanation:
          "Longsoran bergerak cepat menuruni lereng. Bergerak ke samping adalah cara paling masuk akal untuk keluar dari jalurnya.",
      },
      {
        id: 3,
        question: "Aktivitas manusia apa yang paling sering mengganggu kestabilan lereng?",
        options: [
          "Membuat terasering",
          "Memotong tebing tegak untuk bangunan tanpa dinding penahan",
          "Menanam pohon buah di lahan datar",
          "Membuat jalur pendakian berkelok",
        ],
        correctIndex: 1,
        explanation:
          "Pemotongan tegak menghilangkan penopang kaki lereng sehingga massa tanah di atasnya mudah runtuh.",
      },
      {
        id: 4,
        question: "Mengapa hujan berhari-hari lebih berbahaya bagi lereng daripada hujan singkat yang deras?",
        options: [
          "Air hujan lama lebih asam",
          "Tanah menjadi jenuh air sehingga bobotnya naik dan ikatannya melemah",
          "Hujan lama membuat pohon tumbuh cepat",
          "Hujan lama menaikkan suhu tanah",
        ],
        correctIndex: 1,
        explanation:
          "Air yang terus meresap menambah berat tanah dan melumasi bidang gelincir, sehingga gaya penahan menurun.",
      },
      {
        id: 5,
        question: "Tanda alam mana yang perlu segera dilaporkan di sekitar lereng?",
        options: [
          "Burung berkicau di pagi hari",
          "Retakan tanah melengkung dan tiang atau pohon yang mulai miring",
          "Rumput tumbuh subur",
          "Embun di pagi hari",
        ],
        correctIndex: 1,
        explanation:
          "Retakan melengkung dan kemiringan benda adalah tanda awal pergerakan tanah yang perlu ditindaklanjuti.",
      },
    ],
  },

  // ======================================================== KEKERINGAN
  kekeringan: {
    slug: "kekeringan",
    title: "Kekeringan & Krisis Air Bersih",
    subtitle: "El Niño, cadangan air tanah, dan kebiasaan hemat air",
    tagline: "Air bukan hanya soal hujan. Menjaga mata air hari ini berarti menjaga hidup kita esok hari.",
    themeColor: "#d97706",
    accentBg: "from-amber-500/20 to-yellow-600/10",
    threatLevel: "Sedang",
    heroBadge: "Hidrometeorologi Kering",
    icon: "DropletOff",
    realPhoto: {
      src: "/images/disasters/kekeringan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata tanah sawah retak akibat kemarau panjang",
      caption: "Dokumentasi Riil Kekeringan",
    },
    sections: {
      causeAndEffect: {
        title: "Kenapa Sumur Kering dan Sawah Retak?",
        description:
          "Kekeringan meteorologis muncul saat hujan jauh di bawah normal, misalnya akibat El Niño. Namun dampaknya diperparah oleh kerusakan daerah tangkapan air, pengambilan air tanah yang melebihi pengisian ulang, dan tanah yang miskin humus sehingga tidak mampu menyimpan air.",
        humanActivities: [
          "Mengambil air tanah dalam secara besar-besaran tanpa upaya konservasi.",
          "Menguruk rawa dan danau yang berfungsi sebagai tandon air alami.",
          "Bertani tanpa mulsa atau penutup tanah sehingga air cepat menguap.",
          "Boros air dan membiarkan pipa bocor dalam jangka lama.",
        ],
        ecologicalProcess:
          "Muka air tanah turun, tanaman layu, mikroorganisme tanah berkurang, dan di wilayah pesisir air asin bisa merembes ke sumur.",
      },
      impact: {
        environmental: [
          "Gagal panen padi, jagung, dan tanaman pangan lainnya.",
          "Satwa liar kesulitan mendapat air karena kubangan dan mata air mengering.",
          "Tanah yang kehilangan struktur mudah menjadi debu dan terbawa angin.",
        ],
        socialEconomic: [
          "Harga pangan naik dan keluarga prasejahtera paling sulit mengakses air bersih.",
          "Sanitasi memburuk sehingga penyakit kulit dan gangguan pencernaan meningkat.",
        ],
        vulnerabilityNote:
          "Nusa Tenggara dan sebagian wilayah selatan Jawa termasuk kawasan yang rentan terhadap kemarau panjang.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Tutup Keran Saat Menyikat Gigi",
          description:
            "Keran yang dibiarkan mengalir bisa membuang beberapa liter air dalam hitungan menit. Pakai gayung atau gelas, lalu tutup keran saat tidak dipakai.",
          iconName: "Droplet",
        },
        {
          type: "pencegahan",
          title: "Pakai Ulang Air Bilasan",
          description:
            "Air bekas cucian beras atau bilasan sayur bisa menyiram tanaman di taman sekolah, selama tidak mengandung sabun atau deterjen.",
          iconName: "RotateCcw",
        },
        {
          type: "penyelamatan",
          title: "Jaga Kebersihan Air Minum dan Penampungan",
          description:
            "Masak air minum sampai mendidih dan tutup rapat ember penampung agar tidak menjadi sarang jentik nyamuk.",
          iconName: "CheckCircle",
        },
        {
          type: "penyelamatan",
          title: "Laporkan Krisis Air ke RT atau Desa",
          description:
            "Bila sumur warga mulai kering, koordinasikan dengan guru atau ketua RT untuk mengajukan bantuan air bersih lewat BPBD atau PDAM.",
          iconName: "Truck",
        },
      ],
      greenTechTrivia: {
        techName: "Irigasi Tetes Tenaga Surya dan Data Kelembapan Tanah Satelit",
        category: "Nature-based Solutions",
        description:
          "Pipa mikro meneteskan air langsung ke akar tanaman, sehingga jauh lebih hemat dibanding menggenangi lahan. Data kelembapan tanah dari satelit membantu menentukan kapan penyiraman benar-benar dibutuhkan.",
        factHighlight:
          "Irigasi tetes bisa menghemat air pertanian dalam jumlah besar di lahan kering dibanding irigasi genangan.",
      },
      quickFacts: [
        { value: "≤ 12 L", label: "Air terbuang per menit bila keran dibiarkan mengalir" },
        { value: "El Niño", label: "Fenomena yang bisa memperpanjang musim kemarau" },
        { value: "Mulsa", label: "Penutup tanah yang menahan penguapan air" },
      ],
      mythsAndFacts: [
        {
          myth: "Kekeringan hanya karena tidak ada hujan.",
          fact: "Hujan yang kurang adalah pemicu, tetapi kerusakan tangkapan air dan pemakaian air yang boros membuat dampaknya jauh lebih berat.",
        },
        {
          myth: "Sumur yang dalam pasti aman dari kekeringan.",
          fact: "Jika air diambil lebih cepat daripada pengisian ulangnya, muka air tanah tetap turun walau sumurnya dalam.",
        },
      ],
      readiness: {
        before: [
          "Siapkan wadah penampung air tertutup dan atur pemakaian air keluarga.",
          "Pasang penampung air hujan dan tanam penutup tanah di kebun.",
        ],
        during: [
          "Prioritaskan air untuk minum, memasak, dan kebersihan dasar.",
          "Siram tanaman pagi atau sore dan gunakan air bekas yang aman.",
        ],
        after: [
          "Perbaiki pipa bocor dan bersihkan tandon sebelum hujan datang.",
          "Lanjutkan kebiasaan hemat air walau musim hujan sudah tiba.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Kebiasaan pelajar mana yang paling menghemat air bersih?",
        options: [
          "Membiarkan keran mengalir saat menyabuni piring",
          "Menutup keran saat tidak dipakai dan memakai gayung",
          "Mencuci motor dengan selang setiap hari",
          "Membuang sisa air minum ke selokan",
        ],
        correctIndex: 1,
        explanation:
          "Keran yang dibiarkan mengalir membuang banyak air. Memakai gayung dan menutup keran menghemat ribuan liter per bulan.",
      },
      {
        id: 2,
        question: "Mengapa air bekas cucian beras baik untuk menyiram tanaman?",
        options: [
          "Mengandung pestisida",
          "Mengandung sedikit nutrisi dan pati yang dapat membantu mikroba tanah, serta mengurangi pemakaian air bersih baru",
          "Membuat tanaman berbuah beras",
          "Tanaman tidak suka air hujan",
        ],
        correctIndex: 1,
        explanation:
          "Pemakaian ulang air bilasan menerapkan prinsip reuse. Hindari air bercampur sabun atau deterjen.",
      },
      {
        id: 3,
        question: "Fenomena iklim yang sering membuat kemarau di Indonesia lebih kering dan panjang adalah...",
        options: ["La Niña", "El Niño", "Angin Monsun Barat", "Efek Coriolis"],
        correctIndex: 1,
        explanation:
          "El Niño menggeser pembentukan awan hujan menjauhi wilayah Indonesia sehingga curah hujan berkurang.",
      },
      {
        id: 4,
        question: "Apa fungsi mulsa pada kebun atau lahan pertanian?",
        options: [
          "Membuat tanaman cepat berbunga",
          "Menutup permukaan tanah agar air tidak cepat menguap",
          "Mengusir hujan",
          "Menambah panas tanah",
        ],
        correctIndex: 1,
        explanation:
          "Mulsa menurunkan penguapan, menjaga kelembapan, dan melindungi tanah dari terik matahari.",
      },
      {
        id: 5,
        question: "Mengapa air tampungan perlu ditutup rapat?",
        options: [
          "Agar air tidak terasa dingin",
          "Agar tidak menjadi sarang jentik nyamuk dan tidak tercemar",
          "Agar air cepat menguap",
          "Agar ember tidak berkarat",
        ],
        correctIndex: 1,
        explanation:
          "Air tergenang yang terbuka mudah menjadi tempat berkembang biak nyamuk dan rawan tercemar kotoran.",
      },
    ],
  },

  // ======================================================== KARHUTLA
  "kebakaran-hutan": {
    slug: "kebakaran-hutan",
    title: "Kebakaran Hutan & Lahan (Karhutla)",
    subtitle: "Gambut, titik panas, dan udara bersih yang kita butuhkan",
    tagline: "Gambut yang terbakar melepas karbon yang tersimpan ribuan tahun. Sekali menyala, sangat sulit dipadamkan.",
    themeColor: "#dc2626",
    accentBg: "from-red-600/20 to-orange-700/10",
    threatLevel: "Kritis",
    heroBadge: "Emisi & Karhutla",
    icon: "FlameKindling",
    realPhoto: {
      src: "/images/disasters/kebakaran-hutan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1602980085566-6c459f23fa46?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata kebakaran hutan dan lahan gambut dengan kabut asap tebal",
      caption: "Dokumentasi Riil Karhutla",
    },
    sections: {
      causeAndEffect: {
        title: "Kenapa Lahan Gambut Mudah Terbakar?",
        description:
          "Gambut adalah tumpukan sisa tumbuhan yang selama ribuan tahun terendam air. Saat dikeringkan lewat kanal untuk perkebunan, gambut menjadi kering dan mudah terbakar. Percikan kecil dari puntung rokok atau pembukaan lahan dengan membakar bisa memicu api yang menjalar di bawah tanah tanpa terlihat dari permukaan.",
        humanActivities: [
          "Membuka lahan dengan cara membakar karena dianggap murah.",
          "Membuat parit atau kanal yang mengeringkan kubah gambut.",
          "Membuang puntung rokok atau meninggalkan api unggun yang belum padam total.",
          "Merambah kawasan hutan lindung dan konservasi.",
        ],
        ecologicalProcess:
          "Api gambut bisa menyala diam-diam di bawah tanah dan menghasilkan asap tebal yang berbahaya.",
      },
      impact: {
        environmental: [
          "Pelepasan karbon dalam jumlah besar yang mempercepat pemanasan global.",
          "Hilangnya habitat satwa seperti orangutan, harimau Sumatra, dan burung rangkong.",
          "Lapisan gambut rusak dan butuh waktu sangat lama untuk pulih.",
        ],
        socialEconomic: [
          "Kasus ISPA meningkat, termasuk pada anak sekolah.",
          "Sekolah diliburkan dan penerbangan terganggu akibat kabut asap.",
        ],
        vulnerabilityNote:
          "Riau, Jambi, Sumatra Selatan, serta Kalimantan Tengah dan Barat sering terdampak karhutla pada puncak kemarau.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Jangan Bakar Sampah di Tempat Terbuka",
          description:
            "Membakar daun kering atau plastik mencemari udara dan percikan apinya bisa tertiup angin lalu memicu kebakaran lahan.",
          iconName: "ShieldX",
        },
        {
          type: "pencegahan",
          title: "Dukung Pembasahan Kembali Gambut",
          description:
            "Pelajari dan dukung cara menjaga lahan gambut tetap basah agar tidak mudah terbakar.",
          iconName: "Layers",
        },
        {
          type: "penyelamatan",
          title: "Pakai Masker N95 atau KF94 Saat Udara Buruk",
          description:
            "Debu asap sangat kecil. Masker N95 atau KF94 lebih baik untuk melindungi napas jika kabut asap tebal.",
          iconName: "HeartPulse",
        },
        {
          type: "penyelamatan",
          title: "Buat Ruang Aman di Rumah",
          description:
            "Tutup celah jendela dan ventilasi, kurangi aktivitas luar ruangan, dan gunakan penjernih udara bila tersedia.",
          iconName: "Home",
        },
      ],
      greenTechTrivia: {
        techName: "Satelit Hotspot VIIRS dan Patroli Drone",
        category: "Satelit & Penginderaan Jauh",
        description:
          "Sensor termal satelit mendeteksi anomali panas di permukaan tanah sehingga titik api bisa dipetakan dan tim darat dapat dikirim lebih cepat.",
        factHighlight:
          "Data titik panas dapat dilihat publik lewat sumber resmi seperti SiPongi KLHK dan platform pemetaan bencana.",
      },
      quickFacts: [
        { value: "PM2.5", label: "Partikel asap halus, sekitar 30 kali lebih kecil dari lebar rambut" },
        { value: "N95 / KF94", label: "Jenis masker yang disarankan saat kabut asap" },
        { value: "Di bawah tanah", label: "Api gambut bisa membara tanpa terlihat di permukaan" },
      ],
      mythsAndFacts: [
        {
          myth: "Kalau asap di permukaan sudah hilang, api pasti sudah padam.",
          fact: "Api gambut bisa terus membara di bawah tanah dan muncul kembali, sehingga pembasahan harus sampai ke lapisan dalam.",
        },
        {
          myth: "Masker kain biasa sudah cukup melindungi dari kabut asap.",
          fact: "Masker kain tidak menyaring partikel PM2.5 dengan baik. Masker N95 atau KF94 yang terpasang rapat jauh lebih efektif.",
        },
      ],
      readiness: {
        before: [
          "Cek indeks kualitas udara (ISPU) dan siapkan masker N95 atau KF94 di rumah.",
          "Ketahui nomor darurat dan lokasi posko kesehatan terdekat.",
        ],
        during: [
          "Tetap di dalam ruangan dengan jendela tertutup dan kurangi aktivitas fisik di luar.",
          "Jika melihat titik api, laporkan lokasinya dan jangan mendekat.",
        ],
        after: [
          "Bersihkan debu dan abu di rumah menggunakan kain basah.",
          "Periksakan diri ke fasilitas kesehatan bila batuk, sesak, atau mata perih berlanjut.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Mengapa kebakaran gambut jauh lebih sulit dipadamkan daripada kebakaran di tanah mineral?",
        options: [
          "Pohon gambut terbuat dari besi",
          "Api membakar lapisan organik di bawah permukaan hingga bermeter-meter dalamnya",
          "Gambut tidak bisa disiram air",
          "Satwa menghalangi petugas",
        ],
        correctIndex: 1,
        explanation:
          "Bara di dalam gambut bisa bertahan jauh di bawah tanah, sehingga air di permukaan saja sering tidak cukup.",
      },
      {
        id: 2,
        question: "Masker apa yang paling efektif menyaring partikel PM2.5 dari kabut asap?",
        options: ["Masker kain tipis bergambar", "Syal atau sapu tangan kering", "Masker N95 atau KF94", "Masker selam satu lapis"],
        correctIndex: 2,
        explanation:
          "PM2.5 sangat kecil dan hanya bisa disaring dengan baik oleh masker berstandar filtrasi tinggi seperti N95 atau KF94 yang terpasang rapat.",
      },
      {
        id: 3,
        question: "Bagaimana satelit seperti MODIS dan VIIRS membantu menangani karhutla?",
        options: [
          "Menyiram api dari orbit",
          "Mendeteksi anomali panas permukaan (hotspot) sehingga titik api bisa dipetakan",
          "Menurunkan salju buatan",
          "Mematikan sinyal di sekitar hutan",
        ],
        correctIndex: 1,
        explanation:
          "Sensor inframerah mendeteksi panas dari kebakaran dan memberi koordinat awal bagi petugas di lapangan.",
      },
      {
        id: 4,
        question: "Apa tujuan pembuatan sekat kanal di lahan gambut?",
        options: [
          "Mempercepat air keluar dari gambut",
          "Menahan air agar gambut tetap basah dan sulit terbakar",
          "Menambah jalur kendaraan",
          "Membuat gambut cepat kering",
        ],
        correctIndex: 1,
        explanation:
          "Sekat kanal menahan air di dalam gambut sehingga tinggi muka air tanah terjaga dan risiko kebakaran turun.",
      },
      {
        id: 5,
        question: "Jika kamu melihat titik api di area hutan, apa yang sebaiknya dilakukan?",
        options: [
          "Mendekat untuk merekam video",
          "Melaporkan lokasinya ke pihak berwenang dan menjauh dari sumber api",
          "Membiarkannya karena pasti padam sendiri",
          "Menambah ranting kering agar cepat habis",
        ],
        correctIndex: 1,
        explanation:
          "Keselamatan diri utama. Laporkan lokasi dengan jelas kepada petugas atau pihak desa lalu menjauh ke arah yang aman.",
      },
    ],
  },
};

export const issuesList: IssueContent[] = Object.values(issuesData);

export const getIssue = (slug: string): IssueContent | undefined => issuesData[slug];
