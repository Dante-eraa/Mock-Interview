import { db } from "@/config/FIrebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import CustomBreadcrum from "@/components/CustomBreadcrum";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Lightbulb, Mic, Video, WebcamIcon } from "lucide-react";
import Headings from "@/components/Headings";
import Webcam from "react-webcam";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QuestionForm from "@/components/QuestionForm";

const MockInterviewStartPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          setIsLoading(true);
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));

          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[60vh]" />;
  }
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadcrum
        breadCrumPage="Start"
        breadCrumpItems={[
          {
            label: "Mock Interviews",
            link: "/generate",
          },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />
      <div className="flex items-center justify-between">
        <Headings title={`${interview?.position} Mock Interview`} />
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <WebcamIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="w-full h-[250px]  flex flex-col items-center justify-center border bg-gray-50 rounded-md">
              {isWebCamEnabled ? (
                <Webcam
                  onUserMedia={() => setIsWebCamEnabled(true)}
                  onUserMediaError={() => setIsWebCamEnabled(false)}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <WebcamIcon className="w-52 h-52 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center justify-center mt-2">
              <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
                {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full">
        <Alert className="bg-sky-100 border-sky-500 text-sky-600">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-4 h-4 text-sky-900" />
            <AlertTitle className="text-sky-900">
              AI Mock Interview Alert
            </AlertTitle>
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <Video className="text-sky-600 w-5 h-5" />
            <AlertTitle className="text-sky-600">Enable Webcam &</AlertTitle>
            <Mic className=" text-sky-600 w-5 h-5" />
            <AlertTitle className="text-sky-600">Microphone</AlertTitle>
          </div>
          <AlertDescription className="mt-3">
            To get the best experience in your AI mock interview, please enable
            your webcam and microphone. Ensuring both devices are active will
            allow smooth communication and real-time analysis of your responses.
            This will help provide accurate feedback and improve your interview
            preparation effectively.
          </AlertDescription>
        </Alert>
      </div>
      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionForm
            questions={interview?.questions}
            isWebCamEnabled={isWebCamEnabled}
            setIsWebCamEnabled={setIsWebCamEnabled}
          />
        </div>
      )}
    </div>
  );
};

export default MockInterviewStartPage;
