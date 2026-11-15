import { useState, FormEvent } from "react";
import RimbaMascot from "../components/mascot/RimbaMascot";
import { Phone, Send, CheckCircle2, AlertCircle, Sparkles, Building, Mail, User, MessageSquare } from "lucide-react";

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

  const emergencyContacts = [
    {
      number: "112",
      name: "Panggilan Darurat Umum",
      agency: "Kemenkominfo & Pemda / BPBD",
      description: "Nomor tunggal darurat untuk semua jenis musibah bencana alam, banjir, pohon tumbang, dan evakuasi.",
      badge: "Bebas Pulsa 24 Jam",
    },
    {
      number: "113",
      name: "Pemadam Kebakaran",
      agency: "Dinas Pemadam Kebakaran & Penyelamatan",
      description: "Penanganan kebakaran rumah, gedung, kebakaran semak/lahan (karhutla), serta evakuasi hewan berbisa.",
      badge: "Siaga 24 Jam",
    },
    {
      number: "115",
      name: "Badan Nasional Pencarian dan Pertolongan",
      agency: "BASARNAS",
      description: "Operasi Search and Rescue (SAR) korban tertimbun longsor, hanyut banjir bandang, dan kecelakaan perairan.",
      badge: "Operasi Darurat",
    },
    {
      number: "119",
      name: "Sistem Penanggulangan Gawat Darurat Terpadu",
      agency: "Kementerian Kesehatan RI",
      description: "Layanan ambulans gawat darurat medis, korban cedera fisik, hipotermia, dan keracunan asap pekat.",
      badge: "Layanan Medis",
    },
  ];

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
      <section className="bg-gradient-to-b from-[#1b4332] to-[#173a2d] text-white pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            Layanan Komunikasi &amp; Bantuan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka']">
            Kontak Darurat &amp; Suara Pelajar
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
             Simpan nomor kontak darurat nasional di ponselmu dan bagikan cerita atau ide untuk menjaga lingkungan.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 space-y-12">
        {/* Section 1: Emergency Numbers */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Fredoka']">
                Hotline Bebas Pulsa Nasional (Emergency Call)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Layanan aktif 24 jam sehari dari seluruh operator telepon seluler di Indonesia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyContacts.map((contact) => (
              <div
                key={contact.number}
                className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-5 flex flex-col justify-between hover:border-rose-400 hover:bg-rose-50/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl font-black font-mono text-rose-600 tracking-tight">
                      {contact.number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase">
                      {contact.badge}
                    </span>
                  </div>
                  <strong className="text-sm font-bold text-slate-900 block mb-0.5">
                    {contact.name}
                  </strong>
                  <span className="text-[11px] font-semibold text-emerald-800 block mb-2">
                    {contact.agency}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {contact.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <a
                    href={`tel:${contact.number}`}
                    className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Panggil Sekarang
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Controlled Feedback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl">
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                Formulir Komunikasi
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-['Fredoka']">
                 Kirim Saran, Cerita, atau Ide Peduli Lingkunganmu
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
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200">
            <RimbaMascot
              mood="celebrate"
              speech="Setiap ide darimu adalah benih pohon yang melindungi masa depan kita bersama!"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
