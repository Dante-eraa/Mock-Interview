import { Interview } from "@/types";
import CustomBreadcrum from "./CustomBreadcrum";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import Headings from "./Headings";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
    <div className="w-full flex flex-col space-y-4">
      <CustomBreadcrum
        breadCrumPage={breadCrumPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />
      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />
        {initialData && (
          <Button size={"icon"} variant={"destructive"}>
            <Trash2 className="min-w-4 min-h-4" />
          </Button>
        )}
      </div>
      <Separator className="my-4" />

      <div className="my-6">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md"
          >
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <FormLabel className="text-xl">
                      Job Role / Job Position
                    </FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="h-12 "
                      placeholder="ex - Data Analyst"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <FormLabel className="text-xl">Job Description</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      className="h-12 "
                      placeholder="ex - Describe your job role or position"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="w-full space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <FormLabel className="text-xl">Experience</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      className="h-12 "
                      placeholder="ex - How many years of experience have in this field"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem className="w-full space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <FormLabel className="text-xl">Tech Stacks</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      className="h-12 "
                      placeholder="ex - How many years of experience have in this field"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FormMockInterview;
