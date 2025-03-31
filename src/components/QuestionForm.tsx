import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./ToolTipButton";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "./RecordAnswer";

interface QuestionFormProps {
  questions: { question: string; answer: string }[];
  isWebCamEnabled: boolean;
  setIsWebCamEnabled: (value: boolean) => void;
}

const QuestionForm = ({
  questions,
  isWebCamEnabled,
  setIsWebCamEnabled,
}: QuestionFormProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (question: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(question);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full min-h-96 border rounded-md p-4">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-12"
        orientation="vertical"
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
          {questions?.map((eachTab, id) => {
            return (
              <TabsTrigger
                key={id}
                className={cn(
                  "data-[state=active]:bg-sky-300 data-[state=active]:shadow-md text-xs px-2"
                )}
                value={eachTab.question}
              >{`Question - ${id + 1}`}</TabsTrigger>
            );
          })}
        </TabsList>
        {questions?.map((eachTab, id) => {
          return (
            <TabsContent value={eachTab.question} key={id}>
              <p className="text-base text-left tracking-wide text-neutral-500">
                {eachTab.question}
              </p>
              <div className="w-full flex items-center justify-end">
                <TooltipButton
                  content={isPlaying ? "Stop" : "Start"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                    ) : (
                      <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                    )
                  }
                  onClick={() => handlePlayQuestion(eachTab.question)}
                />
              </div>
              <RecordAnswer
                question={eachTab}
                isWebCamEnabled={isWebCamEnabled}
                setIsWebCamEnabled={setIsWebCamEnabled}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default QuestionForm;
