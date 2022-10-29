import { useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import { fetchQuiz, QuestionState, Difficulty } from "../../service/api";
import { GlobalStyle, Wrapper } from "./App.styled";

export type AnswerType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    try {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuiz(TOTAL_QUESTIONS, Difficulty.EASY);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextStep = number + 1;

    if (nextStep === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextStep);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz Game</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <button className="start-btn" onClick={startQuiz}>
              Start
            </button>
            <select name="select">
              <option value="EASY" selected>
                easy
              </option>
              <option value="MEDIUM">medium</option>
              <option value="HARD">hard</option>
            </select>
          </>
        ) : null}
        {!gameOver ? <p className="score-txt">Score: {score}</p> : null}
        {loading && <p>Loading questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callBack={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next-btn" onClick={nextQuestion}>
            Next question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
