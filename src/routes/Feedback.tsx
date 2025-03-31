import { db } from "@/config/FIrebase.config";
import { Interview, UserAnswer } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LoaderPage from "./LoaderPage";
import CustomBreadcrum from "@/components/CustomBreadcrum";
import Headings from "@/components/Headings";
import { cn } from "@/lib/utils";
import InterviewPin from "@/components/InterviewPin";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { CircleCheck, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  console.log(interviewId);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeId, setActiveId] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      navigate("/generate", { replace: true });
    } else {
      const fetchInterview = async () => {
        if (interviewId) {
          try {
            setLoading(true);
            const interviewDoc = await getDoc(
              doc(db, "interviews", interviewId)
            );

            if (interviewDoc.exists()) {
              setInterview({
                id: interviewDoc.id,
                ...interviewDoc.data(),
              } as Interview);
            }
          } catch (error) {
            console.log(error);
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }
      };

      const fetchFeedbacks = async () => {
        setLoading(true);
        try {
          const querySnapRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );
          const querySnap = await getDocs(querySnapRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((eachDoc) => {
            return { id: eachDoc.id, ...eachDoc.data() } as UserAnswer;
          });
          setFeedbacks(interviewData);
        } catch (error) {
          console.log(error);
          toast.error("Error", {
            description: "Something went wrong. Please try again later.",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) {
      return "0.0";
    }
    const totalRatings = feedbacks.reduce(
      (acc, feedbacks) => acc + feedbacks.rating,
      0
    );
    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (loading) {
    return <LoaderPage className="w-full h-[60vh]" />;
  }

  return (
    <div className="flex flex-col gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadcrum
          breadCrumPage="Feedback"
          breadCrumpItems={[
            {
              label: "Mock Interview",
              link: "/generate",
            },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>
      <Headings
        title="Interview Analysis"
        description="Get AI-driven insights on your responses, ratings, and personalized feedback. Analyze your performance, understand improvement areas, and refine your answers for better results in future interviews."
      />
      <p className="text-base text-muted-foreground">
        Overall Performance Summary{" "}
        <span
          className={cn(
            "font-semibold text-xl",
            parseFloat(overAllRating) < 3 ? "text-red-500" : "text-emerald-500"
          )}
        >
          {overAllRating} / 10
        </span>
      </p>
      {interview && <InterviewPin interview={interview} onMockPage />}
      <Headings title="Interview Feedback" isSubHeading />
      {feedbacks && (
        <Accordion type="single" collapsible className="space-y-6">
          {feedbacks.map((feed) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className="border rounded-lg shadow-md"
            >
              <AccordionTrigger
                onClick={() => setActiveId(feed.id)}
                className={cn(
                  "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
                  activeId === feed.id
                    ? "bg-gradient-to-r from-purple-50 to-blue-50"
                    : "hover:bg-gray-50"
                )}
              >
                <span>{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                <div className="text-lg font-semibold to-gray-700">
                  <Star className="inline mr-2 text-yellow-400" />
                  Rating : {feed.rating}
                </div>

                <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center">
                    <CircleCheck className="mr-2 text-green-600" />
                    Expected Answer
                  </CardTitle>

                  <CardDescription className="font-medium text-gray-700">
                    {feed.correct_ans}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-4 bg-blue-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center">
                    <CircleCheck className="mr-2 text-blue-600" />
                    Your Answer
                  </CardTitle>

                  <CardDescription className="font-medium text-gray-700">
                    {feed.user_ans}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center">
                    <CircleCheck className="mr-2 text-red-600" />
                    Feedback
                  </CardTitle>

                  <CardDescription className="font-medium text-gray-700">
                    {feed.feedback}
                  </CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Feedback;
