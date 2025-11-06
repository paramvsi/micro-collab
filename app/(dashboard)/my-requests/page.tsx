"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Filter, Search, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - replace with real data hooks
const mockRequests = [
  {
    id: "1",
    title: "Help with React Performance Optimization",
    description: "Need expert help optimizing a large React application with rendering issues",
    status: "open",
    urgency: "high",
    category: "React",
    tags: ["React", "Performance", "Frontend"],
    offers: 12,
    views: 145,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: "2",
    title: "TypeScript Generic Type Issue",
    description: "Struggling with complex generic types in TypeScript for a library",
    status: "in_progress",
    urgency: "normal",
    category: "TypeScript",
    tags: ["TypeScript", "Types", "Advanced"],
    offers: 5,
    views: 89,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: "3",
    title: "Database Schema Design Review",
    description: "Looking for feedback on PostgreSQL schema design for multi-tenant app",
    status: "completed",
    urgency: "low",
    category: "Database",
    tags: ["PostgreSQL", "Database", "Schema"],
    offers: 8,
    views: 234,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
  },
];

const statusOptions = [
  { value: "all", label: "All Requests" },
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const urgencyColors = {
  low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  normal: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  high: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
} as const;

const statusColors = {
  open: "success" as const,
  in_progress: "warning" as const,
  completed: "info" as const,
  cancelled: "error" as const,
};

export default function MyRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter requests
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || request.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: mockRequests.length,
    open: mockRequests.filter((r) => r.status === "open").length,
    in_progress: mockRequests.filter((r) => r.status === "in_progress").length,
    completed: mockRequests.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Requests</h1>
          <p className="text-slate-400">
            Manage and track all your collaboration requests
          </p>
        </div>
        <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
          <Link href="/dashboard/requests/new">
            <Plus className="h-4 w-4 mr-2" />
            Post New Request
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-slate-400">Total Requests</div>
        </Card>
        <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">{stats.open}</div>
          <div className="text-sm text-slate-400">Open</div>
        </Card>
        <Card className="p-4 bg-amber-500/5 border-amber-500/20">
          <div className="text-2xl font-bold text-amber-400">{stats.in_progress}</div>
          <div className="text-sm text-slate-400">In Progress</div>
        </Card>
        <Card className="p-4 bg-cyan-500/5 border-cyan-500/20">
          <div className="text-2xl font-bold text-cyan-400">{stats.completed}</div>
          <div className="text-sm text-slate-400">Completed</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map((status) => (
            <Button
              key={status.value}
              variant={selectedStatus === status.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status.value)}
              className={
                selectedStatus === status.value
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {status.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length === 0 ? (
        <Card className="p-12 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
              <Search className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No requests found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || selectedStatus !== "all"
                ? "Try adjusting your filters or search query"
                : "Get started by posting your first request"}
            </p>
            {!searchQuery && selectedStatus === "all" && (
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                <Link href="/dashboard/requests/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Your First Request
                </Link>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card
              key={request.id}
              className="p-6 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Request Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <Link
                      href={`/dashboard/requests/${request.id}`}
                      className="flex-1 group"
                    >
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {request.title}
                      </h3>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-slate-800 border-slate-700"
                      >
                        <DropdownMenuItem
                          asChild
                          className="text-slate-200 focus:bg-slate-700"
                        >
                          <Link href={`/dashboard/requests/${request.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          asChild
                          className="text-slate-200 focus:bg-slate-700"
                        >
                          <Link href={`/dashboard/requests/${request.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Request
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:bg-slate-700 focus:text-red-300">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Request
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2">
                    {request.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {request.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {request.views} views
                    </div>
                    <div className="font-medium text-emerald-400">
                      {request.offers} offers
                    </div>
                    <div>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Status and Urgency */}
                <div className="flex sm:flex-col gap-2 sm:items-end">
                  <Badge
                    variant={statusColors[request.status as keyof typeof statusColors]}
                    className="capitalize"
                  >
                    {request.status.replace("_", " ")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`capitalize ${urgencyColors[request.urgency as keyof typeof urgencyColors]}`}
                  >
                    {request.urgency}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
