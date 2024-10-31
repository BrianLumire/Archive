import { Button } from "@/components/ui/button";
import { FrownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const LoadingUI = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <span className="loader"></span>
      <span>
        <h1 className="text-center text-2xl font-semibold text-primary">
          Loading...
        </h1>
      </span>
    </div>
  );
};
export const PageLoading = () => {
  return (
    <div className="h-full min-h-[calc(100vh-100px)] w-full flex flex-col justify-center items-center">
      <span className="loader"></span>
      <span>
        <h1 className="text-center text-2xl font-semibold text-primary">
          Loading...
        </h1>
      </span>
    </div>
  );
};
export default function NotFoundUI(props: { title: string; message: string }) {
  const router = useRouter();
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <FrownIcon className="h-16 w-16 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {props.title}
        </h1>
        <p className="max-w-[500px] text-gray-500 dark:text-gray-400">
          {props.message}
        </p>
      </div>
      <Button
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        onClick={() => router.back()}
      >
        Go to Back
      </Button>
    </div>
  );
}
