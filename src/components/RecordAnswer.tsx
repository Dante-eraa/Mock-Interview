import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import { TooltipButton } from "./ToolTipButton";
import { CircleStop, Loader, Mic, RefreshCcw, Save } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import ChatSession from "@/scripts";
interface RecordAnswerProps {
  question: { question: string; answer: string };
}

interface AiResponse {
  ratings: number;
  feeback: string;
}

const RecordAnswer = ({ question }: RecordAnswerProps) => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AiResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams<{ interviewId: string }>();

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });
        return;
      }
      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );
      console.log(aiResult);
      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  const cleanAIResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/gi, "");
    const jsonMatch = cleanText.match(/\{.*\}|\[.*\]/s);

    if (!jsonMatch) {
      throw new Error(
        "Failed to retrieve a valid JSON object from the response."
      );
    }

    cleanText = jsonMatch[0];

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AiResponse> => {
    setIsAIGenerating(true);
    const prompt = `
    Question: "${qst}"
    User Answer: "${userAns}"
    Correct Answer: "${qstAns}"
    Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
    Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
  `;
    try {
      const aiResult = await ChatSession.sendMessage(prompt);

      const parsedResult: AiResponse = cleanAIResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "An error occured while generating feedback",
      });
      return { ratings: 0, feeback: "Unable to generate feedback" };
    } finally {
      setIsAIGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      <div className="flex items-center justify-center gap-3">
        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content="Record Again"
          icon={<RefreshCcw className="min-w-5 min-h-5" />}
          onClick={recordNewAnswer}
        />
        <TooltipButton
          content="Save Result"
          icon={
            isAIGenerating ? (
              <Loader
                className="min-w-5
                min-h-5 animate-spin"
              />
            ) : (
              <Save className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setOpen(!open)}
          disbaled={!aiResult}
        />
      </div>
      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold"> Your Answer</h2>
        <p className="whitespace-normal text-sm mt-2 text-gray-700">
          {userAnswer || "Start recording to see your answer here"}
        </p>
        {interimResult && (
          <p className="text-sm text-gray-500 mt-2">
            <strong>Current Speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordAnswer;
