import { db } from "@/config/FIrebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import CustomBreadcrum from "@/components/CustomBreadcrum";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Lightbulb, Mic, Video, WebcamIcon } from "lucide-react";
import InterviewPin from "@/components/InterviewPin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Webcam from "react-webcam";

const MockInterviewPage = () => {
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
      <div className="flex items-center justify-between w-full gap2">
        <CustomBreadcrum
          breadCrumPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />
        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"} className="bg-sky-400 hover:bg-sky-500">
            Start <ArrowBigRight />
          </Button>
        </Link>
      </div>
      {interview && <InterviewPin interview={interview} onMockPage />}
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
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border bg-gray-50 rounded-md">
          {isWebCamEnabled ? (
            <Webcam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};

export default MockInterviewPage;
