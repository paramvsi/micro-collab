"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye, XCircle, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

// Mock data - replace with real data hooks
const mockOffers = [
  {
    id: "1",
    requestId: "123",
    requestTitle: "Help with React Performance Optimization",
    message: "I have 5+ years of experience optimizing React apps. I can help you identify bottlenecks and implement solutions.",
    status: "pending",
    estimatedTime: "2-3 hours",
    rate: 75,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "2",
    requestId: "456",
    requestTitle: "Database Schema Design Review",
    message: "I'm a database architect with experience in multi-tenant systems. Happy to review your schema.",
    status: "accepted",
    estimatedTime: "1 hour",
    rate: 100,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    sessionScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
  },
  {
    id: "3",
    requestId: "789",
    requestTitle: "API Design Best Practices",
    message: "I can share best practices for RESTful API design based on my experience.",
    status: "declined",
    estimatedTime: "1.5 hours",
    rate: 80,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    declineReason: "Client chose another helper",
  },
];

const statusOptions = [
  { value: "all", label: "All Offers" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "declined", label: "Declined" },
];

const statusConfig = {
  pending: {
    color: "warning" as const,
    icon: Clock,
    label: "Pending",
    description: "Waiting for response",
  },
  accepted: {
    color: "success" as const,
    icon: CheckCircle,
    label: "Accepted",
    description: "Offer accepted",
  },
  declined: {
    color: "error" as const,
    icon: XCircle,
    label: "Declined",
    description: "Offer declined",
  },
} as const;

export default function MyOffersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter offers
  const filteredOffers = mockOffers.filter((offer) => {
    const matchesSearch =
      offer.requestTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || offer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: mockOffers.length,
    pending: mockOffers.filter((o) => o.status === "pending").length,
    accepted: mockOffers.filter((o) => o.status === "accepted").length,
    declined: mockOffers.filter((o) => o.status === "declined").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Offers</h1>
        <p className="text-slate-400">
          Track all offers you've sent to collaboration requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-slate-400">Total Offers</div>
        </Card>
        <Card className="p-4 bg-amber-500/5 border-amber-500/20">
          <div className="text-2xl font-bold text-amber-400">{stats.pending}</div>
          <div className="text-sm text-slate-400">Pending</div>
        </Card>
        <Card className="p-4 bg-emerald-500/5 border-emerald-500/20">
          <div className="text-2xl font-bold text-emerald-400">{stats.accepted}</div>
          <div className="text-sm text-slate-400">Accepted</div>
        </Card>
        <Card className="p-4 bg-red-500/5 border-red-500/20">
          <div className="text-2xl font-bold text-red-400">{stats.declined}</div>
          <div className="text-sm text-slate-400">Declined</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search offers..."
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

      {/* Offers List */}
      {filteredOffers.length === 0 ? (
        <Card className="p-12 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No offers found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery || selectedStatus !== "all"
                ? "Try adjusting your filters or search query"
                : "Start browsing requests to send your first offer"}
            </p>
            {!searchQuery && selectedStatus === "all" && (
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                <Link href="/dashboard/browse">Browse Requests</Link>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOffers.map((offer) => {
            const StatusIcon = statusConfig[offer.status as keyof typeof statusConfig].icon;
            return (
              <Card
                key={offer.id}
                className="p-6 bg-slate-800/50 border-slate-700 hover:border-emerald-500/30 transition-colors"
              >
                <div className="space-y-4">
                  {/* Header with Status */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/dashboard/requests/${offer.requestId}`}
                        className="group"
                      >
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                          {offer.requestTitle}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-400">
                        Sent {formatDistanceToNow(offer.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <Badge
                      variant={statusConfig[offer.status as keyof typeof statusConfig].color}
                      className="flex items-center gap-1"
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig[offer.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  {/* Offer Message */}
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                    <p className="text-slate-300 text-sm">{offer.message}</p>
                  </div>

                  {/* Offer Details */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock className="h-4 w-4" />
                      <span>Est. Time: {offer.estimatedTime}</span>
                    </div>
                    <div className="text-emerald-400 font-medium">
                      ${offer.rate}/hour
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          Offer sent
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(offer.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {offer.status !== "pending" && (
                      <div className="flex items-center gap-3 mt-3">
                        <div
                          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            offer.status === "accepted"
                              ? "bg-emerald-500/10"
                              : "bg-red-500/10"
                          }`}
                        >
                          <StatusIcon
                            className={`h-4 w-4 ${
                              offer.status === "accepted"
                                ? "text-emerald-500"
                                : "text-red-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {statusConfig[offer.status as keyof typeof statusConfig].description}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(offer.updatedAt).toLocaleString()}
                          </p>
                          {offer.declineReason && (
                            <p className="text-xs text-slate-500 mt-1">
                              Reason: {offer.declineReason}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {offer.sessionScheduled && (
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-cyan-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Session scheduled
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(offer.sessionScheduled).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      <Link href={`/dashboard/requests/${offer.requestId}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Request
                      </Link>
                    </Button>
                    {offer.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Withdraw Offer
                      </Button>
                    )}
                    {offer.sessionScheduled && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <Link href={`/dashboard/sessions/${offer.id}`}>
                          Join Session
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
