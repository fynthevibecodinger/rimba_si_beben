import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Sprout, Check, X, ArrowRight, RotateCcw } from "lucide-react";
import RimbaMascot from "../mascot/RimbaMascot";
import quizCases from "../../data/quizCases";

export default function QuizConsole({
  quizIndex,
  quizAnswers,
  lastAnswer,
  setLastAnswer,
  answerQuiz,
  nextQuestion,
  setQuizIndex,
  setQuizAnswers,
  setMood,
  mood,
}) {
  const caseData = quizCases[quizIndex];

  return (
    <div className="quiz-console" data-reveal>
      <div className="console-top">
        <span>SKENARIO 0{quizIndex + 1} / 03</span>
        <div>
          {quizCases.map((_, index) => (
            <i key={index} className={index <= quizIndex ? "active" : ""} />
          ))}
        </div>
      </div>
      <div className="case-location">
        <span>
          <Sprout />
        </span>
        <div>
          <small>LOKASI MISI</small>
          <strong>{caseData.place}</strong>
        </div>
      </div>
      <h3>{caseData.question}</h3>
      <div className="case-options">
        {caseData.choices.map((choice, index) => {
          const selected = lastAnswer === index;
          const correct = index === caseData.answer;
          return (
            <button
              key={choice}
              className={selected ? (correct ? "correct" : "wrong") : ""}
              onClick={() => answerQuiz(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{choice}</strong>
              {selected && (correct ? <Check /> : <X />)}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {lastAnswer !== null && (
          <motion.div
            className={`answer-note ${lastAnswer === caseData.answer ? "good" : ""}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div>
              <RimbaMascot
                mood={lastAnswer === caseData.answer ? "celebrate" : "idle"}
              />
            </div>
            <p>
              <strong>
                {lastAnswer === caseData.answer ? "Strategi tangguh!" : "Belum seimbang."}
              </strong>
              <span>
                {lastAnswer === caseData.answer
                  ? "Kamu memadukan data modern dan daya pulih alam."
                  : "Cari pilihan yang menggabungkan teknologi dan solusi alam."}
              </span>
            </p>
            {lastAnswer === caseData.answer && quizIndex < 2 ? (
              <button onClick={nextQuestion}>
                Misi berikutnya <ArrowRight />
              </button>
            ) : lastAnswer !== caseData.answer ? (
              <button onClick={() => setLastAnswer(null)}>
                <RotateCcw /> Coba lagi
              </button>
            ) : (
              <a href="#pledge">
                Ambil ikrar <ArrowRight />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
