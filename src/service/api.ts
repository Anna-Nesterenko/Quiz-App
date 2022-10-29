import { shuffleArray } from "../utils/utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
// export const EASY = "EASY" as "EASY";
// export const MEDIUM = "MEDIUM" as "MEDIUM";
// export const HARD = "HARD" as "HARD";
// export const difficulties: Difficulty[] = [EASY, MEDIUM, HARD];
// export type Difficulty = typeof EASY | typeof MEDIUM | typeof HARD;

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
