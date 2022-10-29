import { AnswerType } from "../App/App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styled";

type Props = {
  question: string;
  answers: string[];
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerType | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard = ({
  question,
  answers,
  callBack,
  userAnswer,
  questionNumber,
  totalQuestions,
}: Props) => {
  return (
    <Wrapper>
      <p className="QuestionNumber">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            key={answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callBack}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
