export interface RangerProfile {
  id: number;
  name: string;
  roleTag: string;
  category: "sungai" | "hutan" | "plastik" | "konservasi";
  categoryLabel: string;
  location: string;
  impactStat: string;
  featured?: boolean;
  image: string;
  fallbackImage: string;
  summary: string;
  fullStory: string;
  quote: string;
  instagram?: string;
  website?: string;
  disasterConnection: string;
}

export const rangersDataId: RangerProfile[] = [
  {
    id: 1,
    name: "Pandawara Group",
    roleTag: "Pemuda Pembersih Sungai & Pesisir",
    category: "sungai",
    categoryLabel: "Bersih Sungai & Cegah Banjir",
    location: "Bandung & Seluruh Nusantara",
    impactStat: "Ratusan Ton Sampah Sungai & Pantai Terangkat",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    summary:
      "Kelompok lima pemuda asal Bandung yang viral karena aksi nyata turun langsung membersihkan sungai-sungai penuh sampah hingga pesisir pantai terkotor di Indonesia.",
    fullStory:
      "Berawal dari keresahan terhadap banjir yang kerap melanda lingkungan tempat tinggal mereka akibat saluran air tersumbat, Pandawara Group membuktikan bahwa anak muda bisa menjadi garda terdepan pencegahan banjir. Aksi mereka berhasil menggerakkan ribuan relawan lintas daerah untuk ikut turun ke sungai.",
    quote:
      "Jangan tunggu banjir datang baru menyalahkan alam. Mulai dari sampah kecil di sekitar kita, bersihkan sekarang juga.",
    instagram: "pandawaragroup",
    website: "https://www.instagram.com/pandawaragroup/",
    disasterConnection: "Mencegah penyumbatan aliran sungai pemicu banjir perkotaan.",
  },
  {
    id: 2,
    name: "Sungai Watch",
    roleTag: "Gerakan Restorasi & Jaring Penghalang Sampah",
    category: "sungai",
    categoryLabel: "Bersih Sungai & Cegah Banjir",
    location: "Bali & Banyuwangi, Jawa Timur",
    impactStat: "100+ Penghalang Sungai & Jutaan Kg Sampah Terkelola",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    summary:
      "Organisasi lingkungan yang memasang jaring penghalang sampah (trash barriers) di aliran sungai serta memilah sampah secara sistematis sebelum hanyut ke laut.",
    fullStory:
      "Sungai Watch menggabungkan teknologi penghalang aliran sampah sederhana dengan pemberdayaan tim pemilah harian. Selain mencegah luapan sungai akibat tumpukan limbah, mereka memetakan sumber pencemaran sungai dan mengedukasi warga desa di sepanjang daerah aliran sungai.",
    quote:
      "Melindungi lautan dan mencegah banjir selalu dimulai dari menjaga kebersihan sungai-sungai kecil di hulu.",
    instagram: "sungaiwatch",
    website: "https://sungai.watch/",
    disasterConnection: "Menjaga kapasitas aliran sungai agar tidak meluap saat hujan deras.",
  },
  {
    id: 3,
    name: "Bye Bye Plastic Bags",
    roleTag: "Gerakan Pelajar Bebas Plastik Sekali Pakai",
    category: "plastik",
    categoryLabel: "Pengurangan Limbah & Drainase",
    location: "Bali & Cabang Pelajar Nasional",
    impactStat: "Digerakkan Pelajar di 50+ Lokasi Dunia",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    summary:
      "Gerakan yang didirikan oleh dua kakak-beradik pelajar di Bali untuk mengedukasi generasi muda mengurangi kantong plastik sekali pakai yang menyumbat selokan dan mencemari tanah.",
    fullStory:
      "Dimulai sejak usia remaja, gerakan ini membuktikan bahwa pelajar sekolah punya suara kuat untuk mengubah kebijakan dan kebiasaan masyarakat. Kampanye mereka mengajak siswa membawa botol minum dan tas belanja sendiri guna menekan limbah plastik penyumbat saluran air.",
    quote:
      "Anak muda memang hanya sebagian kecil dari populasi saat ini, tetapi kita adalah 100% masa depan bumi.",
    instagram: "byebyeplasticbags",
    website: "https://www.byebyeplasticbags.org/",
    disasterConnection: "Mengurangi sampah plastik penyumbat gorong-gorong dan saluran drainase.",
  },
  {
    id: 4,
    name: "Manggala Agni",
    roleTag: "Brigade Pengendalian Kebakaran Hutan & Gambut",
    category: "hutan",
    categoryLabel: "Penjaga Hutan & Gambut",
    location: "Sumatera, Kalimantan & Sulawesi",
    impactStat: "Garda Terdepan Pemadaman & Patroli Karhutla",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    summary:
      "Brigade pengendalian kebakaran hutan dan lahan dari KLHK yang berjuang memadamkan api bawah tanah gambut serta berpatroli menjaga langit Nusantara tetap bebas kabut asap.",
    fullStory:
      "Manggala Agni bekerja siang dan malam di medan gambut ekstrem saat puncak musim kemarau. Selain memadamkan titik panas (hotspot), mereka aktif membangun sekat kanal untuk membasahi kembali lahan gambut dan menyuluh masyarakat desa agar membuka lahan tanpa membakar.",
    quote:
      "Satu percikan api di lahan gambut kering dapat merenggut udara bersih jutaan saudara kita.",
    instagram: "manggalaagni_klhk",
    website: "https://sipongi.menlhk.go.id/",
    disasterConnection: "Mencegah dan memadamkan kebakaran hutan serta kabut asap PM2.5.",
  },
  {
    id: 5,
    name: "Hutan Itu Indonesia",
    roleTag: "Kampanye Kreatif Pelestarian Hutan Tropis",
    category: "hutan",
    categoryLabel: "Penjaga Hutan & Gambut",
    location: "Jakarta & Jaringan Relawan Nusantara",
    impactStat: "Ribuan Pohon Teradopsi & Edukasi Publik",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    summary:
      "Gerakan terbuka yang mengajak anak muda kota mengenal, mencintai, dan ikut menjaga hutan Indonesia lewat musik, seni, lari amal, dan program adopsi pohon.",
    fullStory:
      "Banyak pelajar perkotaan merasa hutan terasa jauh dari kehidupan sehari-hari. Hutan Itu Indonesia menjembatani hal tersebut dengan cara-cara kreatif, mengingatkan bahwa air bersih yang kita minum dan udara sejuk yang kita hirup berasal dari hutan yang terjaga di hulu.",
    quote:
      "Menjaga hutan bukan cuma tugas penjaga hutan di pedalaman, tapi tugas kita semua yang masih bernapas.",
    instagram: "hutanituid",
    website: "https://hutanitu.id/",
    disasterConnection: "Menjaga tutupan hutan hulu untuk mencegah banjir bandang, longsor, dan kekeringan.",
  },
  {
    id: 6,
    name: "Gerakan Sabuk Hijau & Vetiver Nusantara",
    roleTag: "Konservasi Lereng & Pemanenan Air Hujan",
    category: "konservasi",
    categoryLabel: "Konservasi Lereng & Air",
    location: "Perbukitan Jawa & Nusa Tenggara",
    impactStat: "Penguatan Tebing Rawan Longsor & Embung Warga",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    summary:
      "Kolaborasi relawan desa, mahasiswa, dan pegiat konservasi tanah yang menanam rumput vetiver berakar dalam di tebing curam serta membangun penampungan air hujan di wilayah kering.",
    fullStory:
      "Melalui pendekatan solusi berbasis alam (Nature-based Solutions), komunitas konservasi lereng membantu warga desa mengubah tebing gundul yang rawan longsor menjadi sabuk hijau produktif sekaligus menabung air hujan di akuifer tanah untuk menghadapi kemarau panjang.",
    quote:
      "Akar yang kuat mengunci tanah saat hujan lebat, dan menyimpan cadangan air saat kemarau tiba.",
    instagram: "konservasialam.id",
    disasterConnection: "Mencegah tanah longsor lereng curam dan kekeringan air bersih.",
  },
];

export const rangersDataEn: RangerProfile[] = [
  {
    id: 1,
    name: "Pandawara Group",
    roleTag: "River & Coastal Clean-up Youth",
    category: "sungai",
    categoryLabel: "River Clean-up & Flood Prevention",
    location: "Bandung & Nationwide Indonesia",
    impactStat: "Hundreds of Tons of River & Beach Waste Cleared",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    summary:
      "A collective of five young changemakers from Bandung renowned for stepping directly into heavily polluted river channels and coastlines across Indonesia.",
    fullStory:
      "Born from frustration over recurrent floods inundating their neighborhoods due to clogged channels, Pandawara Group proved youth can be frontline flood protectors. Their inspiring actions mobilized thousands of volunteers nationwide to clean up local waterways.",
    quote:
      "Don't wait for floods to arrive to blame nature. Start with small trash around us and clean it up right now.",
    instagram: "pandawaragroup",
    website: "https://www.instagram.com/pandawaragroup/",
    disasterConnection: "Prevents waterway blockages that trigger severe urban flash flooding.",
  },
  {
    id: 2,
    name: "Sungai Watch",
    roleTag: "River Restoration & Trash Barrier Movement",
    category: "sungai",
    categoryLabel: "River Clean-up & Flood Prevention",
    location: "Bali & Banyuwangi, East Java",
    impactStat: "100+ River Barriers & Millions of Kg of Waste Managed",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    summary:
      "An environmental organization deploying floating trash barriers across river channels and systematically sorting refuse before it drifts into oceans.",
    fullStory:
      "Sungai Watch blends simple river barrier technology with dedicated daily sorting teams. Beyond preventing flood overflows caused by waste blockages, they track pollution sources and educate riparian village communities along watersheds.",
    quote:
      "Protecting the ocean and preventing floods always begins with preserving small upstream creeks.",
    instagram: "sungaiwatch",
    website: "https://sungai.watch/",
    disasterConnection: "Maintains river discharge capacity so channels do not overflow during torrential rain.",
  },
  {
    id: 3,
    name: "Bye Bye Plastic Bags",
    roleTag: "Student Movement for Single-Use Plastic Elimination",
    category: "plastik",
    categoryLabel: "Waste Reduction & Urban Drainage",
    location: "Bali & Global Youth Chapters",
    impactStat: "Mobilized Youth in 50+ Global Locations",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=900&q=80",
    summary:
      "Founded by two school sisters in Bali to empower youth to eliminate single-use plastic bags that choke storm drains and pollute soils.",
    fullStory:
      "Started as teenagers, this youth initiative proved students possess a powerful voice to reshape civic policy and consumer habits. Their campaigns urge students to carry reusable bottles and shopping bags to curb drainage-choking litter.",
    quote:
      "Young people may only be a fraction of today's population, but we are 100% of our planet's future.",
    instagram: "byebyeplasticbags",
    website: "https://www.byebyeplasticbags.org/",
    disasterConnection: "Reduces single-use plastic litter that clogs culverts and urban storm drainage.",
  },
  {
    id: 4,
    name: "Manggala Agni",
    roleTag: "Forest & Peatland Wildfire Control Brigade",
    category: "hutan",
    categoryLabel: "Forest & Peatland Protectors",
    location: "Sumatra, Kalimantan & Sulawesi",
    impactStat: "Frontline Wildfire Extinguishment & Peat Patrols",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    summary:
      "The specialized wildland fire control brigade under Indonesia's Ministry of Environment battling subterranean peat fires and keeping skies free of toxic haze.",
    fullStory:
      "Manggala Agni operates day and night in extreme peat terrains during dry seasons. Besides suppressing thermal hotspots, they construct canal blocks to rewet desiccated peatlands and educate local farmers on zero-burn agricultural practices.",
    quote:
      "A single spark in dry peat can rob millions of our citizens of clean, breathable air.",
    instagram: "manggalaagni_klhk",
    website: "https://sipongi.menlhk.go.id/",
    disasterConnection: "Suppresses underground peat fires and eliminates hazardous PM2.5 smoke haze.",
  },
  {
    id: 5,
    name: "Hutan Itu Indonesia",
    roleTag: "Creative Movement for Tropical Rainforest Protection",
    category: "hutan",
    categoryLabel: "Forest & Peatland Protectors",
    location: "Jakarta & National Volunteer Network",
    impactStat: "Thousands of Trees Adopted & Public Education",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    summary:
      "An open creative initiative inspiring urban youth to discover, love, and protect Indonesia's rainforests through music, arts, and tree adoption.",
    fullStory:
      "Many urban students feel rainforests are distant from their everyday lives. Hutan Itu Indonesia bridges this divide creatively, reminding everyone that our drinking water and cool air originate from healthy upland watershed forests.",
    quote:
      "Protecting forests isn't just the job of inland rangers—it's the duty of all of us who breathe.",
    instagram: "hutanituid",
    website: "https://hutanitu.id/",
    disasterConnection: "Protects watershed forest cover to avert flash floods, landslides, and droughts.",
  },
  {
    id: 6,
    name: "Green Belt & Vetiver Indonesia",
    roleTag: "Slope Conservation & Rainwater Harvesting",
    category: "konservasi",
    categoryLabel: "Slope & Water Conservation",
    location: "Java Highlands & Lesser Sunda Islands",
    impactStat: "Reinforcing Landslide-Prone Slopes & Community Basins",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    fallbackImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
    summary:
      "A grassroots collaboration of village volunteers and soil conservationists planting deep-rooted vetiver grass on steep slopes and digging rainwater retention pits.",
    fullStory:
      "Applying Nature-based Solutions (NbS), this community transforms bare, collapse-prone cliffs into lush productive green belts while storing wet-season rainwater in aquifers for extended dry months.",
    quote:
      "Deep roots lock hillside soils during torrential storms and preserve precious water when droughts strike.",
    instagram: "konservasialam.id",
    disasterConnection: "Prevents steep hillside landslides and preserves community clean water reserves.",
  },
];

export function getRangersData(lang: "id" | "en" = "id"): RangerProfile[] {
  return lang === "en" ? rangersDataEn : rangersDataId;
}
