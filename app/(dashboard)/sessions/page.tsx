"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Video, User, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - replace with real data hooks
const mockSessions = [
  {
    id: "1",
    title: "React Performance Optimization Session",
    requester: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg", initials: "SC" },
    helper: { name: "Mike Wilson", avatar: "/avatars/mike.jpg", initials: "MW" },
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    duration: 2,
    status: "scheduled",
    platform: "Google Meet",
    category: "React",
    price: 80,
  },
  {
    id: "2",
    title: "TypeScript Generics Deep Dive",
    requester: { name: "Alex Johnson", avatar: "/avatars/alex.jpg", initials: "AJ" },
    helper: { name: "Emily Davis", avatar: "/avatars/emily.jpg", initials: "ED" },
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    duration: 1.5,
    status: "upcoming",
    platform: "Zoom",
    category: "TypeScript",
    price: 60,
  },
  {
    id: "3",
    title: "Database Schema Review",
    requester: { name: "John Doe", avatar: "/avatars/john.jpg", initials: "JD" },
    helper: { name: "Maria Garcia", avatar: "/avatars/maria.jpg", initials: "MG" },
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    duration: 2,
    status: "completed",
    platform: "Google Meet",
    category: "Database",
    price: 100,
    rating: 5,
    feedback: "Excellent session! Very helpful insights.",
  },
  {
    id: "4",
    title: "CI/CD Pipeline Setup",
    requester: { name: "Tom Brown", avatar: "/avatars/tom.jpg", initials: "TB" },
    helper: { name: "Lisa Anderson", avatar: "/avatars/lisa.jpg", initials: "LA" },
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    duration: 3,
    status: "completed",
    platform: "Zoom",
    category: "DevOps",
    price: 120,
    rating: 4,
  },
  {
    id: "5",
    title: "React Native Navigation Issue",
    requester: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg", initials: "SC" },
    helper: { name: "David Lee", avatar: "/avatars/david.jpg", initials: "DL" },
    scheduledFor: new Date(),
    duration: 1,
    status: "in_progress",
    platform: "Google Meet",
    category: "React Native",
    price: 50,
  },
];

const statusConfig = {
  scheduled: { color: "info" as const, label: "Scheduled" },
  upcoming: { color: "warning" as const, label: "Upcoming" },
  in_progress: { color: "success" as const, label: "In Progress" },
  completed: { color: "default" as const, label: "Completed" },
  cancelled: { color: "error" as const, label: "Cancelled" },
};

export default function SessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.helper.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "upcoming") {
      return matchesSearch && (session.status === "scheduled" || session.status === "upcoming");
    }
    if (activeTab === "active") return matchesSearch && session.status === "in_progress";
    if (activeTab === "completed") return matchesSearch && session.status === "completed";

    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Sessions</h1>
          <p className="text-slate-400 mt-1">
            Manage your scheduled and past collaboration sessions
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Sessions Grid */}
          {filteredSessions.length === 0 ? (
            <Card variant="glass" className="p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">No sessions found</h3>
                  <p className="text-slate-400 text-sm">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "You don't have any sessions yet"}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSessions.map((session) => (
                <Card key={session.id} variant="interactive" className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge variant={statusConfig[session.status as keyof typeof statusConfig].color}>
                        {statusConfig[session.status as keyof typeof statusConfig].label}
                      </Badge>
                      <span className="text-xs text-slate-400">{session.category}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{session.title}</CardTitle>
                    <CardDescription className="space-y-2 mt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-3 w-3" />
                        <span className="text-slate-300">
                          {session.requester.name} & {session.helper.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(session.scheduledFor)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{session.duration} hour{session.duration !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Video className="h-3 w-3" />
                        <span>{session.platform}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {session.status === "completed" && session.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-amber-400">{"★".repeat(session.rating)}</span>
                        <span className="text-slate-400">{"★".repeat(5 - session.rating)}</span>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-emerald-400">${session.price}</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/sessions/${session.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
