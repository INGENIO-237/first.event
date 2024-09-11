import Loading from "@/components/Loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Loading/>}>
    <div className="text-2xl flex items-center justify-center w-full h-full min-h-screen">
      Home
    </div>
  </Suspense>
  );
}
