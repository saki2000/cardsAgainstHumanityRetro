import AnswerCard from "../GamePage/AnswerCard/AnswerCard";

interface Props {
  answerText: string;
  setAnswerText: (text: string) => void;
}

export default function AnswerDeck({ answerText, setAnswerText }: Props) {
  return (
    <div className="py-6 px-32 bg-gray-600 rounded-lg bottom-4 left-4 right-4 shadow-inner mb-14 mt-8 max-w-full">
      <AnswerCard answerText={answerText} setAnswerText={setAnswerText} />
    </div>
  );
}
