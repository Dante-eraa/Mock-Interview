import { Toaster } from "@/components/ui/sonner";

const ToastProvider = () => {
  return (
    <Toaster
      theme="light"
      richColors
      position="top-right"
      className="bg-stone-100 shadow-lg"
    />
  );
};

export default ToastProvider;
