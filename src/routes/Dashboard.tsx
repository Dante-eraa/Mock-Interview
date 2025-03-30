import Headings from "@/components/Headings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/config/FIrebase.config";
import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import NotFound from "@/assets/svg/Notfound.webp";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import InterviewPin from "@/components/InterviewPin";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    setLoading(true);

    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    const unsubcribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        const interviewList: Interview[] = snapshot.docs.map((eachDoc) => {
          const id = eachDoc.id;
          return {
            id,
            ...eachDoc.data(),
          };
        }) as Interview[];
        setInterviews(interviewList);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        toast.error("Error..", {
          description: "Something went wrong. Please try again later..",
        });
        setLoading(false);
      }
    );

    return () => unsubcribe();
  }, [userId]);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Headings
          title="Dashboard"
          description="Create and start your AI Mock Interview"
        />

        <Link to={"/generate/create"}>
          <Button size={"sm"}>
            <Plus /> Add Now
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div className="md:grid grid-cols-3 gap-3 py-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, id) => {
            return <Skeleton key={id} className="h-24 md:h-32 rounded-md" />;
          })
        ) : interviews.length > 0 ? (
          interviews.map((eachInterview) => {
            return (
              <InterviewPin key={eachInterview.id} interview={eachInterview} />
            );
          })
        ) : (
          <div className="col-span-3 flex flex-col text-center items-center justify-center ">
            <img src={NotFound} className="max-w-[250px]" alt="No Data Found" />
            <Headings
              title="No Data Found"
              description="Create your new mock interview"
            />
            <Link to={"/generate/create"} className="mt-4">
              <Button size={"sm"}>
                <Plus /> Add Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
