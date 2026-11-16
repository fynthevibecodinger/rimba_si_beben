import { useState } from "react";
import { Link } from "../../router";
import { QuizQuestion } from "../../data/issuesData";
import RimbaMascot, { RimbaMood } from "../mascot/RimbaMascot";
import ConfettiBurst from "./ConfettiBurst";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  Award,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QuizSectionProps {
  quiz: QuizQuestion[];
  issueTitle: string;
  nextSlug?: string;
  nextTitle?: string;
  issueSlug?: "banjir" | "tanah-longsor" | "kekeringan" | "kebakaran-hutan" | string;
}

const badgeMap: Record<string, { title: string; subtitle: string; icon: string; bg: string }> = {
  banjir: {
    title: "Pahlawan Siaga Banjir",
    subtitle: "Memahami cara air masuk ke tanah, lubang biopori, dan cara aman saat ada listrik.",
    icon: "🌊",
    bg: "from-sky-500/20 to-blue-600/30",
  },
  "tanah-longsor": {
    title: "Penjaga Lereng Tangguh",
    subtitle: "Memahami manfaat akar vetiver, tanda retakan tebing, dan arah lari yang aman.",
    icon: "⛰️",
    bg: "from-amber-600/20 to-stone-700/30",
  },
  kekeringan: {
    title: "Sahabat Mata Air",
    subtitle: "Pintar menghemat air di rumah, memakai daun kering, dan menjaga air bersih.",
    icon: "💧",
    bg: "from-amber-500/20 to-yellow-600/30",
  },
  "kebakaran-hutan": {
    title: "Ksatria Hutan Lestari",
    subtitle: "Memahami bahaya api gambut bawah tanah, masker standar N95, dan sekat kanal.",
    icon: "🌲",
    bg: "from-red-500/20 to-orange-600/30",
  },
};

export default function QuizSection({
  quiz,
  issueTitle,
  nextSlug,
  nextTitle,
  issueSlug = "banjir",
}: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mascotMood, setMascotMood] = useState<RimbaMood>("idle");
  const [mascotSpeech, setMascotSpeech] = useState<string>(
    "Uji pemahamanmu dari materi di atas! Pilih jawaban terbaik menurutmu ya."
  );

  const currentQ = quiz[currentIndex];
  const totalQuestions = quiz.length;
  const isAnswered = selectedAnswers[currentIndex] !== undefined;
  const currentSelection = selectedAnswers[currentIndex];
  const isCorrect = currentSelection === currentQ.correctIndex;

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = ((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return;

    const newAnswers = { ...selectedAnswers, [currentIndex]: optIndex };
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);

    if (optIndex === currentQ.correctIndex) {
      setMascotMood("celebrate");
      setMascotSpeech("Hebat! Analisismu tepat sekali. Mari kita lihat penjelasannya!");
    } else {
      setMascotMood("think");
      setMascotSpeech("Belum tepat, tapi tenang! Simak penjelasan ilmiahnya untuk belajar.");
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
      setMascotMood("scan");
      setMascotSpeech("Soal berikutnya! Baca dengan teliti ya teman-teman.");
    } else {
      setIsCompleted(true);
      const score = calculateScore();
      if (score >= 70) {
        setMascotMood("celebrate");
        setMascotSpeech(`Luar biasa! Skor kamu ${score}/100. Kamu berhasil meraih Lencana Kesiapsiagaan!`);
      } else {
        setMascotMood("wave");
        setMascotSpeech(`Skor kamu ${score}/100. Tidak apa-apa, kamu bisa membaca kembali materi dan mencoba lagi!`);
      }
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompleted(false);
    setMascotMood("idle");
    setMascotSpeech("Ayo kita coba lagi! Semangat belajar demi bumi kita.");
  };

  const badge = badgeMap[issueSlug] || badgeMap.banjir;
  const finalScore = calculateScore();
  const passed = finalScore >= 70;

  return (
    <div className="rounded-3xl bg-white border border-emerald-900/10 shadow-2xl p-6 sm:p-10 my-12 relative overflow-hidden">
      {/* Confetti Trigger on Pass */}
      {isCompleted && passed && <ConfettiBurst />}

      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Kuis Pemahaman Cepat
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Fredoka']">
            Uji Pengetahuan: {issueTitle}
          </h3>
        </div>

        {!isCompleted && (
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Pertanyaan</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-800 text-white font-mono font-black text-sm">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>
            {/* Visual Step Dots */}
            <div className="flex gap-1.5 items-center">
              {quiz.map((_, i) => {
                const answered = selectedAnswers[i] !== undefined;
                const isCurrent = i === currentIndex;
                const wasCorrect = selectedAnswers[i] === quiz[i].correctIndex;
                return (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "w-6 bg-emerald-600 ring-2 ring-emerald-300"
                        : answered
                        ? wasCorrect
                          ? "w-2.5 bg-emerald-500"
                          : "w-2.5 bg-rose-400"
                        : "w-2.5 bg-slate-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {!isCompleted && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Main Quiz Body */}
      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          {/* Question & Options Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                Soal #{currentIndex + 1} dari {totalQuestions}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, oIdx) => {
                let btnStyle = "border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800";
                let icon = null;

                if (isAnswered) {
                  if (oIdx === currentQ.correctIndex) {
                    btnStyle = "border-emerald-500 bg-emerald-100/80 text-emerald-950 font-bold shadow-sm";
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
                  } else if (oIdx === currentSelection) {
                    btnStyle = "border-rose-400 bg-rose-100/80 text-rose-950 font-bold shadow-sm";
                    icon = <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
                  } else {
                    btnStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base leading-relaxed ${btnStyle}`}
                  >
                    <span className="flex-1">{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`p-5 rounded-2xl border-2 ${
                  isCorrect
                    ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                    : "bg-amber-50/90 border-amber-300 text-amber-950"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Jawaban Benar!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      Perlu Diingat:
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>

                {/* Continue button */}
                <div className="mt-4 pt-3 border-t border-black/10 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    <span>{currentIndex + 1 < totalQuestions ? "Lanjut Soal Berikutnya" : "Lihat Hasil Kuis"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactive Reactive Mascot */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <RimbaMascot mood={mascotMood} speech={mascotSpeech} size="lg" />
          </div>
        </div>
      ) : (
        /* Results & Completion Summary with Badge */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="py-8 text-center max-w-2xl mx-auto space-y-6"
        >
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-1">
              Hasil Belajar Kesiapsiagaan
            </span>
            <h4 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Fredoka']">
              Skor Akhir: {finalScore}%
            </h4>
            <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
               {passed
                 ? "Luar biasa! Kamu sudah tahu cara menjaga alam dan bersiap menghadapi bencana."
                : "Kerja bagus! Teruslah membaca materi dan berlatih agar semakin siap menghadapi bahaya."}
            </p>
          </div>

          {/* Virtual Achievement Badge Card */}
          {passed && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-3xl bg-gradient-to-r ${badge.bg} border-2 border-amber-400 shadow-xl max-w-md mx-auto text-center space-y-2 relative`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest mb-1 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>Lencana Kesiapsiagaan Terbuka</span>
              </div>
              <div className="text-4xl py-1">{badge.icon}</div>
              <h5 className="text-xl font-black font-['Fredoka'] text-slate-900">
                {badge.title}
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed">
                {badge.subtitle}
              </p>
              <div className="pt-2 text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Terverifikasi Rimba Siaga Edukasi</span>
              </div>
            </motion.div>
          )}

          <RimbaMascot mood={mascotMood} speech={mascotSpeech} size="md" />

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm inline-flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Kuis
            </button>

            {nextSlug && nextTitle && (
              <Link
                to={`/isu/${nextSlug}`}
                className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Lanjut Materi: {nextTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/simulasi"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Uji di Lab Simulasi
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
