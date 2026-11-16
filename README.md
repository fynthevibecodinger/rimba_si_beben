# Rimba Siaga Bencana

Rimba Siaga Bencana adalah website edukasi interaktif untuk membantu pelajar mengenal lingkungan, memahami risiko bencana, dan belajar melakukan tindakan sederhana untuk menjaga alam serta keselamatan diri.

## Fitur

- **Beranda edukatif** dengan pengenalan isu lingkungan dan kesiapsiagaan bencana.
- **Materi bencana** tentang banjir, tanah longsor, kekeringan, dan kebakaran hutan/lahan.
- **Simulasi 3D interaktif** untuk melihat skenario bencana dan mencoba perubahan kondisi lingkungan.
- **Kuis singkat** untuk menguji pemahaman pengguna.
- **Tips tindakan siswa** yang dapat dilakukan sebelum, saat, dan setelah bencana.
- **Musik latar** yang dapat dikontrol dari navigasi.
- **Halaman Tentang dan Kontak** untuk mengenal Rimba serta mengirim masukan.
- **Nomor darurat** yang ditampilkan pada footer untuk akses cepat.

## Teknologi

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Three.js
- React Three Fiber dan Drei
- GSAP dan Motion
- Lucide React

## Menjalankan Project

Pastikan Node.js dan npm sudah terpasang, kemudian jalankan:

```bash
npm install
npm run dev
```

Project akan tersedia pada alamat yang ditampilkan oleh Vite, biasanya:

```text
http://localhost:5173
```

Untuk menjalankan build production:

```bash
npm run build
npm run preview
```

Untuk memformat kode:

```bash
npm run format
```

## Struktur Utama

```text
src/
├── components/
│   ├── audio/       # Kontrol musik latar
│   ├── lab3d/       # Komponen simulasi 3D
│   └── layout/      # Navbar dan Footer
├── context/         # Context aplikasi, termasuk musik
├── data/            # Materi isu lingkungan dan bencana
├── pages/           # Halaman utama aplikasi
└── router/          # Router sederhana berbasis path dan hash

public/
└── images/          # Asset gambar dan ilustrasi website
```

## Rute Halaman

| Rute | Keterangan |
| --- | --- |
| `/` | Beranda |
| `/isu/banjir` | Materi banjir |
| `/isu/tanah-longsor` | Materi tanah longsor |
| `/isu/kekeringan` | Materi kekeringan |
| `/isu/kebakaran-hutan` | Materi kebakaran hutan dan lahan |
| `/simulasi` | Simulasi lingkungan 3D |
| `/about` | Tentang Rimba |
| `/contact` | Kontak dan masukan |

## Tujuan

Rimba dibuat untuk menyampaikan pengetahuan lingkungan dengan bahasa yang mudah dipahami, visual yang menarik, dan pengalaman belajar yang menyenangkan bagi generasi muda Indonesia.
