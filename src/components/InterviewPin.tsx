import { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./ToolTipButton";
import { Eye, Newspaper, Pencil, Trash2 } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

const InterviewPin = ({ interview, onMockPage = false }: InterviewPinProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  return (
    <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-300 cursor-pointer transition-all space-y-4">
      <CardTitle className="text-lg">{interview?.position}</CardTitle>
      <CardDescription className="text-xs">
        {interview?.description}
      </CardDescription>
      <div className="w-full flex items-center gap-3 flex-wrap">
        {interview.techStack.split(",").map((eachWord, id) => {
          return (
            <Badge
              variant={"outline"}
              key={id}
              className="text-xs text-muted-foreground hover:text-sky-900 hover:border-sky-100 hover:bg-sky-400"
            >
              {eachWord}
            </Badge>
          );
        })}
      </div>
      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-sm text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(interview.createdAt.toDate()).toLocaleDateString(
            "en-US",
            {
              dateStyle: "long",
            }
          )} - ${new Date(interview.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            {
              timeStyle: "short",
            }
          )}`}
        </p>
        {!onMockPage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="Edit"
              buttonVariant={"ghost"}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Pencil />}
              loading={false}
              onClick={() => {
                navigate(`/generate/${interview.id}`, { replace: true });
              }}
            />

            <TooltipButton
              content="View"
              buttonVariant={"ghost"}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
              onClick={() => {
                navigate(`/generate/${interview.id}`, { replace: true });
              }}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Newspaper />}
              loading={false}
              onClick={() => {
                navigate(`/generate/feedback/${interview.id}`, {
                  replace: true,
                });
              }}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default InterviewPin;
