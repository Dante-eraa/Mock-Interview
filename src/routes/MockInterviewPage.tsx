import { db } from "@/config/FIrebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import CustomBreadcrum from "@/components/CustomBreadcrum";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Lightbulb, Mic, Video } from "lucide-react";
import InterviewPin from "@/components/InterviewPin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

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
            Important Information
          </AlertTitle>
        </div>
        <div className="flex items-center gap-2 px-2 py-2">
          <Video className="text-sky-600 w-5 h-5" />
          <AlertTitle className="text-sky-600">Enable Webcam &</AlertTitle>
          <Mic className=" text-sky-600 w-5 h-5" />
          <AlertTitle className="text-sky-600">Microphone</AlertTitle>
        </div>
        <AlertDescription className="mt-3">
          To proceed with the AI mock interview, please allow access to your
          webcam and microphone.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MockInterviewPage;
