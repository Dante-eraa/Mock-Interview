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
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ChatSession from "@/scripts";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/FIrebase.config";

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

  const { isValid, isSubmitting } = form.formState;
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
    : {
        title: "Created ... !",
        description: "New Interview Created successfully...",
      };

  const cleanAIResponse = (responseText: string) => {
    let cleanText = responseText.trim();
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    const jsonArrayMatch = cleanText.match(/\[.*\]/s);

    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error(
        "Failed to retrieve a valid JSON array from the response."
      );
    }

    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generativeAIResponse = async (data: FormData) => {
    const prompt = `
    As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

    [
      { "question": "<Question text>", "answer": "<Answer text>" },
      ...
    ]

    Job Information:
    - Job Position: ${data?.position}
    - Job Description: ${data?.description}
    - Years of Experience Required: ${data?.experience}
    - Tech Stacks: ${data?.techStack}

    The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
    `;
    const aiResult = await ChatSession.sendMessage(prompt);
    const cleanResponse = cleanAIResponse(aiResult.response.text());

    return cleanResponse;
  };

  const onSubmitHandler = async (data: FormData) => {
    try {
      setLoading(true);
      if (initialData) {
        if (isValid) {
          const aiResult = await generativeAIResponse(data);
          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: aiResult,
            ...data,
            updateAt: serverTimestamp(),
          });
          toast.success(toastMessage.title, {
            description: toastMessage.description,
          });
        }
      } else {
        if (isValid) {
          const aiResult = await generativeAIResponse(data);

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });

          toast.success(toastMessage.title, {
            description: toastMessage.description,
          });
        }
      }
      navigate("/generate", { replace: true });
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
                      value={field.value || ""}
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
                      value={field.value || ""}
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
                      value={field.value || ""}
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
                      placeholder="ex - Data Science, React.."
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-end gap-6">
              <Button
                type="reset"
                size={"sm"}
                disabled={isSubmitting || loading}
                variant={"outline"}
              >
                Reset
              </Button>

              <Button
                type="submit"
                size={"sm"}
                disabled={isSubmitting || loading || !isValid}
              >
                {loading ? (
                  <Loader className="text-gray-50 animate-spin" />
                ) : (
                  actions
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FormMockInterview;
