import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};
export default function NotFound() {
  return (
    <main className="m-auto">
      <div className="text-center flex-col min-h-screen flex flex-grow items-center justify-center">
        <h1 className="mb-4 text-6xl font-semibold text-first_violet">404</h1>
        <p className="mb-4 text-lg text-gray-600">
          Oops! Looks like you&#39;re lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-first_orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let&#39;s get you back{" "}
          <Link href={"/"} className="text-primary">
            home
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
