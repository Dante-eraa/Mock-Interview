import { Interview } from "@/types";
import CustomBreadcrum from "./CustomBreadcrum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Postition is required")
    .max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  return <div className="w-full flex-col space-y-4"></div>;
};

export default FormMockInterview;
