export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudentActionItem {
  location?: "rumah" | "sekolah" | "lingkungan";
  type: "pencegahan" | "penyelamatan";
  title: string;
  description: string;
  iconName: string;
}

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

export interface IssueSections {
  causeAndEffect: {
    title: string;
    description: string;
    naturalFactors?: string[];
    humanActivities: string[];
    ecologicalProcess: string;
  };
  impact: {
    environmental: string[];
    healthSafety?: string[];
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
  // ======================================================== 1. BANJIR
  banjir: {
    slug: "banjir",
    title: "Banjir & Genangan Ekstrem",
    subtitle: "Dari hulu ke hilir: sungai, drainase perkotaan, dan solusi infiltrasi berbasis alam",
    tagline: "Air selalu mencari jalan. Saat tanah tertutup beton dan selokan tersumbat, jalannya adalah rumah kita.",
    themeColor: "#0284c7",
    accentBg: "from-sky-500/20 to-blue-600/10",
    threatLevel: "Sangat Tinggi",
    heroBadge: "Hidrometeorologi Basah",
    icon: "CloudRainWind",
    realPhoto: {
      src: "/images/disasters/banjir.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata banjir merendam permukiman warga",
      caption: "Dokumentasi Riil Banjir Permukiman",
    },
    sections: {
      causeAndEffect: {
        title: "Mengapa Air Hujan Meluap dan Menjadi Bencana?",
        description:
          "Hujan deras lebat sejatinya adalah berkah alam dalam siklus hidrologi bumi. Namun, saat permukaan tanah di permukiman dan perkotaan tertutup semen, aspal, dan lantai kedap air, siklus alami infiltrasi terputus total. Sebanyak 90% air hujan tidak bisa meresap dan berubah menjadi limpasan permukaan (run-off). Air mengalir serentak ke selokan sempit yang dangkal dan tersumbat sampah plastik, hingga akhirnya meluap menenggelamkan pekarangan dan rumah warga dalam hitungan menit.",
        naturalFactors: [
          "Curah hujan ekstrem berturut-turut akibat angin monsun basah dan dinamika iklim La Niña.",
          "Topografi dataran rendah di hilir sungai serta pasang air laut pasang (banjir rob).",
          "Kapasitas palung alami sungai yang memiliki ambang batas daya tampung volume air.",
        ],
        humanActivities: [
          "Menyemen seluruh pekarangan rumah dan sekolah tanpa menyisakan tanah terbuka atau lubang biopori.",
          "Membuang sampah kemasan plastik, botol, dan limbah rumah tangga ke selokan dan aliran sungai.",
          "Mendirikan bangunan permanen di sempadan bantaran sungai serta menguruk rawa penampung air alami.",
          "Penggundulan hutan lindung di perbukitan hulu sehingga tidak ada lagi jaring akar pohon yang menyerap air.",
        ],
        ecologicalProcess:
          "Siklus infiltrasi terganggu: tanah kehilangan daya hisap alami, volume limpasan melipatgandakan debit air sungai, dan memicu sedimentasi lumpur tebal yang mendangkalkan saluran air.",
      },
      impact: {
        environmental: [
          "Pencemaran sumber air minum dan sumur warga oleh endapan lumpur pekat, limbah kimia, dan sampah hanyut.",
          "Kerusakan vegetasi sempadan sungai dan erosi tebing yang memicu runtuhnya tanggul penahan tanah.",
          "Penumpukan sampah anorganik dan mikroplastik yang terbawa air bah menuju ekosistem muara laut.",
        ],
        healthSafety: [
          "Merebaknya wabah penyakit pasca-banjir berbahaya: leptospirosis (kencing tikus), kolera, diare akut, dan infeksi jamur kulit.",
          "Risiko fatal sengatan arus pendek listrik (electrocution) akibat air banjir yang merendam instalasi kabel dinding.",
          "Bahaya hipotermia, gigitan ular atau satwa liar yang hanyut, dan risiko tenggelam pada balita serta lansia.",
        ],
        socialEconomic: [
          "Sekolah dan madrasah terpaksa diliburkan total, fasilitas buku pelajaran, meja, dan komputer kelas rusak terendam.",
          "Lumpuhnya jalur logistik transportasi antar-kota yang memicu kelangkaan dan lonjakan harga bahan makanan pokok.",
          "Beban biaya perbaikan rumah yang sangat besar serta hilangnya dokumen penting keluarga.",
        ],
        vulnerabilityNote:
          "Keluarga di bantaran sungai padat, anak-anak, lansia, dan penyandang disabilitas adalah kelompok paling rentan saat air naik cepat di malam hari.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Membuat Lubang Biopori di Sudut Pekarangan",
          description:
            "Gali lubang silinder diameter 10 cm sedalam 100 cm di halaman tanah, lalu isi dengan sampah dedaunan kering untuk memancing cacing tanah menggali liang resapan.",
          iconName: "Drill",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Matikan Sakelar Utama MCB Sebelum Air Masuk",
          description:
            "Bila air mulai menggenangi teras rumah, segera matikan pemutus sirkuit listrik utama dan amankan stopkontak agar air tidak menghantarkan arus maut.",
          iconName: "ZapOff",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Operasi Bersih Saluran Air & Selokan Kelas",
          description:
            "Pastikan selokan depan ruang kelas bebas dari sampah kemasan plastik jajanan yang seringkali menyangkut dan menyumbat jeruji gorong-gorong.",
          iconName: "Trash2",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Siapkan Tas Siaga Bencana (TSB) Pelajar",
          description:
            "Siapkan ransel tahan air berisi salinan dokumen rapor/ijazah berplastik kedap, senter, peluit darurat, kotak P3K kecil, dan pakaian ganti.",
          iconName: "ShieldAlert",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Edukasi Larangan Buang Sampah ke Sungai",
          description:
            "Ajak teman sebaya dan tetangga untuk tidak membuang sampah ke aliran sungai melalui poster kampanye kreatif dan kerja bakti bersama warga RT.",
          iconName: "Users",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Kenali Rute & Titik Kumpul Evakuasi RW",
          description:
            "Ketahui lokasi gedung serbaguna, masjid, atau dataran tinggi yang disepakati sebagai posko pengungsian aman saat sirene peringatan dini berbunyi.",
          iconName: "Compass",
        },
      ],
      greenTechTrivia: {
        techName: "Sensor Ultrasonik IoT Tinggi Muka Air & Telemetri EWS",
        category: "IoT Sensor",
        description:
          "Perangkat penginderaan ultrasonik bertenaga panel surya mandiri yang dipasang menggantung di bawah jembatan sungai. Sensor mengukur jarak pantulan muka air tiap 10 detik, memproses data debit aliran, dan secara nirkabel mentransmisikan peringatan dini ke BPBD dan aplikasi warga hilir.",
        factHighlight:
          "Memberikan waktu evakuasi dini 2 hingga 4 jam lebih cepat bagi warga hilir sebelum air bah tiba di permukiman.",
      },
      quickFacts: [
        { value: "10 × 100 cm", label: "Ukuran standar lubang resapan biopori tanah" },
        { value: "MCB Listrik", label: "Perangkat pertama wajib dimatikan saat banjir tiba" },
        { value: "Hulu–Hilir", label: "DAS satu kesatuan: rusaknya hulu membanjiri hilir" },
      ],
      mythsAndFacts: [
        {
          myth: "Banjir terjadi semata-mata karena hujan yang terlalu lebat.",
          fact: "Hujan lebat adalah pemicu. Hilangnya daerah resapan air, penyemenan halaman, dan drainase yang tersumbat sampah plastik adalah penyebab utama air tidak bisa masuk ke tanah.",
        },
        {
          myth: "Air banjir setinggi mata kaki masih aman untuk bermain atau diterobos.",
          fact: "Arus air deras setinggi betis dapat menjatuhkan orang dewasa dengan mudah, serta berisiko membawa bakteri penyakit, benda tajam tersembunyi, hingga aliran listrik bocor.",
        },
      ],
      readiness: {
        before: [
          "Kenali jalur evakuasi resmi dan simpan nomor darurat BPBD/SAR di kontak ponsel.",
          "Amankan dokumen akta lahir, rapor, dan ijazah ke dalam map plastik kedap air di lemari atas.",
          "Gali lubang biopori dan rutin bersihkan selokan depan rumah setiap akhir pekan.",
        ],
        during: [
          "Matikan sakelar MCB listrik utama dan cabut semua kabel perangkat elektronik.",
          "Evakuasi segera ke tempat tinggi dan jangan pernah nekat berjalan menembus arus banjir deras.",
          "Awasi balita dan lansia agar tidak terpeleset atau terjebak di dalam ruangan.",
        ],
        after: [
          "Gunakan sepatu bot karet dan sarung tangan tebal saat membersihkan endapan lumpur rumah.",
          "Jangan mengonsumsi air sumur yang belum diuji kebersihannya; masak air minum hingga benar-benar mendidih.",
          "Periksa kabel dan colokan listrik bersama petugas PLN sebelum sakelar utama dinyalakan kembali.",
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
          "Beton bersifat kedap air. Tanpa tanah terbuka atau lubang biopori, hingga 90% air hujan menjadi limpasan permukaan (run-off) yang membebani drainase.",
      },
      {
        id: 2,
        question: "Apa tindakan keselamatan paling pertama saat air banjir mulai masuk ke dalam rumah?",
        options: [
          "Mencari barang elektronik yang terapung",
          "Mematikan sakelar listrik utama (MCB) dan mencabut steker",
          "Menunggu air setinggi pinggang baru mengungsi",
          "Membuka semua keran air agar pipa tidak pecah",
        ],
        correctIndex: 1,
        explanation:
          "Air adalah penghantar listrik. Mematikan MCB utama mencegah risiko fatal sengatan arus pendek (electrocution) di dalam genangan air.",
      },
      {
        id: 3,
        question: "Teknologi sederhana apa yang berfungsi menyerap air hujan langsung ke dalam tanah pekarangan?",
        options: [
          "Lubang resapan biopori dan sumur resapan",
          "Pemasangan aspal sintetis tebal",
          "Pagar seng bertingkat",
          "Saluran pipa tertutup tanpa lubang",
        ],
        correctIndex: 0,
        explanation:
          "Lubang biopori (10 × 100 cm) yang diisi sampah daun memancing cacing tanah membuat liang-liang resapan alami ke dalam tanah.",
      },
      {
        id: 4,
        question: "Mengapa kerusakan hutan di daerah hulu bisa menyebabkan banjir besar di kota hilir?",
        options: [
          "Karena hutan menghasilkan hujan buatan ke arah kota",
          "Karena tanpa akar pohon yang menahan air, aliran air meluncur cepat ke hilir membawa lumpur",
          "Karena palung sungai di kota menjadi semakin dalam",
          "Karena air laut selalu mengalir naik menuju pegunungan",
        ],
        correctIndex: 1,
        explanation:
          "Hutan hulu berfungsi sebagai spons penahan air. Bila gundul, air meluncur deras sekaligus membawa erosi lumpur yang mendangkalkan sungai di hilir.",
      },
      {
        id: 5,
        question: "Apa fungsi utama sensor ultrasonik IoT bertenaga surya di jembatan sungai?",
        options: [
          "Menghentikan curah hujan lebat di hulu",
          "Memantau kenaikan tinggi muka air dan mengirim peringatan dini ke warga hilir",
          "Menyaring sampah plastik secara otomatis",
          "Menyedot air sungai ke awan",
        ],
        correctIndex: 1,
        explanation:
          "Sensor mengukur jarak pantulan permukaan air setiap beberapa detik dan memberi waktu evakuasi 2–4 jam lebih awal bagi warga hilir.",
      },
      {
        id: 6,
        question: "Mengapa berjalan menerobos arus banjir setinggi betis orang dewasa tetap sangat berbahaya?",
        options: [
          "Karena air banjir selalu bersuhu mendidih",
          "Arus deras setinggi 15 cm sudah cukup kuat menjatuhkan orang dewasa dan menyembunyikan lubang atau kabel listrik",
          "Karena sepatu akan cepat basah dan rusak",
          "Karena air banjir tidak mengandung oksigen",
        ],
        correctIndex: 1,
        explanation:
          "Arus air bergerak memiliki gaya dorong sangat kuat serta berisiko menyembunyikan selokan terbuka, benda tajam, maupun aliran listrik bocor.",
      },
      {
        id: 7,
        question: "Penyakit menular yang paling sering mewabah pasca-banjir akibat kontaminasi urine tikus di genangan air adalah...",
        options: [
          "Rabies",
          "Leptospirosis",
          "Tetanus",
          "Cacar air",
        ],
        correctIndex: 1,
        explanation:
          "Bakteri Leptospira dari urine tikus masuk ke tubuh melalui luka kecil atau selaput lendir saat warga berjalan tanpa alas kaki di genangan banjir.",
      },
      {
        id: 8,
        question: "Benda penting berikut yang wajib disimpan dalam plastik kedap air di dalam Tas Siaga Bencana (TSB) adalah...",
        options: [
          "Akta kelahiran, ijazah/rapor, senter, peluit, dan kotak P3K",
          "Batu bata dan pot bunga berat",
          "Perangkat televisi dan kipas angin",
          "Kumpulan buku cerita tebal tanpa pelindung",
        ],
        correctIndex: 0,
        explanation:
          "Dokumen identitas penting dan alat darurat (senter, peluit, P3K) harus diamankan dalam wadah kedap air agar mudah dibawa saat evakuasi cepat.",
      },
      {
        id: 9,
        question: "Apa langkah higienis yang benar setelah air banjir surut dan warga mulai membersihkan rumah?",
        options: [
          "Langsung menyalakan sakelar listrik tanpa memeriksa kabel",
          "Menggunakan sepatu bot karet, sarung tangan, dan merebus air sumur hingga mendidih sebelum diminum",
          "Membuang seluruh lumpur rumah kembali ke selokan depan",
          "Langsung meminum air sumur yang terlihat jernih tanpa dimasak",
        ],
        correctIndex: 1,
        explanation:
          "Sepatu bot dan sarung tangan melindungi kulit dari kuman dan benda tajam, sementara air sumur pasca-banjir wajib dimasak mendidih untuk membunuh bakteri.",
      },
      {
        id: 10,
        question: "Istilah sains untuk aliran air hujan yang tidak meresap ke tanah dan mengalir deras di permukaan jalan disebut...",
        options: [
          "Kondensasi",
          "Limpasan permukaan (run-off)",
          "Presipitasi",
          "Sublimasi",
        ],
        correctIndex: 1,
        explanation:
          "Run-off (limpasan permukaan) terjadi ketika permukaan tanah jenuh atau tertutup beton sehingga air mengalir langsung menuju saluran air dan sungai.",
      },
    ],
  },

  // ======================================================== 2. TANAH LONGSOR
  "tanah-longsor": {
    slug: "tanah-longsor",
    title: "Tanah Longsor & Pergerakan Lereng",
    subtitle: "Akar pohon, kemiringan tebing, dan air jenuh: tiga penentu kestabilan lereng bukit",
    tagline: "Akar pohon adalah paku bumi alami. Saat lereng digunduli dan dipotong tegak, gravitasi yang berkuasa.",
    themeColor: "#8d5b4c",
    accentBg: "from-amber-700/20 to-stone-800/10",
    threatLevel: "Tinggi",
    heroBadge: "Geohidrologi Lereng",
    icon: "Landslide",
    realPhoto: {
      src: "/images/disasters/tanah-longsor.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1618588507085-c79565432917?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata longsor pada tebing lereng curam",
      caption: "Dokumentasi Riil Tanah Longsor Tebing",
    },
    sections: {
      causeAndEffect: {
        title: "Bagaimana Lereng Bukit Bisa Tiba-Tiba Meluncur Runtuh?",
        description:
          "Kestabilan lereng bukit ditentukan oleh pertarungan antara dua gaya: gaya penahan (kekuatan ikatan antar partikel tanah dan jangkar akar tanaman) melawan gaya pendorong (berat massa tanah dan tarikan gravitasi bumi). Hujan lebat yang turun berhari-hari meresap dan membebani lapisan tanah atas. Saat air terhalang lapisan batuan kedap air di bawahnya, bidang tersebut menjadi sangat licin layaknya papan seluncur, hingga seluruh massa lereng mendadak meluncur ke bawah dalam hitungan detik.",
        naturalFactors: [
          "Kemiringan lereng tebing yang terjal di atas 20 hingga 40 derajat.",
          "Lapisan tanah pelapukan yang tebal di atas batuan dasar kedap air (bidang gelincir).",
          "Hujan lebat berdurasi lama yang membuat pori-pori tanah mencapai titik jenuh air total.",
        ],
        humanActivities: [
          "Memotong kaki tebing bukit secara tegak lurus untuk membangun rumah atau jalan tanpa dinding penahan (turap).",
          "Menebang pohon hutan berakar tunggang dalam di lereng bukit, digantikan tanaman semusim berakar dangkal.",
          "Membuat kolam genangan air atau sawah basah di puncak bukit yang merembeskan ribuan liter air ke dalam bidang gelincir.",
          "Tidak menyediakan saluran drainase lereng sehingga air limpasan hujan meresap liar dan membuka rekahan tanah.",
        ],
        ecologicalProcess:
          "Hilangnya penopang biologis akar: ikatan mekanis partikel tanah hancur akibat tekanan air pori tinggi, memicu keruntuhan lereng masif dan longsoran debris lumpur batu.",
      },
      impact: {
        environmental: [
          "Hilangnya lapisan tanah pucuk (top soil) humus paling subur yang butuh ratusan tahun untuk terbentuk kembali.",
          "Material longsoran membendung aliran sungai di lembah, menciptakan bendungan alami labil yang sangat rawan jebol menjadi banjir bandang.",
          "Kerusakan parah ekosistem hutan lereng dan hilangnya koridor satwa liar perbukitan.",
        ],
        healthSafety: [
          "Korban jiwa tertimbun material tanah dan bebatuan besar seketika karena kecepatan luncuran longsor bisa mencapai 60 km/jam.",
          "Trauma psikologis mendalam bagi anak-anak dan warga yang kehilangan tempat tinggal dan sanak saudara.",
          "Luka fraktur tulang parah dan risiko asfiksia akibat tertimbun reruntuhan bangunan.",
        ],
        socialEconomic: [
          "Terputusnya jalur transportasi darat utama, mengisolasi desa-desa di pedalaman dari akses bantuan medis dan pangan.",
          "Gedung sekolah di perbukitan rusak tertimbun sehingga ratusan siswa kehilangan fasilitas belajar.",
          "Kerusakan perkebunan produktif masyarakat (kopi, cengkeh, sayuran) yang mematikan mata pencaharian utama warga.",
        ],
        vulnerabilityNote:
          "Rumah di bawah tebing terjal atau di tepi jalur lembah sempit adalah zona paling berbahaya saat hujan lebat turun lebih dari 2 jam tanpa henti.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Waspadai Retakan Tanah Melengkung",
          description:
            "Periksa pekarangan lereng di sekitar rumah; bila menemukan retakan tanah melengkung atau pintu/jendela rumah tiba-tiba sulit ditutup rapat, segera beri tahu orang tua.",
          iconName: "AlertTriangle",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Jangan Kembali Mengambil Barang Berharga",
          description:
            "Bila terdengar suara gemuruh runtuhan atau pohon berderak dari arah bukit, segera keluar rumah dan lari menjauh tanpa menunda untuk mencari barang.",
          iconName: "Volume2",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Tanam Rumput Vetiver di Tebing Rawan",
          description:
            "Ajak komunitas peduli lingkungan dan guru menanam bibit rumput akar wangi (vetiver) di tebing sekitar sekolah karena akarnya menembus 3–4 meter mencengkeram tanah.",
          iconName: "Sprout",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Latihan Evakuasi: Lari ke Samping",
          description:
            "Hafalkan prinsip keselamatan: jangan lari menuruni lembah searah jatuhnya longsoran, melainkan larilah tegak lurus ke samping menuju punggungan tanah stabil.",
          iconName: "CornerUpRight",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Pembuatan Terasering & Saluran Drainase",
          description:
            "Gotong royong bersama warga membuat terasering berundak di lahan miring serta membersihkan saluran air lereng agar tidak ada air yang merembes liar ke rekahan.",
          iconName: "Layers",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Laporkan Pohon atau Tiang Miring Tak Wajar",
          description:
            "Bila tiang listrik, pagar, atau pohon di lereng mulai miring condong bersamaan, segera laporkan ke posko BPBD/desa terdekat sebagai tanda tanah mulai bergerak.",
          iconName: "PhoneCall",
        },
      ],
      greenTechTrivia: {
        techName: "Ekstensometer Digital & EWS Peringatan Dini Lereng (UGM/PVMBG)",
        category: "AI & Early Warning",
        description:
          "Sistem peringatan dini pergerakan tanah rancangan anak bangsa yang dipasang melintasi retakan tebing rawan. Dilengkapi sensor tarikan kawat presisi milimeter dan sensor kemiringan (tiltmeter) yang secara otomatis membunyikan sirine berkekuatan 120 dB saat pergeseran tanah melewati ambang batas aman.",
        factHighlight:
          "Telah terpasang di lebih dari 100 titik tebing rawan bencana di Indonesia dan terbukti menyelamatkan ribuan warga dari ancaman longsoran maut.",
      },
      quickFacts: [
        { value: "> 20°", label: "Sudut kemiringan tebing yang mulai dikategorikan rawan longsor" },
        { value: "3 – 4 m", label: "Kedalaman akar rumput vetiver mengikat partikel tanah" },
        { value: "Arah Samping", label: "Arah lari evakuasi yang benar: tegak lurus jalur luncuran" },
      ],
      mythsAndFacts: [
        {
          myth: "Tanah longsor hanya terjadi di pegunungan tinggi yang jauh dari permukiman.",
          fact: "Longsor dapat terjadi di tebing galian bukit dekat perumahan, tanggul jalan raya, dan tebing tepi sungai di wilayah perbukitan rendah.",
        },
        {
          myth: "Pohon apa saja yang berdaun rimbun pasti kuat menahan lereng dari longsor.",
          fact: "Pohon yang tajuk daunnya terlalu berat namun akarnya dangkal justru dapat menambah beban lereng dan mudah tumbang memicu longsor. Tanaman penahan lereng terbaik memiliki akar tunggang lurus ke dalam seperti vetiver.",
        },
      ],
      readiness: {
        before: [
          "Petakan apakah posisi rumah atau sekolah berada di bawah tebing curam atau alur lembah sempit.",
          "Tanam tanaman berakar dalam di lereng terbuka dan buat saluran pembuangan air hujan (drainase terarah).",
          "Sepakati tanda bunyi kentongan atau peluit darurat di lingkungan RT sebagai alarm pergerakan tanah.",
        ],
        during: [
          "Bila terdengar suara gemuruh atau pohon patah mendadak, segera lari tegak lurus ke samping.",
          "Jauhi alur sungai kecil di dasar lembah karena lumpur dan bebatuan mengalir sangat cepat ke sana.",
          "Lindungi kepala dengan tas atau tangan dan jangan pernah berhenti mengambil sepeda motor atau barang.",
        ],
        after: [
          "Waspadai longsor susulan, terutama bila hujan lebat masih terus mengguyur lereng bukit.",
          "Jangan mendekati zona runtuhan longsor sebelum tim ahli BPBD menyatakan lokasi benar-benar stabil.",
          "Bantu aparat mencatat warga yang hilang dan hindari menyebarkan berita kepanikan yang belum terverifikasi.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Mengapa rumput vetiver (akar wangi) sangat direkomendasikan untuk ditanam di lereng rawan longsor?",
        options: [
          "Aromanya mampu mengusir hujan lebat",
          "Akarnya menembus dalam hingga 3–4 meter dan mengikat struktur tanah bagai paku bumi",
          "Tidak membutuhkan sinar matahari sama sekali",
          "Daunnya mampu menyerap bebatuan",
        ],
        correctIndex: 1,
        explanation:
          "Akar serabut vetiver tumbuh lurus ke bawah sangat dalam dan rapat sehingga mengunci partikel tanah agar tidak mudah bergeser.",
      },
      {
        id: 2,
        question: "Kamu sedang berada di dekat lereng lalu mendengar suara gemuruh dan melihat pohon mulai miring. Ke mana arah lari yang benar?",
        options: [
          "Lari lurus menuruni lembah searah jatuhnya tanah",
          "Bersembunyi tepat di bawah tebing curam",
          "Lari ke samping, tegak lurus jalur luncuran longsor, menuju punggungan tanah stabil",
          "Berhenti di tengah jalan untuk merekam video",
        ],
        correctIndex: 2,
        explanation:
          "Longsoran meluncur sangat cepat mengikuti gravitasi ke dasar lembah. Lari tegak lurus ke samping adalah cara teraman keluar dari jalur lintasan.",
      },
      {
        id: 3,
        question: "Aktivitas manusia yang paling sering merusak kestabilan kaki lereng perbukitan adalah...",
        options: [
          "Membuat terasering berundak dan saluran drainase",
          "Memotong kaki tebing secara tegak lurus untuk bangunan tanpa dinding penahan (turap)",
          "Menanam tanaman berakar dalam di lereng terbuka",
          "Membuat jalur jalan setapak berkelok",
        ],
        correctIndex: 1,
        explanation:
          "Pemotongan tebing secara tegak menghilangkan penopang bawah lereng sehingga massa tanah di atasnya kehilangan penyangga dan mudah runtuh.",
      },
      {
        id: 4,
        question: "Mengapa hujan berhari-hari lebih berbahaya memicu longsor dibandingkan hujan singkat?",
        options: [
          "Air hujan lama bersifat lebih asam",
          "Tanah menjadi jenuh air sehingga bobotnya meningkat tajam dan melicinkan bidang gelincir",
          "Hujan lama membuat akar pohon memanjang seketika",
          "Hujan lama menurunkan gaya gravitasi bumi",
        ],
        correctIndex: 1,
        explanation:
          "Air yang terus meresap menambah berat massa tanah dan melumasi batas antara lapisan tanah gembur dengan batuan kedap air di bawahnya.",
      },
      {
        id: 5,
        question: "Tanda alam awal pergerakan tanah di sekitar lereng yang harus segera dilaporkan adalah...",
        options: [
          "Munculnya embun pagi di dedaunan",
          "Munculnya retakan tanah melengkung serta tiang listrik atau pohon yang miring bersamaan",
          "Rumput liar tumbuh subur di halaman",
          "Burung berkicau di atas dahan pohon",
        ],
        correctIndex: 1,
        explanation:
          "Retakan melengkung dan kemiringan tiang/pohon menandakan lapisan tanah di bawahnya sudah mulai merayap bergerak.",
      },
      {
        id: 6,
        question: "Lapisan batuan kedap air di bawah tanah gembur yang menjadi papan seluncur runtuhnya massa tanah disebut...",
        options: [
          "Bidang gelincir",
          "Lapisan ozon",
          "Kubah gambut",
          "Palung laut",
        ],
        correctIndex: 0,
        explanation:
          "Bidang gelincir adalah batas lapisan kedap air (seperti lempung atau batuan) yang menjadi licin saat air hujan meresap dan tertahan di atasnya.",
      },
      {
        id: 7,
        question: "Apa fungsi utama sistem terasering pada lahan pertanian di daerah berbukit?",
        options: [
          "Mempercepat aliran air hujan langsung ke dasar lembah",
          "Memotong panjang lereng sehingga mengurangi kecepatan aliran air dan erosi tanah",
          "Menambah beban massa tanah di puncak bukit",
          "Mengeringkan seluruh kelembapan tanah",
        ],
        correctIndex: 1,
        explanation:
          "Terasering membuat lereng bertingkat sehingga air hujan tertahan sementara untuk meresap perlahan tanpa mengikis lapisan tanah atas.",
      },
      {
        id: 8,
        question: "Mengapa membuat kolam ikan atau sawah basah tepat di atas tebing curam sangat berisiko?",
        options: [
          "Ikan akan melompat ke dasar lembah",
          "Rembesan air terus-menerus masuk ke pori tanah dan memicu kejenuhan bidang gelincir",
          "Air kolam akan cepat menguap terkena angin",
          "Pohon di sekitar kolam tidak bisa tumbuh",
        ],
        correctIndex: 1,
        explanation:
          "Genangan air di puncak lereng terus merembes ke dalam tanah sehingga bobot lereng bertambah berat dan ikatan tanah melemah.",
      },
      {
        id: 9,
        question: "Alat peringatan dini longsor (EWS) yang mengukur pergeseran retakan tanah hingga skala milimeter adalah...",
        options: [
          "Ekstensometer digital",
          "Termometer ruang",
          "Barometer laut",
          "Anemometer angin",
        ],
        correctIndex: 0,
        explanation:
          "Ekstensometer dipasang melintasi rekahan tanah lereng; bila tarikan kawat melewati ambang batas, sirine peringatan dini otomatis berbunyi.",
      },
      {
        id: 10,
        question: "Bahaya sekunder yang dapat terjadi apabila material longsoran besar menimbun dan membendung aliran sungai di lembah adalah...",
        options: [
          "Kekeringan permanen di hulu",
          "Banjir bandang apabila bendungan alami material longsor tersebut jebol",
          "Air sungai berubah menjadi es",
          "Hilangnya seluruh angin lembah",
        ],
        correctIndex: 1,
        explanation:
          "Bendungan alami dari tumpukan tanah longsor bersifat labil; ketika air sungai meluap dan menjebolnya, tercipta banjir bandang lumpur dan batu.",
      },
    ],
  },

  // ======================================================== 3. KEKERINGAN
  kekeringan: {
    slug: "kekeringan",
    title: "Kekeringan Air & Krisis Air Bersih",
    subtitle: "Fenomena El Niño, cadangan air tanah akuifer, dan budaya konservasi hemat air",
    tagline: "Air bukan sekadar kran yang mengalir. Menjaga mata air hari ini adalah menjaga kelangsungan hidup esok hari.",
    themeColor: "#d97706",
    accentBg: "from-amber-500/20 to-yellow-600/10",
    threatLevel: "Sedang",
    heroBadge: "Hidrometeorologi Kering",
    icon: "DropletOff",
    realPhoto: {
      src: "/images/disasters/kekeringan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata tanah sawah retak akibat kemarau panjang",
      caption: "Dokumentasi Riil Sawah Retak Akibat Kekeringan",
    },
    sections: {
      causeAndEffect: {
        title: "Kenapa Mata Air Mengering dan Tanah Pertanian Retak Merekah?",
        description:
          "Kekeringan bukan semata-mata karena jarangnya hujan turun. Secara hidrologis, krisis air terjadi ketika laju penarikan air bersih untuk konsumsi dan industri melampaui kemampuan alam untuk mengisi ulang (recharge) cadangan akuifer air tanah. Fenomena iklim El Niño membuat musim kemarau lebih terik dan panjang. Ditambah dengan hilangnya tutupan pohon di daerah tangkapan air dan tanah tandus tanpa mulsa penutup, cadangan air tanah menyusut drastis hingga sumur-sumur warga kering kerontang.",
        naturalFactors: [
          "Anomali iklim global El Niño yang menghambat pembentukan awan hujan di atas wilayah Indonesia.",
          "Distribusi curah hujan yang sangat rendah di musim kemarau, terutama di kawasan selatan Jawa dan Nusa Tenggara.",
          "Tingginya laju penguapan (evapotranspirasi) akibat suhu udara terik dan angin kering.",
        ],
        humanActivities: [
          "Penyedotan air tanah dalam (deep well) secara masif tanpa kewajiban membuat sumur resapan imbuhan.",
          "Pengurukan dan alih fungsi danau, telaga, serta embung alami menjadi kawasan pertokoan atau perumahan.",
          "Praktik bertani di lahan terbuka tanpa penutup tanah (mulsa) yang menyebabkan kelembapan tanah menguap cepat.",
          "Perilaku boros air bersih dan membiarkan kebocoran jaringan pipa air berlangsung berbulan-bulan.",
        ],
        ecologicalProcess:
          "Muka air tanah (water table) ambles puluhan meter, memicu penurunan tanah (land subsidence), matinya fauna mikrobioma tanah, dan intrusi air laut ke sumur tawar pesisir.",
      },
      impact: {
        environmental: [
          "Keringnya anak sungai, kubangan air, dan telaga alami yang mematikan ekosistem air tawar serta fauna liar.",
          "Degradasi kesuburan tanah: tanah menjadi keras, retak-retak, tandus, dan mudah terkikis angin kencang menjadi badai debu.",
          "Penyusutan drastis cadangan air baku di waduk-waduk pengendali air nasional.",
        ],
        healthSafety: [
          "Wabah penyakit dehidrasi, diare berat, kolera, dan penyakit kulit menular akibat masyarakat terpaksa menggunakan air kotor.",
          "Meningkatnya risiko malnutrisi dan stunting pada balita akibat gagal panen tanaman pangan keluarga.",
          "Kelelahan fisik ekstrem pada anak-anak dan perempuan yang harus berjalan kaki belasan kilometer mengangkut air.",
        ],
        socialEconomic: [
          "Gagal panen raya (puso) pada puluhan ribu hektare sawah padi dan jagung yang memicu kerugian ekonomi ratusan miliar rupiah.",
          "Lonjakan harga pangan pokok di pasar dan penurunan daya beli keluarga pra-sejahtera.",
          "Konflik sosial perebutan sumber mata air bersih antar-desa atau antar-kelompok pengguna air.",
        ],
        vulnerabilityNote:
          "Wilayah Nusa Tenggara (NTB & NTT), Gunungkidul, dan dataran kapur kering adalah wilayah yang paling cepat terdampak krisis air bersih saat kemarau panjang.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Tutup Keran Saat Menyikat Gigi & Menyabun",
          description:
            "Membiarkan keran mengalir membuang 12 liter air per menit. Gunakan gelas kumur dan matikan pancuran saat menyabuni tubuh untuk menghemat ratusan liter per minggu.",
          iconName: "Droplet",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Pilah & Pakai Ulang Air Bekas Cucian Beras",
          description:
            "Tampung air bekas mencuci beras, buah, atau sayuran ke ember untuk menyiram tanaman di sore hari daripada menggunakan air bersih galon/sumur.",
          iconName: "RotateCcw",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Pasang Mulsa Organik di Taman Kelas",
          description:
            "Tutupi permukaan tanah pot dan taman sekolah dengan dedaunan kering atau serpihan kayu setebal 3 cm untuk menahan penguapan air hingga 70%.",
          iconName: "Leaf",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Laporkan Kran Sekolah yang Bocor Menetes",
          description:
            "Satu kran bocor yang menetes lambat bisa membuang lebih dari 20 liter air per hari. Segera laporkan ke penjaga sekolah untuk dipasang seal karet baru.",
          iconName: "AlertTriangle",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Kampanye Pemanenan Air Hujan (PAH)",
          description:
            "Dukung gerakan instalasi tandon talang atap rumah untuk menampung limpasan air hujan saat musim basah sebagai cadangan menyiram tanaman di musim kering.",
          iconName: "CloudRain",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Prioritaskan Air untuk Minum & Masak",
          description:
            "Saat krisis pasokan air melanda dusun, sepakati bersama warga untuk mengutamakan air bersih PDAM/truk tangki bagi kebutuhan konsumsi dan sanitasi vital.",
          iconName: "HeartPulse",
        },
      ],
      greenTechTrivia: {
        techName: "Teknologi Modifikasi Cuaca (TMC) & Jaring Pemanen Embun Kabut",
        category: "Nature-based Solutions",
        description:
          "Di wilayah perbukitan kering Indonesia, masyarakat didampingi ilmuwan memasang jaring kawat polimer vertikal penangkap partikel kabut malam hari yang mengembunkannya menjadi tetesan air bersih gravitasi. Selain itu, operasi TMC menaburkan garam higroskopis (NaCl) ke awan kumulus potensial untuk memaksimalkan curah hujan mengisi waduk.",
        factHighlight:
          "Setiap jaring kabut seluas 20 m² mampu memanen hingga 100 liter air minum segar per malam murni memanfaatkan fenomena embun alami tanpa energi listrik.",
      },
      quickFacts: [
        { value: "≤ 12 L", label: "Air bersih terbuang sia-sia per menit jika keran dibiarkan mengalir" },
        { value: "El Niño", label: "Fenomena pemanasan laut Pasifik pemicu kemarau panjang di Indonesia" },
        { value: "Mulsa Daun", label: "Penutup tanah organik penahan laju penguapan air hingga 70%" },
      ],
      mythsAndFacts: [
        {
          myth: "Kekeringan air murni terjadi hanya karena langit tidak menurunkan hujan.",
          fact: "Hujan yang minim adalah faktor alami, tetapi pemborosan air, penyedotan air tanah berlebihan, dan rusaknya daerah resapan air adalah penyebab utama krisis air berkepanjangan.",
        },
        {
          myth: "Membuat sumur bor yang semakin dalam pasti menjamin pasokan air abadi.",
          fact: "Akuifer air tanah dalam memiliki kapasitas terbatas. Jika air disedot terus tanpa adanya daerah resapan imbuhan, muka air tanah akan turun permanen dan sumur mengering.",
        },
      ],
      readiness: {
        before: [
          "Siapkan tandon air tertutup di rumah dan biasakan mencatat penggunaan air bersih harian.",
          "Pasang talang pemanen air hujan dan taburkan mulsa organik dedaunan di kebun pekarangan.",
          "Perbaiki pipa atau kran yang bocor sebelum puncak musim kemarau tiba.",
        ],
        during: [
          "Prioritaskan penggunaan air untuk minum, memasak, dan kebersihan diri yang paling pokok.",
          "Siram tanaman pada pagi atau sore hari saat matahari belum terik agar air tidak langsung menguap.",
          "Gunakan kembali air bekas bilasan wudu atau sayuran untuk menyiram tanaman atau mengepel lantai.",
        ],
        after: [
          "Kuras dan bersihkan tandon penampungan air sebelum musim hujan pertama tiba.",
          "Bangun sumur resapan dan lubang biopori di sekitar rumah untuk menyambut musim hujan berikutnya.",
          "Pertahankan kebiasaan hemat air meskipun pasokan air dari PDAM atau sumur telah melimpah kembali.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Kebiasaan pelajar mana yang paling efektif menghemat pasokan air bersih di rumah?",
        options: [
          "Membiarkan keran mengalir deras saat menyikat gigi",
          "Menutup keran saat menyabun atau menyikat gigi serta memakai gelas kumur",
          "Mencuci sepeda dengan selang air mengalir setiap sore",
          "Membuang sisa air minum botol ke selokan",
        ],
        correctIndex: 1,
        explanation:
          "Keran terbuka membuang hingga 12 liter air per menit. Menutup keran saat tidak dipakai menghemat ratusan liter air setiap minggu.",
      },
      {
        id: 2,
        question: "Mengapa air bekas cucian beras (tanpa sabun) baik dimanfaatkan untuk menyiram tanaman?",
        options: [
          "Mengandung bahan kimia pembasmi serangga",
          "Mengandung pati dan nutrisi organik bagi mikroba tanah serta mengurangi pemakaian air bersih baru",
          "Membuat tanaman langsung berbuah padi",
          "Menghilangkan kebutuhan cahaya matahari tanaman",
        ],
        correctIndex: 1,
        explanation:
          "Memakai ulang air bilasan (reuse) menghemat cadangan air bersih sekaligus memberi nutrisi alami bagi tanah pot atau kebun.",
      },
      {
        id: 3,
        question: "Fenomena pemanasan suhu muka laut Pasifik yang sering memicu kemarau panjang di Indonesia adalah...",
        options: [
          "La Niña",
          "El Niño",
          "Angin Monsun Barat",
          "Gerhana Bulan",
        ],
        correctIndex: 1,
        explanation:
          "El Niño menggeser pembentukan awan hujan menjauhi wilayah Indonesia sehingga curah hujan berkurang drastis.",
      },
      {
        id: 4,
        question: "Apa fungsi utama penutup tanah organik (mulsa) dari daun kering di taman atau kebun?",
        options: [
          "Membuat tanah menjadi panas dan retak",
          "Melindungi permukaan tanah dari terik matahari sehingga mengurangi penguapan air hingga 70%",
          "Menghalangi akar tanaman menyerap air",
          "Mengusir seluruh cacing tanah",
        ],
        correctIndex: 1,
        explanation:
          "Mulsa menjaga kelembapan dan suhu tanah tetap sejuk sehingga air siraman bertahan jauh lebih lama di sekitar akar.",
      },
      {
        id: 5,
        question: "Mengapa tandon atau ember penampung air cadangan di rumah wajib selalu ditutup rapat?",
        options: [
          "Agar air di dalamnya berubah menjadi hangat",
          "Mencegah perkembangbiakan jentik nyamuk Aedes aegypti dan menjaga air tetap higienis",
          "Agar air cepat menguap ke udara",
          "Supaya wadah plastik tidak berubah warna",
        ],
        correctIndex: 1,
        explanation:
          "Wadah air terbuka saat musim kemarau rawan menjadi sarang nyamuk demam berdarah dan tercemar debu.",
      },
      {
        id: 6,
        question: "Lapisan batuan atau pasir di bawah permukaan tanah yang menyimpan cadangan air tanah disebut...",
        options: [
          "Akuifer",
          "Atmosfer",
          "Magma",
          "Kubah gambut",
        ],
        correctIndex: 0,
        explanation:
          "Akuifer adalah lapisan batuan berpori di bawah tanah yang menampung dan mengalirkan air tanah menuju sumur dan mata air.",
      },
      {
        id: 7,
        question: "Kapan waktu paling tepat untuk menyiram tanaman saat musim kemarau agar air tidak cepat hilang menguap?",
        options: [
          "Tepat pukul 12.00 siang saat matahari terik",
          "Pagi hari sebelum pukul 08.00 atau sore hari setelah pukul 16.30",
          "Setiap jam sepanjang siang hari",
          "Saat angin kering bertiup paling kencang",
        ],
        correctIndex: 1,
        explanation:
          "Pada pagi atau sore hari suhu udara lebih sejuk sehingga air sempat meresap ke zona perakaran sebelum menguap oleh panas matahari.",
      },
      {
        id: 8,
        question: "Apa dampak penyedotan air tanah dalam secara berlebihan di wilayah pesisir pantai?",
        options: [
          "Air sumur warga menjadi semakin manis",
          "Terjadi intrusi (perembesan) air laut asin ke dalam sumur air tawar warga",
          "Permukaan tanah pesisir naik menjadi bukit",
          "Curah hujan di pantai meningkat dua kali lipat",
        ],
        correctIndex: 1,
        explanation:
          "Ketika cadangan air tawar bawah tanah kosong akibat disedot berlebihan, air laut yang bertekanan lebih tinggi akan merembes masuk mencemari sumur tawar.",
      },
      {
        id: 9,
        question: "Teknologi pemanenan air alternatif yang memanfaatkan jaring vertikal untuk menangkap butiran embun di perbukitan kering disebut...",
        options: [
          "Jaring pemanen kabut (fog harvesting)",
          "Panel surya termal",
          "Turbin angin lepas pantai",
          "Radar cuaca Doppler",
        ],
        correctIndex: 0,
        explanation:
          "Jaring polimer khusus menangkap tetesan mikroskopis kabut malam hari dan mengalirkannya lewat talang menjadi air bersih siap pakai.",
      },
      {
        id: 10,
        question: "Apa hubungan antara membuat sumur resapan di musim hujan dengan ketahanan menghadapi musim kemarau?",
        options: [
          "Tidak ada hubungannya sama sekali",
          "Air hujan yang ditabung ke dalam tanah saat musim basah mengisi ulang cadangan akuifer untuk musim kering",
          "Sumur resapan mencegah awan hujan datang",
          "Sumur resapan hanya berguna untuk membuang sampah plastik",
        ],
        correctIndex: 1,
        explanation:
          "Mengisi ulang air tanah (groundwater recharge) saat musim hujan memastikan sumur dan mata air tetap memiliki cadangan saat kemarau tiba.",
      },
    ],
  },

  // ======================================================== 4. KARHUTLA
  "kebakaran-hutan": {
    slug: "kebakaran-hutan",
    title: "Kebakaran Hutan & Lahan (Karhutla)",
    subtitle: "Lahan gambut tropis, emisi karbon purba, dan hak atas udara bersih bagi generasi masa depan",
    tagline: "Gambut yang terbakar melepas karbon yang tersimpan ribuan tahun. Sekali menyala di bawah tanah, sangat sulit dipadamkan.",
    themeColor: "#dc2626",
    accentBg: "from-red-600/20 to-orange-700/10",
    threatLevel: "Kritis",
    heroBadge: "Emisi & Karhutla",
    icon: "FlameKindling",
    realPhoto: {
      src: "/images/disasters/kebakaran-hutan.jpg",
      fallbackSrc: "https://images.unsplash.com/photo-1602980085566-6c459f23fa46?auto=format&fit=crop&w=600&q=80",
      alt: "Dokumentasi nyata kebakaran hutan dan lahan gambut dengan kabut asap tebal",
      caption: "Dokumentasi Riil Kebakaran Gambut & Kabut Asap Pekat",
    },
    sections: {
      causeAndEffect: {
        title: "Kenapa Lahan Gambut Begitu Mudah Terbakar dan Mengeluarkan Asap Toksik?",
        description:
          "Lahan gambut terbentuk dari tumpukan ranting, dedaunan, dan pohon purba selama ribuan tahun yang terendam air secara alami. Ketika kubah gambut dibelah dengan kanal-kanal drainase buatan untuk pembukaan lahan perkebunan murah, airnya terkuras habis dan lapisan gambut menyusut menjadi bahan bakar padat yang amat kering. Percikan api kecil dari puntung rokok atau pembakaran sampah dapat menyulut bara di kedalaman 1 hingga 3 meter di bawah tanah (smoldering fire). Api ini merayap lambat tanpa api menyala di permukaan, tapi memuntahkan kabut asap pekat berisi partikel beracun PM2.5 yang mencemari udara antarbangsa.",
        naturalFactors: [
          "Musim kemarau panjang yang mengeringkan lapisan biomassa gambut atas hingga sangat mudah terbakar.",
          "Tiupan angin kencang muson yang mempercepat penjalaran bara dan menyebarkan partikel kabut asap ke kota-kota.",
          "Kandungan karbon murni yang sangat padat di dalam tanah gambut tropis Indonesia.",
        ],
        humanActivities: [
          "Pembukaan lahan perkebunan dengan cara membakar hutan (tebas-bakar/slash-and-burn) karena biayanya dianggap paling murah.",
          "Pembuatan kanal drainase liar yang menguras air alami kubah gambut sehingga tanah menjadi kering kerontang.",
          "Membuang puntung rokok menyala sembarangan atau meninggalkan api unggun tanpa dipadamkan air tuntas.",
          "Perambahan ilegal kawasan hutan konservasi lindung dan suaka margasatwa.",
        ],
        ecologicalProcess:
          "Pembakaran nir-oksigen di bawah tanah (smoldering combustion) membakar cadangan karbon purba yang tersimpan selama 10.000 tahun, melepaskan miliaran ton gas CO₂ dan aerosol karsinogenik ke atmosfer bumi.",
      },
      impact: {
        environmental: [
          "Pelepasan emisi karbon dalam skala gigaton yang mempercepat laju pemanasan global dan krisis iklim planet bumi.",
          "Musnahnya habitat satwa endemik langka seperti orangutan sumatera, harimau, gajah, dan burung rangkong.",
          "Kerusakan struktur tanah gambut yang tidak bisa dipulihkan kembali dalam waktu singkat (butuh ratusan tahun pembentukan alami).",
        ],
        healthSafety: [
          "Ledakan ribuan kasus Infeksi Saluran Pernapasan Akut (ISPA), bronkitis kronis, asma berat, dan iritasi kornea mata pada anak-anak sekolah.",
          "Partikulat halus PM2.5 berukuran mikron menembus langsung ke saringan paru-paru dan masuk ke pembuluh darah, memicu risiko serangan jantung dan kanker.",
          "Memburuknya kesehatan ibu hamil dan risiko kelahiran prematur atau bayi berat lahir rendah.",
        ],
        socialEconomic: [
          "Sekolah dan perkuliahan diliburkan berminggu-minggu, mengorbankan hak belajar ratusan ribu pelajar.",
          "Lumpuhnya penerbangan bandara dan transportasi sungai akibat jarak pandang (visibility) turun di bawah 200 meter.",
          "Kerugian ekonomi nasional mencapai puluhan triliun rupiah akibat lumpuhnya pariwisata, perdagangan, dan biaya perawatan medis.",
        ],
        vulnerabilityNote:
          "Riau, Jambi, Sumatera Selatan, Kalimantan Tengah, dan Kalimantan Barat adalah provinsi paling rentan yang kerap terkepung kabut asap pekat pada puncak kemarau.",
      },
      studentActions: [
        {
          location: "rumah",
          type: "pencegahan",
          title: "Jangan Bakar Sampah Daun di Pekarangan",
          description:
            "Stop membakar tumpukan daun kering atau sampah plastik di rumah. Olah daun menjadi kompos tanah dan buang sampah anorganik ke bank sampah RT.",
          iconName: "ShieldX",
        },
        {
          location: "rumah",
          type: "penyelamatan",
          title: "Buat Ruang Aman Asap & Segel Celah Jendela",
          description:
            "Pilih satu kamar di rumah, tutup rapat ventilasi dan kusen jendela menggunakan handuk basah atau lakban, dan nyalakan penyaring udara (air purifier).",
          iconName: "Home",
        },
        {
          location: "sekolah",
          type: "pencegahan",
          title: "Edukasi Bahaya Asap & Pantau Indeks ISPU",
          description:
            "Pelajari cara membaca aplikasi Indeks Standar Pencemar Udara (ISPUnet KLHK) dan pasang bendera warna kualitas udara di tiang sekolah.",
          iconName: "Activity",
        },
        {
          location: "sekolah",
          type: "penyelamatan",
          title: "Wajib Pakai Masker N95 atau KF94",
          description:
            "Masker kain biasa tidak mampu menyaring partikel mikroskopis PM2.5. Gunakan masker respirator standar N95 atau KF94 dengan pemasangan rapat menutupi hidung dan dagu.",
          iconName: "HeartPulse",
        },
        {
          location: "lingkungan",
          type: "pencegahan",
          title: "Dukung Pembangunan Sekat Kanal (Rewetting)",
          description:
            "Dukung upaya restorasi gambut desa dengan membuat sekat kanal berbahan kayu gelam lokal agar muka air gambut tetap basah di bawah 40 cm.",
          iconName: "Layers",
        },
        {
          location: "lingkungan",
          type: "penyelamatan",
          title: "Laporkan Titik Api ke Pemadam & SiPongi",
          description:
            "Bila melihat asap mengepul dari lahan kosong di musim kemarau, segera lapor ke posko Manggala Agni, pemadam kebakaran (113), atau aparat desa.",
          iconName: "PhoneCall",
        },
      ],
      greenTechTrivia: {
        techName: "Sistem Satelit Penginderaan Jauh Titik Panas (SiPongi KLHK & BRIN)",
        category: "Satelit & Penginderaan Jauh",
        description:
          "Kementerian Lingkungan Hidup & Kehutanan memanfaatkan konstelasi satelit cuaca polar NASA (Terra/Aqua MODIS, SNPP VIIRS, dan Landsat-8) yang melintasi Indonesia setiap hari. Algoritma termal satelit mendeteksi anomali suhu tanah di atas 45°C dengan resolusi tinggi 375 meter, lalu secara otomatis mengirimkan titik koordinat GPS ke smartphone tim Manggala Agni di lapangan.",
        factHighlight:
          "Memungkinkan deteksi dini titik panas (hotspot) sebelum kebakaran meluas, memotong waktu respons pemadaman dari hitungan hari menjadi hitungan jam.",
      },
      quickFacts: [
        { value: "PM2.5", label: "Partikel asap toksik halus, 30 kali lebih kecil dari diameter rambut" },
        { value: "N95 / KF94", label: "Standar masker penyaring partikel asap kebakaran gambut" },
        { value: "Bawah Tanah", label: "Api gambut merambat di kedalaman 1–3 m tanpa terlihat di permukaan" },
      ],
      mythsAndFacts: [
        {
          myth: "Jika kepulan asap di atas permukaan tanah sudah hilang, api kebakaran gambut pasti sudah padam tuntas.",
          fact: "Api gambut membara lambat tanpa api menyala di kedalaman 1–3 meter bawah tanah. Bara ini bisa bertahan berbulan-bulan dan muncul kembali saat tertiup angin kencang.",
        },
        {
          myth: "Memakai masker kain biasa atau sapu tangan basah sudah cukup melindungi paru-paru dari asap karhutla.",
          fact: "Masker kain hanya menyaring partikel debu kasar. Partikel toksik PM2.5 sangat kecil dan hanya bisa disaring efektif oleh masker standar respiratorik N95 atau KF94.",
        },
      ],
      readiness: {
        before: [
          "Pantau indeks ISPU secara berkala lewat aplikasi resmi SiPongi atau situs BMKG/KLHK.",
          "Siapkan persediaan masker N95/KF94 dan obat tetes mata di kotak P3K keluarga.",
          "Jangan pernah membakar sisa sampah atau daun kering saat cuaca kering dan berangin kencang.",
        ],
        during: [
          "Kurangi atau hentikan seluruh aktivitas olahraga dan kegiatan di luar ruangan.",
          "Tutup rapat pintu, jendela, dan celah ventilasi rumah; gunakan kain basah untuk menutup celah kusen.",
          "Bila melihat titik kebakaran kecil di semak sekitar, segera laporkan ke RT atau pemadam kebakaran terdekat.",
        ],
        after: [
          "Bersihkan permukaan perabot dan lantai rumah dari endapan abu menggunakan lap basah, bukan sapu kering yang menerbangkan debu.",
          "Periksakan diri ke puskesmas bila mengalami batuk berdahak pekat, sesak napas berat, atau mata merah berair berkepanjangan.",
          "Dukung gerakan penanaman pohon kembali (revegetasi) di lahan hutan mineral yang telah dinyatakan aman padam.",
        ],
      },
    },
    quiz: [
      {
        id: 1,
        question: "Mengapa kebakaran di lahan gambut jauh lebih sulit dipadamkan daripada kebakaran di tanah biasa?",
        options: [
          "Karena pohon di lahan gambut terbuat dari logam",
          "Api membakar lapisan organik purba di bawah permukaan hingga kedalaman 1–3 meter (smoldering fire)",
          "Karena tanah gambut tidak boleh disiram air",
          "Karena api gambut hanya menyala di malam hari",
        ],
        correctIndex: 1,
        explanation:
          "Bara api gambut merambat lambat di bawah permukaan tanah sehingga penyiraman dari atas saja sering tidak menjangkau sumber bara.",
      },
      {
        id: 2,
        question: "Jenis masker yang paling efektif menyaring partikel halus beracun PM2.5 dari kabut asap karhutla adalah...",
        options: [
          "Masker kain satu lapis",
          "Sapu tangan kering",
          "Masker respiratorik standar N95 atau KF94",
          "Masker kertas tipis tanpa kawat hidung",
        ],
        correctIndex: 2,
        explanation:
          "Partikel PM2.5 berukuran 30 kali lebih kecil dari rambut manusia. Masker N95/KF94 memiliki lapisan serat elektrostatik yang mampu menyaring partikel halus tersebut.",
      },
      {
        id: 3,
        question: "Aktivitas manusia yang paling sering memicu kebakaran gambut meluas adalah...",
        options: [
          "Menjaga muka air gambut tetap tinggi",
          "Membuat kanal drainase pengering gambut dan membuka lahan dengan cara dibakar",
          "Memasang papan peringatan dilarang merokok",
          "Menanam pohon endemik rawa gambut",
        ],
        correctIndex: 1,
        explanation:
          "Kanal drainase menguras air alami kubah gambut hingga kering kerontang, sehingga percikan api kecil pun langsung memicu kebakaran hebat.",
      },
      {
        id: 4,
        question: "Apa fungsi utama pembangunan sekat kanal (canal blocking) di kawasan gambut?",
        options: [
          "Mempercepat pengeringan lahan rawa",
          "Menahan aliran air keluar agar lahan gambut tetap basah (rewetting) dan tidak mudah terbakar",
          "Memudahkan kapal besar melintas di tengah hutan",
          "Mengubah lahan gambut menjadi jalan aspal",
        ],
        correctIndex: 1,
        explanation:
          "Sekat kanal menjaga tinggi muka air gambut tetap lembap (aman di bawah 40 cm) sehingga mengembalikan fungsi spons penahan api.",
      },
      {
        id: 5,
        question: "Indeks resmi pemerintah Indonesia untuk mengukur tingkat kualitas udara akibat polusi dan asap adalah...",
        options: [
          "ISPU (Indeks Standar Pencemar Udara)",
          "Skala Richter",
          "Indeks Massa Tubuh (IMT)",
          "Skala Beaufort",
        ],
        correctIndex: 0,
        explanation:
          "ISPU mengukur konsentrasi polutan udara seperti PM2.5, PM10, CO, dan SO₂ untuk menentukan kategori kualitas udara (Baik, Sedang, Tidak Sehat, Berbahaya).",
      },
      {
        id: 6,
        question: "Mengapa kabut asap karhutla sangat berbahaya bagi sistem pernapasan dan jantung manusia?",
        options: [
          "Karena asapnya hanya mengandung uap air murni",
          "Partikel halus PM2.5 dapat menembus masuk hingga ke alveolus paru-paru dan aliran darah",
          "Karena kabut asap menurunkan suhu tubuh menjadi beku",
          "Karena asap karhutla mengandung oksigen murni 100%",
        ],
        correctIndex: 1,
        explanation:
          "Partikel mikroskopis PM2.5 lolos dari saringan bulu hidung, masuk jauh ke paru-paru, memicu ISPA berat, serangan asma, hingga gangguan kardiovaskular.",
      },
      {
        id: 7,
        question: "Bagaimana cara kerja sistem satelit SiPongi KLHK dalam mencegah meluasnya karhutla?",
        options: [
          "Menurunkan hujan es langsung dari luar angkasa",
          "Mendeteksi anomali suhu panas permukaan bumi (hotspot) dan mengirim koordinat GPS ke tim pemadam darat",
          "Menyedot kabut asap keluar dari atmosfer",
          "Menanam bibit pohon otomatis dari satelit",
        ],
        correctIndex: 1,
        explanation:
          "Sensor termal satelit mendeteksi titik panas dini sehingga tim Manggala Agni dapat segera menuju koordinat lokasi sebelum api membesar.",
      },
      {
        id: 8,
        question: "Langkah tepat membuat 'ruang aman asap' di dalam rumah saat kualitas udara luar berstatus Berbahaya adalah...",
        options: [
          "Membuka lebar semua pintu dan jendela rumah",
          "Menutup rapat pintu/jendela, menyegel celah ventilasi dengan kain basah, dan menyalakan air purifier",
          "Membakar sampah daun di halaman untuk mengusir asap",
          "Melakukan olahraga lari keliling halaman rumah",
        ],
        correctIndex: 1,
        explanation:
          "Menyegel celah ventilasi mencegah partikel PM2.5 luar ruangan masuk ke kamar sehingga keluarga tetap menghirup udara yang lebih bersih.",
      },
      {
        id: 9,
        question: "Bagaimana cara membersihkan endapan abu sisa kebakaran hutan di lantai dan meja rumah yang benar?",
        options: [
          "Menyapu dengan sapu lidi kering sekuat tenaga",
          "Mengelap permukaan dengan kain basah atau pel lembap agar partikel abu tidak beterbangan terhirup",
          "Meniup abu menggunakan kipas angin kencang",
          "Membiarkan abu menumpuk di kamar tidur",
        ],
        correctIndex: 1,
        explanation:
          "Menyapu kering menerbangkan kembali partikel halus PM2.5 ke udara ruangan. Lap atau pel basah mengikat partikel abu dengan aman.",
      },
      {
        id: 10,
        question: "Tindakan pencegahan karhutla yang dapat langsung dilakukan pelajar di lingkungan rumah adalah...",
        options: [
          "Membakar tumpukan daun kering dan sampah plastik di pekarangan saat musim kemarau",
          "Mengolah daun kering menjadi kompos dan tidak membuang puntung atau sumber api di semak kering",
          "Bermain petasan di dekat padang ilalang kering",
          "Meninggalkan api unggun perkemahan tanpa disiram air",
        ],
        correctIndex: 1,
        explanation:
          "Mengomposkan daun kering dan menghindari pembakaran sampah terbuka mencegah percikan api liar di musim kemarau.",
      },
    ],
  },
};