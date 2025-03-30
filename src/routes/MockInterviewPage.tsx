import { db } from "@/config/FIrebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import LoaderPage from "./LoaderPage";
import CustomBreadcrum from "@/components/CustomBreadcrum";
import { Button } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import InterviewPin from "@/components/InterviewPin";

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
    </div>
  );
};

export default MockInterviewPage;
