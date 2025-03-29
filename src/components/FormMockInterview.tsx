import { Interview } from "@/types";
import CustomBreadcrum from "./CustomBreadcrum";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { EOF } from "dns";
import { toast } from "sonner";
import Headings from "./Headings";

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

type FormData = z.infer<typeof formSchema>;

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  const { isValid, isSubmitted } = form.formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData?.position
    ? initialData?.position
    : "Create a new Mock Interview";

  const breadCrumPage = initialData?.position ? "Edit" : "Create";

  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated ... !", description: "Changes saved successfully..." }
    : { title: "Created ... !", description: "Created successfully..." };

  const onSubmitHandler = async (data: FormData) => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
      toast.error("Error...", {
        description: "Something went wrong. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadcrum
        breadCrumPage={breadCrumPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />
      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />
      </div>
    </div>
  );
};

export default FormMockInterview;
