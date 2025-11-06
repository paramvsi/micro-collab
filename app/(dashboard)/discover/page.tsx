"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, MapPin, Briefcase, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    initials: "SC",
    title: "React & Performance Expert",
    bio: "Specializing in React performance optimization and modern frontend architecture",
    location: "San Francisco, CA",
    rating: 4.9,
    sessionsCompleted: 48,
    responseTime: "< 1 hour",
    hourlyRate: 75,
    skills: ["React", "Performance", "TypeScript", "Next.js"],
    availability: "available",
  },
  {
    id: "2",
    name: "Alex Johnson",
    avatar: "/avatars/alex.jpg",
    initials: "AJ",
    title: "Full-Stack Developer",
    bio: "Building scalable web applications with modern JavaScript and TypeScript",
    location: "New York, NY",
    rating: 5.0,
    sessionsCompleted: 32,
    responseTime: "< 2 hours",
    hourlyRate: 100,
    skills: ["TypeScript", "Node.js", "React", "PostgreSQL"],
    availability: "available",
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    avatar: "/avatars/maria.jpg",
    initials: "MR",
    title: "Database Architect",
    bio: "Expert in database design, optimization, and scaling for high-traffic applications",
    location: "Austin, TX",
    rating: 4.8,
    sessionsCompleted: 56,
    responseTime: "< 3 hours",
    hourlyRate: 120,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    availability: "busy",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/avatars/david.jpg",
    initials: "DK",
    title: "DevOps Engineer",
    bio: "Kubernetes, AWS, and CI/CD specialist for modern cloud infrastructure",
    location: "Seattle, WA",
    rating: 4.7,
    sessionsCompleted: 41,
    responseTime: "< 4 hours",
    hourlyRate: 90,
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    availability: "available",
  },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "sessions", label: "Most Sessions" },
  { value: "responseTime", label: "Fastest Response" },
  { value: "rate", label: "Hourly Rate" },
];

const skillFilters = ["All", "React", "TypeScript", "Node.js", "Python", "AWS", "Database"];
const availabilityFilters = ["All", "Available", "Busy"];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // Filter and sort users
  let filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSkill =
      selectedSkill === "All" ||
      user.skills.some((skill) => skill.toLowerCase() === selectedSkill.toLowerCase());

    const matchesAvailability =
      selectedAvailability === "All" ||
      user.availability.toLowerCase() === selectedAvailability.toLowerCase();

    return matchesSearch && matchesSkill && matchesAvailability;
  });

  // Sort users
  filteredUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "sessions":
        return b.sessionsCompleted - a.sessionsCompleted;
      case "rate":
        return a.hourlyRate - b.hourlyRate;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Discover Experts</h1>
        <p className="text-slate-400">
          Find and connect with skilled collaborators in your field
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-emerald-400" />
            <div className="text-2xl font-bold text-white">{mockUsers.length}</div>
          </div>
          <div className="text-sm text-slate-400">Active Experts</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-4 w-4 text-amber-400" />
            <div className="text-2xl font-bold text-white">4.8</div>
          </div>
          <div className="text-sm text-slate-400">Avg Rating</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="h-4 w-4 text-cyan-400" />
            <div className="text-2xl font-bold text-white">177</div>
          </div>
          <div className="text-sm text-slate-400">Total Sessions</div>
        </Card>
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="h-4 w-4 text-purple-400" />
            <div className="text-2xl font-bold text-white">{filteredUsers.length}</div>
          </div>
          <div className="text-sm text-slate-400">Matching</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by name, skills, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-48 bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Filter Pills */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 font-medium">Skills:</span>
          {skillFilters.map((skill) => (
            <Button
              key={skill}
              variant={selectedSkill === skill ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSkill(skill)}
              className={
                selectedSkill === skill
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {skill}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 font-medium">Availability:</span>
          {availabilityFilters.map((availability) => (
            <Button
              key={availability}
              variant={selectedAvailability === availability ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAvailability(availability)}
              className={
                selectedAvailability === availability
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }
            >
              {availability}
            </Button>
          ))}
        </div>
      </div>

      {/* User Grid */}
      {filteredUsers.length === 0 ? (
        <Card className="p-12 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold text-white mb-2">No experts found</h3>
            <p className="text-slate-400">
              Try adjusting your filters or search query
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="p-6 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors"
            >
              <div className="space-y-4">
                {/* Avatar and Basic Info */}
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white text-lg">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/dashboard/users/${user.id}`}
                      className="font-semibold text-white hover:text-emerald-400 transition-colors"
                    >
                      {user.name}
                    </Link>
                    <p className="text-sm text-slate-400">{user.title}</p>
                    {user.location && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {user.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-slate-400 line-clamp-2">{user.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-white">{user.rating}</span>
                  </div>
                  <div className="text-slate-400">
                    {user.sessionsCompleted} sessions
                  </div>
                  <Badge
                    variant={user.availability === "available" ? "success" : "warning"}
                    className="text-xs"
                  >
                    {user.availability}
                  </Badge>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-slate-600 text-slate-300 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="text-sm">
                    <span className="text-emerald-400 font-semibold">
                      ${user.hourlyRate}/hr
                    </span>
                    <span className="text-slate-500 text-xs ml-2">
                      {user.responseTime} response
                    </span>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Link href={`/dashboard/users/${user.id}`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
