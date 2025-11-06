"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <div className="absolute inset-0 bg-red-500/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold text-white">Something Went Wrong</h1>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            We're sorry, but something unexpected happened. The error has been
            logged and we'll look into it.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-left max-w-lg mx-auto">
              <p className="text-xs font-mono text-red-400 mb-2">
                Development Error Details:
              </p>
              <p className="text-xs font-mono text-slate-400 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-slate-500 mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={reset}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Support Link */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-400 mb-4">
            If the problem persists, please contact support
          </p>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Link href="/help">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
