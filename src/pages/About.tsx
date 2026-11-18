import RimbaMascot from "../components/mascot/RimbaMascot";
import { Link } from "../router";
import { useLanguage } from "../context/LanguageContext";
import { t } from "../utils/translate";
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Compass,
  Users,
  CheckCircle2,
  Award,
  Target,
  Lightbulb,
  Leaf,
  BookOpen,
} from "lucide-react";

function SocialLogo({ type, className = "w-4 h-4" }: { type: "instagram" | "linkedin" | "github"; className?: string }) {
  if (type === "instagram") {
    return <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current`} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="2" /><circle cx="12" cy="12" r="4" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" /></svg>;
  }
  if (type === "linkedin") {
    return <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true"><path d="M5.1 3.4A2.1 2.1 0 1 1 5 7.6a2.1 2.1 0 0 1 .1-4.2ZM3.3 9h3.6v11.5H3.3V9Zm5.8 0h3.4v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.1h-3.6V15c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.6H9.1V9Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.9 1.8 2.8 1.3.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.1a10.5 10.5 0 0 1 5.7 0c2.2-1.4 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.3-5.1 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6A11.2 11.2 0 0 0 12 .8Z" /></svg>;
}

export default function About() {
  const { language } = useLanguage();
  const isEn = language === "en";
  return (
    <div className="w-full pb-20">
      {/* Header Banner */}
       <section className="relative overflow-hidden bg-[#173a2d] text-white pt-14 pb-20 text-center">
         <img
           src="/images/Serene%20Green%20Valley%20with%20Wind%20Turbines%20(1).svg"
           alt=""
           aria-hidden="true"
           className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#12382b]/50 via-[#1b4332]/55 to-[#173a2d]/75" />
         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-black font-['Fredoka'] tracking-tight leading-tight">
             {t("empowering_tagline", isEn)}
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
             {isEn
               ? "An interactive web learning sanctuary helping youth preserve ecosystems, care for nature, and prepare for environmental challenges."
               : "Media belajar di web yang membantu anak-anak menjaga alam, merawat lingkungan, dan kesiapan bencana untuk pelajar Indonesia."}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {(isEn ? [t("learn", isEn), t("explore", isEn), t("act", isEn)] : [t("learn", false), t("explore", false), t("act", false)]).map((word) => <span key={word} className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold">{word}</span>)}
          </div>
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
                speech={
                  isEn
                    ? "Warm greetings! I'm Rimba, the hornbill guardian of the rainforest canopy!"
                    : "Salam kenal! Aku Rimba, burung rangkong penjaga tajuk pohon hutan hujan Nusantara!"
                }
                size="xl"
              />
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                {isEn ? "Mascot Character Profile" : "Profil Karakter Maskot"}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Fredoka']">
                Rimba si Rangkong Eco-Ranger
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isEn ? (
                  <>
                    Rimba is inspired by the <strong>Hornbill (Burung Rangkong)</strong>, a crucial umbrella species
                    in Indonesian tropical rainforests known as the &ldquo;farmer of the forest&rdquo; for its vital role
                    in dispersing large canopy tree seeds across dozens of kilometers.
                  </>
                ) : (
                  <>
                    Rimba terinspirasi dari <strong>Burung Rangkong (Hornbill)</strong>, hewan penting yang membantu menjaga hutan (umbrella species)
                    hutan tropis Indonesia yang dikenal sebagai &ldquo;petani hutan&rdquo; karena kemampuannya menebar biji-bijian
                    pohon besar sejauh puluhan kilometer.
                  </>
                )}
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{isEn ? "Safari Explorer Hat:" : "Topi Penjelajah Safari:"}</strong>{" "}
                    {isEn ? "Symbolizing the spirit of field research and careful environmental observation." : "Melambangkan semangat riset lapangan dan observasi alam yang cermat."}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{isEn ? "Forest Green Vest:" : "Rompi Hijau Hutan:"}</strong>{" "}
                    {isEn ? "Embodying the commitment to safeguard watershed balance and care for river basin ecosystems." : "Perlambang komitmen menjaga keseimbangan aliran air dan menjaga alam daerah aliran sungai."}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>{isEn ? "Smart Field Tablet:" : "Tablet Pintar:"}</strong>{" "}
                    {isEn ? "Delivering real-time data from satellites and remote sensors for early disaster detection." : "Membawa informasi dari satelit dan alat pengukur untuk mengetahui bahaya lebih awal."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background & Vision Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-[#173a2d] text-white p-8 sm:p-10 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-5">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {t("background_problem", isEn)}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka'] mt-2 mb-4">
              {t("preparation_knowledge", isEn)}
            </h3>
            <p className="text-sm text-emerald-100/85 leading-relaxed">
              {isEn
                ? "Indonesia faces high disaster risks, yet understanding of climate change, risk reduction, and personal safety measures remains uneven. Overly theoretical textbooks also make it difficult for students to connect threats in their vicinity to concrete actions."
                : "Indonesia memiliki risiko bencana yang tinggi, sementara pemahaman tentang perubahan iklim, pengurangan risiko, dan langkah penyelamatan diri belum merata. Materi yang terlalu teoretis juga membuat pelajar kesulitan menghubungkan ancaman di sekitar mereka dengan aksi nyata."}
            </p>
            <p className="text-sm text-emerald-100/85 leading-relaxed mt-4">
              {isEn
                ? "Rimba serves as a welcoming, engaging, and easy-to-understand learning sanctuary so every student can recognize risks, make sound decisions, and actively protect their surrounding environment."
                : "Rimba hadir sebagai ruang belajar yang ramah, menarik, dan mudah dipahami agar setiap pelajar dapat mengenali risiko, mengambil keputusan yang tepat, serta ikut menjaga lingkungan di sekitarnya."}
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              {isEn ? "Rimba's Direction" : "Arah Rimba"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka'] mt-2 mb-5">
              {t("vision_mission", isEn)}
            </h3>
            <div className="space-y-5">
              <div>
                <h4 className="font-bold text-emerald-800 mb-1">{t("vision", isEn)}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t("vision_text", isEn)}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-emerald-800 mb-1">{t("mission", isEn)}</h4>
                <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{t("mission_item_1", isEn)}</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{t("mission_item_2", isEn)}</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />{t("mission_item_3", isEn)}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {isEn ? "Our Principles" : "Prinsip Kami"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
              {isEn ? "Core Values" : "Nilai-Nilai Utama"}
            </h3>
            <p className="text-sm text-slate-600 mt-3">
              {isEn
                ? "The guiding principles embedded in every material and learning experience at Rimba."
                : "Nilai yang menjadi fondasi dalam setiap materi dan pengalaman belajar di Rimba."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, title: t("core_value_resilient", isEn), text: t("core_value_resilient_text", isEn) },
              { icon: Leaf, title: t("core_value_care", isEn), text: t("core_value_care_text", isEn) },
              { icon: BookOpen, title: t("core_value_science", isEn), text: t("core_value_science_text", isEn) },
              { icon: Heart, title: t("core_value_collaborative", isEn), text: t("core_value_collaborative_text", isEn) },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-white border border-slate-200 p-6 shadow-md hover:-translate-y-1 transition-transform">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></div>
                <h4 className="text-lg font-bold text-slate-900 font-['Fredoka']">{title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Learning Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              {isEn ? "Educational Approach" : "Pendekatan Edukasi"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
              {t("learning_pillars", isEn)}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                {t("pillar_science", isEn)}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("pillar_science_desc", isEn)}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                {t("pillar_simulation", isEn)}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("pillar_simulation_desc", isEn)}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-['Fredoka']">
                {t("pillar_action", isEn)}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t("pillar_action_desc", isEn)}
              </p>
            </div>
          </div>
        </div>

        {/* Development Team */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">{t("behind_rimba", isEn)}</span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">{t("dev_team", isEn)}</h3>
            <p className="text-sm text-slate-600 mt-3">{t("team_desc", isEn)}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Aziefa Maharani Gitaatmaja",
                role: isEn ? "Development Team" : "Tim Pengembang",
                instagram: isEn ? "Not available" : "Belum tersedia",
                linkedin: isEn ? "Not available" : "Belum tersedia",
                github: isEn ? "Not available" : "Belum tersedia",
              },
              {
                name: "Adnan Nur Kholis",
                role: isEn ? "Development Team" : "Tim Pengembang",
                instagram: "adnkh06._",
                linkedin: "Adnan Nur Kholis",
                github: "ItsAdnkh",
              },
              {
                name: "Alfian Chandra Putra Ardhiansyah",
                role: isEn ? "Development Team" : "Tim Pengembang",
                instagram: isEn ? "Not available" : "Belum tersedia",
                linkedin: isEn ? "Not available" : "Belum tersedia",
                github: isEn ? "Not available" : "Belum tersedia",
              },
            ].map(({ name, role, instagram, linkedin, github }) => (
              <div key={name} className="rounded-3xl bg-white border border-slate-200 p-7 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center"><Users className="w-6 h-6" /></div>
                  <div className="min-w-0"><h4 className="text-lg font-bold text-slate-900 font-['Fredoka'] leading-tight">{name}</h4><p className="text-xs text-emerald-700 font-semibold mt-1">{role}</p></div>
                </div>
                <div className="border-t border-slate-100 mt-5 pt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2"><SocialLogo type="instagram" className="w-4 h-4 text-pink-600" /><span className="font-semibold w-16">Instagram</span><span className="truncate">{instagram}</span></div>
                  <div className="flex items-center gap-2"><SocialLogo type="linkedin" className="w-4 h-4 text-sky-700" /><span className="font-semibold w-16">LinkedIn</span><span className="truncate">{linkedin}</span></div>
                  <div className="flex items-center gap-2"><SocialLogo type="github" className="w-4 h-4 text-slate-800" /><span className="font-semibold w-16">GitHub</span><span className="truncate">{github}</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-emerald-900 text-white p-8 md:p-12 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black font-['Fredoka']">
            {t("cta_ready", isEn)}
          </h3>
          <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {t("cta_start", isEn)}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              {t("cta_explore_material", isEn)}
            </Link>
            <Link
              to="/simulasi"
              className="px-6 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-sm shadow-md hover:scale-105 transition-transform"
            >
              {isEn ? "Enter Simulation" : "Masuk Simulasi"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
