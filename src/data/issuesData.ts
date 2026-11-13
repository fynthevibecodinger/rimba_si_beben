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
  sections: IssueSections;
  quiz: QuizQuestion[];
}

export const issuesData: Record<string, IssueContent> = {
  banjir: {
    slug: "banjir",
    title: "Banjir & Genangan Ekstrem",
    subtitle: "Dinamika Daerah Aliran Sungai, Drainase Kota, dan Solusi Berbasis Alam",
    tagline: "Air mencari jalannya. Ketika pori tanah tertutup beton dan sungai tersumbat, bencana terjadi.",
    themeColor: "#0284c7",
    accentBg: "from-sky-500/20 to-blue-600/10",
    threatLevel: "Sangat Tinggi",
    heroBadge: "Hidrometeorologi Basah",
    icon: "Waves",
    sections: {
      causeAndEffect: {
        title: "Mengapa Air Meluap dan Menggenang?",
        description:
          "Banjir bukan sekadar karena curah hujan deras. Ketika permukaan tanah ditutup aspal dan beton tanpa daerah resapan, koefisien limpasan (run-off) meningkat hingga 80%. Air hujan tidak sempat terserap ke akuifer tanah dan langsung meluncur ke sungai yang mendangkal akibat sedimentasi dan sampah.",
        humanActivities: [
          "Alih fungsi sempadan sungai dan rawa retensi menjadi pemukiman padat.",
          "Membuang sampah rumah tangga dan limbah padat ke saluran drainase.",
          "Pengecoran halaman rumah tanpa menyisakan tanah terbuka atau lubang biopori.",
          "Penggundulan hutan hulu yang menurunkan kemampuan akar pohon mengikat air.",
        ],
        ecologicalProcess:
          "Siklus infiltrasi air terputus. Tanah kehilangan kemampuan menahan air, sehingga kapasitas tampung sungai terlampaui dalam hitungan jam.",
      },
      impact: {
        environmental: [
          "Pencemaran sumber air minum warga oleh bakteri E. coli dan limbah lumpur.",
          "Kerusakan ekosistem riparian dan hilangnya vegetasi pelindung tebing sungai.",
          "Penyebaran penyakit leptospirosis, diare, dan infeksi kulit pascabencana.",
        ],
        socialEconomic: [
          "Lumpuhnya mobilitas pelajar ke sekolah dan jalur logistik ekonomi warga.",
          "Kerugian material perabotan rumah, dokumen kependudukan, dan alat elektronik.",
        ],
        vulnerabilityNote:
          "Anak-anak dan lansia di wilayah dataran rendah memiliki kerentanan fisik tertinggi saat arus deras datang mendadak di malam hari.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Bikin Lubang Biopori di Sekolah / Rumah",
          description:
            "Buat lubang silindris sedalam 100 cm dan isi dengan sampah organik untuk mempercepat peresapan air ke tanah hingga 40%.",
          iconName: "Drill",
        },
        {
          type: "pencegahan",
          title: "Operasi Bersih Saluran Air (Pilah Sampah)",
          description:
            "Pastikan selokan di sekitar kelas dan rumah bebas dari plastik kemasan makanan dan botol yang kerap menyumbat gorong-gorong.",
          iconName: "Trash2",
        },
        {
          type: "penyelamatan",
          title: "Siapkan Tas Siaga Bencana (TSB) 3S",
          description:
            "Simpan dokumen rapor/akta dalam plastik kedap air, senter, peluit, obat darurat, dan makanan kering untuk 3 hari pertama.",
          iconName: "ShieldAlert",
        },
        {
          type: "penyelamatan",
          title: "Matikan Aliran MCB Listrik & Jauhi Tiang",
          description:
            "Saat air mulai masuk semata kaki, segera matikan sekring listrik utama dan hindari genangan yang dekat dengan tiang listrik atau kabel putus.",
          iconName: "ZapOff",
        },
      ],
      greenTechTrivia: {
        techName: "Sensor Ultrasonik IoT Telemetri Pintu Air",
        category: "IoT Sensor",
        description:
          "Perangkat pintar bertenaga surya yang dipasang di atas jembatan sungai untuk mengukur ketinggian muka air secara nirkabel real-time ke dasbor BPBD tiap 60 detik.",
        factHighlight:
          "Memberi peringatan dini 3-6 jam sebelum gelombang air bah mencapai pemukiman hilir, menyelamatkan ribuan nyawa!",
      },
    },
    quiz: [
      {
        id: 1,
        question:
          "Mengapa penutupan seluruh halaman rumah dengan semen/beton memperparah bahaya banjir?",
        options: [
          "Karena air hujan menguap lebih cepat ke awan",
          "Karena tanah kehilangan kemampuan infiltrasi sehingga air langsung meluncur menjadi limpasan permukaan",
          "Karena beton menarik gravitasi air lebih kuat",
          "Karena saluran air menjadi lebih bersih tanpa tanah",
        ],
        correctIndex: 1,
        explanation:
          "Beton bersifat kedap air (impermeable). Tanpa tanah terbuka atau biopori, hingga 80% air hujan menjadi air larian (runoff) yang membebani selokan dan sungai.",
      },
      {
        id: 2,
        question:
          "Tindakan paling kritis yang harus dilakukan pertama kali saat air banjir mulai menggenangi dalam rumah adalah...",
        options: [
          "Mencari barang mainan yang hanyut di halaman",
          "Mematikan saklar listrik utama (MCB) dan mencabut steker elektronik",
          "Menunggu air mencapai setinggi pinggang sebelum evakuasi",
          "Membuka semua keran air agar pipa tidak pecah",
        ],
        correctIndex: 1,
        explanation:
          "Air adalah konduktor listrik yang berbahaya. Mematikan saklar MCB mencegah sengatan arus listrik (electrocution) yang fatal di dalam air.",
      },
      {
        id: 3,
        question:
          "Teknologi hijau apa yang efektif menangkap air hujan di tingkat rumah tangga sebelum meluap ke jalan?",
        options: [
          "Sistem Pemanenan Air Hujan (Rainwater Harvesting) & Sumur Resapan",
          "Penggunaan AC berkapasitas besar",
          "Pemasangan aspal sintetis",
          "Pagar seng bertingkat",
        ],
        correctIndex: 0,
        explanation:
          "Pemanenan air hujan menampung air hujan dari talang untuk disaring dan digunakan kembali, sedangkan kelebihannya disalurkan ke sumur resapan.",
      },
    ],
  },

  "tanah-longsor": {
    slug: "tanah-longsor",
    title: "Tanah Longsor & Pergerakan Lereng",
    subtitle: "Kekuatan Akar Vegetasi, Kemiringan Lereng, dan Bahaya Erosi Lahan",
    tagline: "Akar pohon adalah paku bumi alami. Ketika lereng ditebas, gravitasi mengambil alih.",
    themeColor: "#8d5b4c",
    accentBg: "from-amber-700/20 to-stone-800/10",
    threatLevel: "Tinggi",
    heroBadge: "Geohidrologi Lereng",
    icon: "Mountain",
    sections: {
      causeAndEffect: {
        title: "Bagaimana Massa Tanah Bisa Tiba-Tiba Ambles?",
        description:
          "Tanah longsor terjadi ketika gaya pendorong (berat massa tanah jenuh air dan gravitasi) melebihi gaya penahan (kohesi tanah dan ikatan akar). Hujan berdurasi panjang meresap ke dalam tanah dan tertahan di atas lapisan batuan kedap (bidang gelincir), melumasi tanah sehingga meluncur menuruni lereng dengan kecepatan tinggi.",
        humanActivities: [
          "Pemotongan tebing bukit secara tegak (90 derajat) untuk jalan atau bangunan tanpa terasering.",
          "Penebangan pohon berakar dalam (seperti beringin, aren, bambu) di lereng terjal.",
          "Pembuatan kolam ikan atau persawahan basah di puncak tebing yang menambah beban massa tanah.",
          "Kurangnya drainase lereng sehingga air rembesan terjebak dan memicu rekahan tanah.",
        ],
        ecologicalProcess:
          "Hilangnya perakaran pohon berarti hilangnya jaring pengikat mekanis. Kejenuhan air mengubah tanah lempung menjadi lumpur cair yang mudah menggelincir.",
      },
      impact: {
        environmental: [
          "Timbunan sedimen tebal yang merusak lapisan humus tanah subur di dasar lembah.",
          "Terputusnya hulu sungai dan pembentukan bendung alam labil yang berpotensi memicu banjir bandang.",
          "Kehancuran habitat satwa liar pegunungan.",
        ],
        socialEconomic: [
          "Tertimbunnya pemukiman warga dalam hitungan detik tanpa waktu penyelamatan panjang.",
          "Terputusnya akses jalan penghubung antardaerah di kawasan pegunungan.",
        ],
        vulnerabilityNote:
          "Perumahan di lereng dengan kemiringan di atas 20 derajat sangat berisiko tinggi saat curah hujan akumulatif 3 hari melebihi 100 mm.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Tanam Rumput Vetiver & Pohon Berakar Tunggang",
          description:
            "Akar rumput Vetiver (akar wangi) dapat menembus tanah hingga kedalaman 3-4 meter, mengikat lapisan tanah secara alami bagaikan jangkar biologis.",
          iconName: "Sprout",
        },
        {
          type: "pencegahan",
          title: "Laporkan Retakan Tanah Melengkung di Lereng",
          description:
            "Jika melihat retakan tanah seperti tapal kuda atau pohon/tiang listrik yang mulai miring, segera laporkan ke guru, RT, atau BPBD.",
          iconName: "AlertTriangle",
        },
        {
          type: "penyelamatan",
          title: "Kenali Tanda Suara Gemuruh dari Atas Bukit",
          description:
            "Suara gemuruh seperti dentuman atau ranting patah bersahut-sahutan menandakan pergerakan lereng telah dimulai. Jangan kembali untuk mengambil barang!",
          iconName: "Volume2",
        },
        {
          type: "penyelamatan",
          title: "Evakuasi Tegak Lurus Menjauhi Jalur Luncuran",
          description:
            "Lari ke arah samping (tegak lurus terhadap jalur luncuran longsor), bukan lari ke arah lembah searah jalannya lumpur.",
          iconName: "CornerUpRight",
        },
      ],
      greenTechTrivia: {
        techName: "Extensometer Digital & Sensor Tiltmeter Nirkabel",
        category: "IoT Sensor",
        description:
          "Sensor pengukur pergeseran tanah tingkat milimeter yang dihubungkan ke sirine otomatis bertenaga surya. Saat retakan melebar lebih dari batas aman, sirine desa akan meraung.",
        factHighlight:
          "Telah dipasang di ratusan titik rawan longsor di Jawa dan Sumatera oleh PVMBG dan universitas riset nasional.",
      },
    },
    quiz: [
      {
        id: 1,
        question:
          "Mengapa rumput Vetiver (akar wangi) sangat direkomendasikan ditanam di lereng bukit rawan longsor?",
        options: [
          "Karena aromanya mengusir hama serangga",
          "Karena akarnya mampu tumbuh menembus hingga 3-4 meter ke bawah mengunci struktur tanah",
          "Karena rumput ini tidak membutuhkan air sama sekali",
          "Karena warnanya membuat lereng terlihat indah dari satelit",
        ],
        correctIndex: 1,
        explanation:
          "Akar Vetiver memiliki kekuatan tarik yang setara dengan kawat baja ringan dan menembus sangat dalam, berfungsi sebagai paku bumi biologis.",
      },
      {
        id: 2,
        question:
          "Jika kamu berada di lereng bukit dan mendengar suara gemuruh serta melihat pohon mulai miring, arah evakuasi yang benar adalah...",
        options: [
          "Lari searah ke dasar lembah mengikuti luncuran tanah",
          "Bersembunyi di balik pohon besar di lereng",
          "Lari ke arah samping (tegak lurus terhadap jalur luncuran longsor) menuju tanah stabil",
          "Merekam video dengan ponsel di tepi tebing",
        ],
        correctIndex: 2,
        explanation:
          "Luncuran tanah dan lumpur bergerak sangat cepat ke arah dasar lereng. Berlari ke samping (lateral) adalah satu-satunya cara keluar dari jalur hempasan.",
      },
      {
        id: 3,
        question:
          "Aktivitas manusia yang paling sering memicu ketidakstabilan lereng adalah...",
        options: [
          "Membuat terasering bertingkat",
          "Memotong tebing bukit secara tegak lurus untuk bangunan tanpa dinding penahan",
          "Menanam pohon buah di pekarangan datar",
          "Membuat jalur pendakian berkelok",
        ],
        correctIndex: 1,
        explanation:
          "Memotong lereng tegak lurus menghilangkan bidang penahan kaki lereng, membuat massa tanah di atasnya kehilangan penopang dan mudah runtuh.",
      },
    ],
  },

  kekeringan: {
    slug: "kekeringan",
    title: "Kekeringan & Krisis Air Bersih",
    subtitle: "Dampak El Niño, Cadangan Air Tanah, dan Konservasi Air Cerdas",
    tagline: "Air adalah sumber kehidupan. Menjaga mata air hari ini adalah menyelamatkan napas esok hari.",
    themeColor: "#d97706",
    accentBg: "from-amber-500/20 to-yellow-600/10",
    threatLevel: "Sedang",
    heroBadge: "Hidrometeorologi Kering",
    icon: "SunMedium",
    sections: {
      causeAndEffect: {
        title: "Mengapa Sumur Mengering dan Sawah Pecah-Pecah?",
        description:
          "Kekeringan meteorologis terjadi ketika curah hujan berada jauh di bawah normal akibat anomali iklim seperti fenomena El Niño. Namun, kekeringan hidrologis diperparah oleh rusaknya daerah tangkapan air (catchment area), penyedotan air tanah secara berlebihan tanpa pengisian kembali, dan degradasi humus yang menurunkan kapasitas simpan air (water holding capacity).",
        humanActivities: [
          "Eksploitasi air tanah dalam secara masif oleh industri tanpa izin konservasi.",
          "Pengurukan dan pengeringan rawa atau danau alami yang berfungsi sebagai reservoir penyimpan air.",
          "Praktik pertanian monokultur intensif tanpa mulsa penutup tanah.",
          "Pemborosan air bersih dalam konsumsi harian dan kebocoran pipa jaringan air.",
        ],
        ecologicalProcess:
          "Muka air tanah (water table) turun drastis. Vegetasi layu permanen, mikroorganisme tanah mati, dan terjadi intrusi air laut ke sumur-sumur pesisir.",
      },
      impact: {
        environmental: [
          "Gagal panen (puso) massal pada komoditas pangan pokok seperti padi dan jagung.",
          "Kematian satwa liar karena dehidrasi dan hilangnya kubangan air di habitat alami.",
          "Degradasi struktur tanah menjadi debu yang memicu badai debu lokal.",
        ],
        socialEconomic: [
          "Melonjaknya harga bahan pangan dan krisis air bersih bagi keluarga prasejahtera.",
          "Meningkatnya risiko malnutrisi dan penyakit kulit akibat sanitasi yang buruk.",
        ],
        vulnerabilityNote:
          "Kawasan Nusa Tenggara dan Jawa bagian selatan menjadi zona paling rentan terhadap kekeringan musiman berkepanjangan.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Gerakan 4 Menit Tutup Keran Saat Gosok Gigi",
          description:
            "Menutup keran air saat menyikat gigi atau mencuci sabun menghemat hingga 12 liter air bersih per orang setiap harinya.",
          iconName: "Droplet",
        },
        {
          type: "pencegahan",
          title: "Daur Ulang Air Bilasan Wudhu & Cucian Beras",
          description:
            "Gunakan air bekas bilasan wudhu atau cucian beras untuk menyiram tanaman di taman sekolah daripada dibuang percuma.",
          iconName: "RotateCcw",
        },
        {
          type: "penyelamatan",
          title: "Konsumsi Air Matang Bersih & Lindungi Wadah Air",
          description:
            "Pastikan air minum dimasak hingga mendidih dan tutuplah ember penampungan air rapat-rapat agar tidak menjadi sarang jentik nyamuk DBD.",
          iconName: "CheckCircle",
        },
        {
          type: "penyelamatan",
          title: "Laporkan Krisis Air ke Pihak Desa / PDAM untuk Tangki Darurat",
          description:
            "Koordinasikan dengan guru atau ketua RT untuk mengajukan drop air bersih mobil tangki BPBD saat sumur warga mulai kering total.",
          iconName: "Truck",
        },
      ],
      greenTechTrivia: {
        techName: "Irigasi Tetes Presisi Bertenaga Surya & Satelit Soil Moisture",
        category: "Nature-based Solutions",
        description:
          "Sistem penyiraman berbasis pipa mikro yang meneteskan air langsung ke akar tanaman dengan efisiensi 95%, dipadukan data kelembapan tanah satelit SMAP.",
        factHighlight:
          "Menghemat penggunaan air pertanian hingga 60% dibanding metode genangan konvensional di daerah lahan kering!",
      },
    },
    quiz: [
      {
        id: 1,
        question:
          "Manakah kebiasaan sehari-hari pelajar yang paling signifikan menghemat air bersih?",
        options: [
          "Membiarkan keran mengalir saat menyabuni piring atau menggosok gigi",
          "Menutup keran air saat tidak digunakan dan memakai wadah gayung terkontrol",
          "Mencuci sepeda motor dengan selang bertekanan tinggi setiap hari",
          "Membuang air sisa minum botol ke selokan",
        ],
        correctIndex: 1,
        explanation:
          "Membiarkan keran mengalir memboroskan hingga 9-12 liter per menit. Penggunaan gayung atau mematikan keran menghemat ribuan liter air per bulan.",
      },
      {
        id: 2,
        question:
          "Mengapa air bekas cucian beras sangat baik dimanfaatkan kembali untuk menyiram tanaman?",
        options: [
          "Karena air cucian beras mengandung pestisida beracun",
          "Karena kaya nutrisi vitamin B dan pati yang menyuburkan mikroba tanah tanpa membuang air bersih baru",
          "Karena membuat tanaman berbuah beras secara instan",
          "Karena tanaman tidak menyukai air hujan",
        ],
        correctIndex: 1,
        explanation:
          "Air cucian beras mengandung nutrisi organik mikro yang menyuburkan tanah sekaligus mempraktikkan prinsip sirkular reuse air.",
      },
      {
        id: 3,
        question:
          "Fenomena iklim global yang sering menyebabkan musim kemarau lebih panjang dan kering di Indonesia adalah...",
        options: ["La Niña", "El Niño", "Angin Monsun Barat", "Efek Coriolis"],
        correctIndex: 1,
        explanation:
          "El Niño menyebabkan pemanasan suhu permukaan laut di Samudra Pasifik timur, memindahkan pembentukan awan hujan menjauhi kepulauan Indonesia.",
      },
    ],
  },

  "kebakaran-hutan": {
    slug: "kebakaran-hutan",
    title: "Kebakaran Hutan & Lahan (Karhutla)",
    subtitle: "Kerentanan Gambut, Titik Panas Hotspot, dan Penjagaan Kualitas Udara",
    tagline: "Gambut yang terbakar di bawah tanah melepaskan karbon ribuan tahun. Sekali menyala, sulit padam.",
    themeColor: "#dc2626",
    accentBg: "from-red-600/20 to-orange-700/10",
    threatLevel: "Kritis",
    heroBadge: "Emisi & Karhutla",
    icon: "Flame",
    sections: {
      causeAndEffect: {
        title: "Mengapa Lahan Gambut Indonesia Begitu Mudah Membara?",
        description:
          "Lahan gambut tropis adalah tumpukan bahan organik tumbuhan purba sedalam bermeter-meter yang terendam air. Ketika kanal buatan mengeringkan gambut untuk perkebunan, kubah gambut menjadi kering bagaikan spons berisi bahan bakar batu bara muda. Percikan api kecil dari puntung rokok atau pembukaan lahan dengan cara membakar (slash-and-burn) langsung memicu kebakaran bawah tanah (smoldering) yang menyebar tanpa terlihat di permukaan.",
        humanActivities: [
          "Pembukaan lahan perkebunan dengan metode membakar karena biayanya paling murah.",
          "Pembuatan parit/kanal drainase ilegal yang mengeringkan air alami dari kubah gambut.",
          "Membuang puntung rokok atau meninggalkan api unggun kemah yang belum padam total di area hutan.",
          "Perambahan kawasan konservasi hutan lindung untuk aktivitas tambang liar.",
        ],
        ecologicalProcess:
          "Api gambut membakar di bawah tanah (sub-surface) tanpa oksigen terbuka, menghasilkan asap karbon monoksida pekat dan partikulat halus PM2.5 yang mematikan pernapasan.",
      },
      impact: {
        environmental: [
          "Pelepasan megaton gas rumah kaca (CO2) ke atmosfer yang mempercepat pemanasan global.",
          "Hilangnya keanekaragaman hayati satwa langka seperti Orangutan, Harimau Sumatera, dan Burung Rangkong.",
          "Kerusakan lapisan kubah gambut yang membutuhkan ratusan tahun untuk terbentuk kembali.",
        ],
        socialEconomic: [
          "Krisis Infeksi Saluran Pernapasan Akut (ISPA) massal pada jutaan anak sekolah.",
          "Sekolah diliburkan berbulan-bulan dan penerbangan bandara lumpuh total akibat kabut asap tebal.",
        ],
        vulnerabilityNote:
          "Provinsi Riau, Jambi, Sumatera Selatan, serta Kalimantan Tengah dan Barat menjadi wilayah langganan ancaman karhutla setiap puncak kemarau.",
      },
      studentActions: [
        {
          type: "pencegahan",
          title: "Katakan TIDAK pada Pembakaran Sampah Terbuka",
          description:
            "Jangan pernah membakar sampah daun kering atau plastik di pekarangan. Asapnya meracuni udara dan percikan apinya mudah tertiup angin memicu kebakaran.",
          iconName: "ShieldX",
        },
        {
          type: "pencegahan",
          title: "Dukung Program Sekat Kanal (Canal Blocking) Gambut",
          description:
            "Pelajari dan dukung upaya rewetting (pembasahan kembali) ekosistem gambut dengan membangun sekat kanal agar air gambut tetap terjaga tinggi.",
          iconName: "Layers",
        },
        {
          type: "penyelamatan",
          title: "Gunakan Masker N95 / KF94 Saat ISPU Memburuk",
          description:
            "Partikel kabut asap karhutla berukuran PM2.5 yang sangat halus. Masker kain biasa tidak mampu menyaringnya, gunakan masker berstandar N95.",
          iconName: "Smile",
        },
        {
          type: "penyelamatan",
          title: "Buat Ruang Aman Berudara Bersih (Safe Room) di Rumah",
          description:
            "Tutup celah ventilasi jendela dengan kain basah, kurangi aktivitas luar ruangan, dan nyalakan penjernih udara (air purifier) sederhana jika tersedia.",
          iconName: "Home",
        },
      ],
      greenTechTrivia: {
        techName: "Satelit Penginderaan Jauh SNPP/VIIRS Hotspot & Drone Pemadam",
        category: "Satelit & Penginderaan Jauh",
        description:
          "Sensor radiometer spektral satelit mengidentifikasi anomali panas permukaan tanah (titik api) beresolusi 375 meter setiap 12 jam untuk memandu tim darat Manggala Agni.",
        factHighlight:
          "Data titik panas satelit kini dapat diakses langsung oleh masyarakat via aplikasi Sipongi KLHK dan PetaBencana!",
      },
    },
    quiz: [
      {
        id: 1,
        question:
          "Mengapa api pada kebakaran lahan gambut sangat sulit dipadamkan dibandingkan hutan tanah mineral?",
        options: [
          "Karena pohon di lahan gambut terbuat dari besi",
          "Karena api membakar lapisan organik di bawah permukaan tanah (smoldering fire) hingga bermeter-meter dalamnya",
          "Karena lahan gambut tidak bisa disiram air",
          "Karena satwa liar menghalangi petugas pemadam",
        ],
        correctIndex: 1,
        explanation:
          "Api gambut membakar lapisan bahan organik padat di bawah tanah. Pemadaman dari udara sering hanya membasahi permukaan sementara bara di kedalaman 2 meter tetap menyala.",
      },
      {
        id: 2,
        question:
          "Masker jenis apa yang paling efektif melindungi saluran pernapasan dari partikel debu halus berbahaya (PM2.5) kabut asap karhutla?",
        options: [
          "Masker kain tipis bergambar",
          "Syal atau sapu tangan kering",
          "Masker berstandar filtrasi N95 / KF94",
          "Masker scuba satu lapis",
        ],
        correctIndex: 2,
        explanation:
          "Partikel PM2.5 berukuran 30 kali lebih kecil dari sehelai rambut. Hanya masker dengan efisiensi filtrasi standar seperti N95 atau KF94 yang mampu menyaring partikel mikroskopis ini.",
      },
      {
        id: 3,
        question:
          "Teknologi satelit seperti MODIS dan VIIRS membantu penanganan kebakaran hutan dengan cara...",
        options: [
          "Menyemprotkan air langsung dari orbit antariksa",
          "Mendeteksi anomali suhu panas permukaan (hotspot titik api) secara real-time dari luar angkasa",
          "Menurunkan hujan salju buatan",
          "Mematikan sinyal internet di sekitar hutan",
        ],
        correctIndex: 1,
        explanation:
          "Sensor termal satelit mendeteksi radiasi inframerah dari panas kebakaran, memberikan koordinat akurat titik api kepada petugas darat sebelum api meluas.",
      },
    ],
  },
};
