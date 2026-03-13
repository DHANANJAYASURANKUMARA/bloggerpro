"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Critical System Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800 text-center space-y-6">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">System Interruption</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {error.message.includes("Can't reach database") 
              ? "The database is currently offline or unreachable. Please verify your local connection settings."
              : "Something unexpected happened. We've logged the incident and are looking into it."}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all active:scale-95"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>
        </div>

        {error.digest && (
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
