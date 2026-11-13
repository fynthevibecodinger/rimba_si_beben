import { Award } from "lucide-react";
import QuizConsole from "../components/mission/QuizConsole";

export default function Mission({
  quizIndex,
  quizAnswers,
  lastAnswer,
  setLastAnswer,
  answerQuiz,
  nextQuestion,
  setQuizIndex,
  setQuizAnswers,
  mood,
  setMood,
}) {
  return (
    <section className="mission-section page-shell" id="mission">
      <div className="mission-copy" data-reveal>
        <span className="section-tag">
          <Award /> MISI PENYELAMAT EKOSISTEM
        </span>
        <h2>
          Bisakah kamu
          <br />
          menyelamatkan <em>3 wilayah?</em>
        </h2>
        <p>
          Pilih kombinasi teknologi hijau dan solusi alam yang paling efektif untuk setiap
          skenario.
        </p>
      </div>
      <QuizConsole
        quizIndex={quizIndex}
        quizAnswers={quizAnswers}
        lastAnswer={lastAnswer}
        setLastAnswer={setLastAnswer}
        answerQuiz={answerQuiz}
        nextQuestion={nextQuestion}
        setQuizIndex={setQuizIndex}
        setQuizAnswers={setQuizAnswers}
        setMood={setMood}
        mood={mood}
      />
    </section>
  );
}
