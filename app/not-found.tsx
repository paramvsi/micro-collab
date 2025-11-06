import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center">
            <div className="relative">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                404
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-lg text-slate-400 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been
            moved or doesn't exist.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <p className="text-sm text-slate-400 mb-3">
              Try searching for what you need:
            </p>
            <Link href="/dashboard">
              <div className="relative flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-md hover:border-emerald-500/50 transition-colors cursor-pointer">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-400">
                  Search requests, users, skills...
                </span>
                <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-700 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Link>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-400 mb-4">Popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link
              href="/dashboard/browse"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Browse Requests
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/dashboard/discover"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Discover Experts
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/dashboard/my-requests"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              My Requests
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/help"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
