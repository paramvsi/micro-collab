"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, FileText, User, Hash, Clock, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  type: "request" | "user" | "skill";
  title: string;
  description?: string;
  link: string;
  metadata?: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mock search data - replace with real API
const mockSearchData: SearchResult[] = [
  {
    id: "1",
    type: "request",
    title: "Help with React Performance Optimization",
    description: "Need expert help optimizing a large React application",
    link: "/dashboard/requests/1",
    metadata: "12 offers • 145 views",
    icon: FileText,
  },
  {
    id: "2",
    type: "request",
    title: "TypeScript Generic Type Issue",
    description: "Struggling with complex generic types in TypeScript",
    link: "/dashboard/requests/2",
    metadata: "5 offers • 89 views",
    icon: FileText,
  },
  {
    id: "3",
    type: "user",
    title: "Sarah Chen",
    description: "React & Performance Expert • 5+ years experience",
    link: "/dashboard/users/sarah-chen",
    metadata: "4.9★ • 48 sessions",
    icon: User,
  },
  {
    id: "4",
    type: "user",
    title: "Alex Johnson",
    description: "Full-stack Developer • TypeScript specialist",
    link: "/dashboard/users/alex-johnson",
    metadata: "5.0★ • 32 sessions",
    icon: User,
  },
  {
    id: "5",
    type: "skill",
    title: "React",
    description: "146 experts • 234 active requests",
    link: "/dashboard/browse?skill=react",
    metadata: "Most popular",
    icon: Hash,
  },
  {
    id: "6",
    type: "skill",
    title: "TypeScript",
    description: "128 experts • 189 active requests",
    link: "/dashboard/browse?skill=typescript",
    metadata: "Trending",
    icon: Hash,
  },
];

const recentSearches = [
  { id: "r1", query: "React performance", link: "/dashboard/browse?q=react+performance" },
  { id: "r2", query: "Database design", link: "/dashboard/browse?q=database+design" },
  { id: "r3", query: "API architecture", link: "/dashboard/browse?q=api+architecture" },
];

const typeColors = {
  request: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  user: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  skill: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const typeLabels = {
  request: "Request",
  user: "User",
  skill: "Skill",
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Search logic
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    // Filter mock data based on query
    const filtered = mockSearchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        window.location.href = results[selectedIndex].link;
        setOpen(false);
      }
    },
    [results, selectedIndex]
  );

  const handleResultClick = (link: string) => {
    setOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 bg-slate-800 border-slate-700 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <Search className="h-5 w-5 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search requests, users, skills..."
            className="flex-1 border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-700 bg-slate-900 px-1.5 font-mono text-[10px] font-medium text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {query === "" ? (
            // Recent Searches
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                <Clock className="h-4 w-4" />
                Recent Searches
              </div>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <Link
                    key={search.id}
                    href={search.link}
                    onClick={() => handleResultClick(search.link)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors group"
                  >
                    <Search className="h-4 w-4 text-slate-500 group-hover:text-slate-400" />
                    <span className="text-sm text-slate-300 group-hover:text-white">
                      {search.query}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Popular Searches */}
              <div className="flex items-center gap-2 text-sm font-medium text-slate-400 pt-4">
                <TrendingUp className="h-4 w-4" />
                Trending Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "Python", "AWS"].map((skill) => (
                  <Link
                    key={skill}
                    href={`/dashboard/browse?skill=${skill.toLowerCase()}`}
                    onClick={() => handleResultClick(`/dashboard/browse?skill=${skill.toLowerCase()}`)}
                  >
                    <Badge
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            // No Results
            <div className="p-12 text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                <Search className="h-6 w-6 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400">
                No results found for "{query}"
              </p>
            </div>
          ) : (
            // Search Results
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = result.icon;
                const isSelected = index === selectedIndex;
                return (
                  <Link
                    key={result.id}
                    href={result.link}
                    onClick={() => handleResultClick(result.link)}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      isSelected
                        ? "bg-slate-700"
                        : "hover:bg-slate-700/50"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                        typeColors[result.type]
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white truncate">
                          {result.title}
                        </p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${typeColors[result.type]}`}
                        >
                          {typeLabels[result.type]}
                        </Badge>
                      </div>
                      {result.description && (
                        <p className="text-xs text-slate-400 line-clamp-1 mb-1">
                          {result.description}
                        </p>
                      )}
                      {result.metadata && (
                        <p className="text-xs text-slate-500">
                          {result.metadata}
                        </p>
                      )}
                    </div>

                    {/* Enter hint */}
                    {isSelected && (
                      <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-600 bg-slate-700 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                        ↵
                      </kbd>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">
                ↵
              </kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800">
                ESC
              </kbd>
              <span>Close</span>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            {results.length > 0 && `${results.length} results`}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
