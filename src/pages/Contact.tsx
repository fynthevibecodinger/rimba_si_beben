import { useState, FormEvent } from "react";
import RimbaMascot from "../components/mascot/RimbaMascot";
import { Send, CheckCircle2, AlertCircle, Building, Mail, User, MessageSquare, Link2, Globe, MapPin, ArrowUpRight, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    category: "saran_materi",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Nama lengkap wajib diisi.";
    if (!formData.email.trim()) {
      newErrors.email = "Alamat email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }
    if (!formData.school.trim()) newErrors.school = "Nama lingkungan atau komunitas wajib diisi.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal berisi 10 karakter.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      school: "",
      category: "saran_materi",
      message: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="w-full pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#12382b] text-white pt-16 pb-28">
        <div className="absolute -right-28 -top-32 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-teal-300/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-300/25 text-xs font-bold uppercase tracking-[0.16em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Hubungi Rimba
            </span>
            <h1 className="text-4xl sm:text-6xl font-black font-['Fredoka'] leading-[1.05] mt-5 max-w-2xl">
              Satu pesan kecil, <span className="text-emerald-300">dampak besar.</span>
            </h1>
            <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mt-5 max-w-xl">
              Punya pertanyaan, cerita, atau ide untuk membuat belajar tentang alam jadi lebih seru? Ceritakan kepada kami.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-emerald-100/80">
            <span className="px-3 py-2 rounded-full bg-white/10 border border-white/10">Ramah pelajar</span>
            <span className="px-3 py-2 rounded-full bg-white/10 border border-white/10">Terbuka untuk ide</span>
            <span className="px-3 py-2 rounded-full bg-white/10 border border-white/10">Belajar bersama</span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 space-y-10 relative z-10">
        {/* Formulir Kontak */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area */}
          <div className="lg:col-span-7 rounded-[2rem] bg-white border border-slate-200/80 p-6 sm:p-10 shadow-[0_20px_60px_rgba(23,58,45,0.12)]">
            <div className="mb-6">
               <span className="text-xs font-black text-emerald-700 uppercase tracking-[0.16em] block mb-2">
                 Kirim pesan
              </span>
               <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka'] leading-tight">
                  Ceritakan idemu kepada kami
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Punya pengalaman aksi penanaman pohon, ide penambahan simulasi, atau saran materi? Tuliskan di sini!
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-emerald-950 font-['Fredoka']">
                  Terima Kasih, {formData.name}!
                </h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Pesanmu untuk kategori <strong>&ldquo;{formData.category}&rdquo;</strong> berhasil diterima.
                  Rimba dan tim edukator sangat senang mendengar suara generasi tangguh bencana!
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-colors"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                       Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Sigi Pratama"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                          errors.name
                            ? "border-rose-400 bg-rose-50/50 focus:border-rose-500"
                            : "border-slate-300 focus:border-emerald-600 focus:bg-emerald-50/20"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Alamat Email Aktif <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         placeholder="nama@email.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                          errors.email
                            ? "border-rose-400 bg-rose-50/50 focus:border-rose-500"
                            : "border-slate-300 focus:border-emerald-600 focus:bg-emerald-50/20"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* School / City */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                       Asal Lingkungan / Komunitas <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                         placeholder="Contoh: Komunitas Rimba Nusantara"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                          errors.school
                            ? "border-rose-400 bg-rose-50/50 focus:border-rose-500"
                            : "border-slate-300 focus:border-emerald-600 focus:bg-emerald-50/20"
                        }`}
                      />
                    </div>
                    {errors.school && (
                      <span className="text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.school}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Topik Masukan
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-white focus:border-emerald-600 focus:bg-emerald-50/20"
                    >
                      <option value="saran_materi">Usulan Materi Isu Baru</option>
                      <option value="ide_simulasi">Ide Fitur Simulasi Ekosistem</option>
                      <option value="laporan_bug">Laporan Masalah Tampilan / Bug</option>
                       <option value="kerjasama_p5">Kolaborasi Aksi Peduli Lingkungan</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Isi Pesan atau Cerita Aksi <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pengalamanmu atau ide perbaikan media pembelajaran ini..."
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors ${
                        errors.message
                          ? "border-rose-400 bg-rose-50/50 focus:border-rose-500"
                          : "border-slate-300 focus:border-emerald-600 focus:bg-emerald-50/20"
                      }`}
                    />
                  </div>
                  {errors.message && (
                    <span className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm shadow-md inline-flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    Kirimkan Masukan Sekarang
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Mascot Sidebar */}
           <div className="lg:col-span-5 min-h-[390px] flex flex-col items-center justify-center p-6 rounded-[2rem] bg-gradient-to-br from-emerald-900 via-[#1f6048] to-teal-900 border border-emerald-700/30 shadow-[0_20px_60px_rgba(23,58,45,0.18)] relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-white/10" />
             <div className="absolute -right-3 -top-3 w-20 h-20 rounded-full border border-white/10" />
             <div className="relative z-10 text-center mb-1">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200">Ruang untukmu</span>
             </div>
             <RimbaMascot
              mood="celebrate"
               speech="Setiap ide darimu membantu Rimba tumbuh lebih baik!"
              size="lg"
            />
          </div>
        </div>

        {/* Informasi Resmi dan Media Sosial */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_14px_40px_rgba(23,58,45,0.08)]">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Informasi Resmi</span>
            <h2 className="text-2xl font-black text-slate-900 font-['Fredoka'] mt-2">Temukan Rimba</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-700" /><span>halo@rimba-edukasi.id</span></div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-emerald-700" /><span>Indonesia</span></div>
              <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-emerald-700" /><span>Media belajar lingkungan untuk pelajar Indonesia</span></div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-900 to-[#12382b] text-white p-6 sm:p-8 shadow-[0_14px_40px_rgba(23,58,45,0.16)]">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Media Sosial</span>
            <h2 className="text-2xl font-black font-['Fredoka'] mt-2">Ikuti perjalanan Rimba</h2>
            <p className="text-sm text-emerald-100/80 mt-2">Lihat cerita, kegiatan, dan tips menjaga alam.</p>
            <div className="flex flex-wrap gap-3 mt-5">
              <a href="#instagram" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors"><Link2 className="w-4 h-4" /> Instagram <ArrowUpRight className="w-3.5 h-3.5" /></a>
              <a href="#youtube" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors"><Globe className="w-4 h-4" /> YouTube <ArrowUpRight className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </section>

        {/* Pertanyaan yang Sering Ditanyakan */}
        <section className="rounded-[2rem] bg-white border border-slate-200/80 p-6 sm:p-10 shadow-[0_14px_40px_rgba(23,58,45,0.08)]">
          <div className="max-w-2xl mb-5">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka'] mt-2">Pertanyaan yang Sering Ditanyakan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ["Untuk siapa Rimba dibuat?", "Rimba dibuat untuk pelajar, guru, keluarga, dan siapa saja yang ingin belajar menjaga alam."],
              ["Apakah semua materi bisa dipakai gratis?", "Ya. Materi, simulasi, dan kuis di Rimba dapat digunakan untuk belajar."],
              ["Bagaimana cara memberi saran?", "Isi formulir di atas dengan nama, email, dan pesanmu. Kami akan membaca setiap masukan."],
              ["Apakah Rimba memberikan bantuan darurat?", "Rimba adalah media belajar. Untuk nomor darurat, lihat daftar kontak penting di Footer."],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <summary className="cursor-pointer list-none font-bold text-sm text-slate-800 flex items-center justify-between gap-3">
                  {question}<span className="text-emerald-700 text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
