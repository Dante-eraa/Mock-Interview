import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import { TooltipButton } from "./ToolTipButton";
import { CircleStop, Mic, Webcam } from "lucide-react";
import { toast } from "sonner";
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
    }
    if (userAnswer?.length < 30) {
      toast.error("Error", {
        description: "Your answer should be more than 30 characters",
      });
      return;
    } else {
      startSpeechToText();
    }
  };

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
      </div>
    </div>
  );
};

export default RecordAnswer;
