import { useState } from "react";
import { Link } from "../../router";
import { QuizQuestion } from "../../data/issuesData";
import RimbaMascot, { RimbaMood } from "../mascot/RimbaMascot";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";

interface QuizSectionProps {
  quiz: QuizQuestion[];
  issueTitle: string;
  nextSlug?: string;
  nextTitle?: string;
}

export default function QuizSection({ quiz, issueTitle, nextSlug, nextTitle }: QuizSectionProps) {
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

  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return; // Prevent changing after answered

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
        setMascotSpeech(`Luar biasa! Skor kamu ${score}/100. Kamu punya wawasan tangguh bencana!`);
      } else {
        setMascotMood("wave");
        setMascotSpeech(`Skor kamu ${score}/100. Tidak apa-apa, kamu bisa coba lagi kapan saja!`);
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

  return (
    <div className="rounded-3xl bg-white border border-emerald-900/10 shadow-2xl p-6 sm:p-10 my-12">
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
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Pertanyaan</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-800 text-white font-mono font-black text-sm">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        )}
      </div>

      {/* Main Quiz Body */}
      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          {/* Question & Options Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                Soal #{currentIndex + 1}
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
              <div
                className={`p-5 rounded-2xl border-2 animate-in fade-in duration-200 ${
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
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                  >
                    <span>{currentIndex + 1 < totalQuestions ? "Lanjut Soal Berikutnya" : "Lihat Hasil Kuis"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Mascot Reactions */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <RimbaMascot mood={mascotMood} speech={mascotSpeech} size="lg" />
          </div>
        </div>
      ) : (
        /* Results & Completion Summary */
        <div className="py-10 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-lg">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-1">
              Hasil Belajar Kamu
            </span>
            <h4 className="text-3xl font-black text-slate-900 font-['Fredoka']">
              Skor Pemahaman: {calculateScore()}%
            </h4>
            <p className="text-slate-600 text-sm mt-2">
              {calculateScore() >= 70
                ? "Hebat! Kamu telah menguasai prinsip mitigasi hidrometeorologi dengan sangat baik."
                : "Kerja bagus! Teruslah membaca dan berlatih agar semakin siap menghadapi bahaya."}
            </p>
          </div>

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
                className="px-6 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <span>Lanjut Materi: {nextTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/simulasi"
              className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm inline-flex items-center gap-2 shadow-md transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Uji di Lab Simulasi
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
