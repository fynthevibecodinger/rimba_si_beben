import RimbaMascot from "../components/mascot/RimbaMascot";
import { Link } from "../router";
import { ShieldCheck, Heart, Sparkles, Compass, Users, CheckCircle2, Award } from "lucide-react";

export default function About() {
  return (
    <div className="w-full pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#173a2d] text-white pt-14 pb-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Misi Literasi Lingkungan Nusantara
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka'] tracking-tight leading-tight">
            Membangun Generasi Pelajar Tangguh Bencana
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Media pembelajaran interaktif berbasis web yang menghubungkan sains iklim, 
            kebijakan mitigasi berbasis alam, dan aksi penyelamatan diri untuk pelajar Indonesia.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-16">
        {/* Mascot Profile Card */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <RimbaMascot
                mood="wave"
                speech="Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!"
                size="xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                Profil Karakter Maskot
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Fredoka']">
                Rimba si Rangkong Eco-Ranger
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Rimba terinspirasi dari <strong>Burung Rangkong (Hornbill)</strong>, spesies payung (umbrella species) 
                hutan tropis Indonesia yang dikenal sebagai &ldquo;petani hutan&rdquo; karena kemampuannya menebar biji-bijian 
                pohon besar sejauh puluhan kilometer.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Topi Penjelajah Safari:</strong> Melambangkan semangat riset lapangan dan observasi alam yang cermat.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Rompi Hijau Hutan:</strong> Perlambang komitmen menjaga keseimbangan hidrologi dan konservasi daerah aliran sungai.
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Tablet Telemetri Cerdas:</strong> Membawa data satelit dan sensor IoT untuk mendeteksi bahaya sebelum terlambat.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Learning Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Pendekatan Edukasi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
              3 Pilar Pembelajaran Berkelanjutan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                1. Sains &amp; Sebab-Akibat
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Membongkar miskonsepsi bahwa bencana alam semata-mata takdir tak terduga. Bencana adalah perpaduan ancaman alam dan kerentanan aktivitas manusia.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                2. Simulasi Interaktif
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pelajar tidak hanya membaca teks hafalan, tetapi bereksperimen mengubah variabel iklim dan melihat respon kanvas ekologi secara visual.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                3. Aksi Nyata Pelajar
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Panduan praktis pembuatan biopori sekolah, tas siaga bencana 3 hari, dan prosedur evakuasi mandiri yang dapat diterapkan di keluarga.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-emerald-900 text-white p-8 md:p-12 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
            Siap Menjadi Pahlawan Kesiapsiagaan Bencana?
          </h3>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Mulailah dengan memilih salah satu materi bencana atau uji kemampuan ekologismu di ruang simulasi.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              Jelajahi Materi
            </Link>
            <Link
              to="/simulasi"
              className="px-6 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              Masuk Simulasi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
