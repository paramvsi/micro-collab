"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCheck,
  MessageSquare,
  Calendar,
  Star,
  AlertCircle,
  Trash2,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: "offer" | "session" | "feedback" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

// Mock notifications - replace with real data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "offer",
    title: "New Offer Received",
    message: "Sarah Chen wants to help with your React performance issue",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    link: "/dashboard/requests/123",
  },
  {
    id: "2",
    type: "session",
    title: "Session Starting Soon",
    message: "Your session with Alex starts in 30 minutes",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    link: "/dashboard/sessions/456",
  },
  {
    id: "3",
    type: "feedback",
    title: "New Feedback",
    message: "John rated your session 5 stars!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true,
    link: "/dashboard/profile#feedback",
  },
  {
    id: "4",
    type: "offer",
    title: "Offer Accepted",
    message: "Your offer for 'Database Schema Review' was accepted",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    link: "/dashboard/my-offers",
  },
  {
    id: "5",
    type: "system",
    title: "New Features Available",
    message: "Check out our new collaboration tools and enhanced video quality",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    read: true,
  },
  {
    id: "6",
    type: "session",
    title: "Session Completed",
    message: "Session with Maria Rodriguez completed. Please leave feedback.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    read: true,
    link: "/dashboard/sessions/789",
  },
];

const typeOptions = [
  { value: "all", label: "All", icon: Bell },
  { value: "offer", label: "Offers", icon: MessageSquare },
  { value: "session", label: "Sessions", icon: Calendar },
  { value: "feedback", label: "Feedback", icon: Star },
  { value: "system", label: "System", icon: AlertCircle },
];

const notificationIcons = {
  offer: MessageSquare,
  session: Calendar,
  feedback: Star,
  system: AlertCircle,
};

const notificationColors = {
  offer: "bg-cyan-500/10 text-cyan-400",
  session: "bg-emerald-500/10 text-emerald-400",
  feedback: "bg-amber-500/10 text-amber-400",
  system: "bg-slate-500/10 text-slate-400",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesType = selectedType === "all" || notification.type === selectedType;
    const matchesRead = !showUnreadOnly || !notification.read;
    return matchesType && matchesRead;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleBulkDelete = () => {
    setNotifications((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = new Date(notification.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateKey: string;
    if (date.toDateString() === today.toDateString()) {
      dateKey = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateKey = "Yesterday";
    } else {
      dateKey = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-slate-400">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
              : "You're all caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
          {selectedIds.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete selected ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-slate-800/50 border-slate-700">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Type Filters */}
          <div className="flex gap-2 flex-wrap flex-1">
            {typeOptions.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.value)}
                  className={
                    selectedType === type.value
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Unread Filter */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="unread-only"
              checked={showUnreadOnly}
              onCheckedChange={(checked) => setShowUnreadOnly(checked === true)}
              className="border-slate-600"
            />
            <label
              htmlFor="unread-only"
              className="text-sm text-slate-300 cursor-pointer"
            >
              Unread only
            </label>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.length === filteredNotifications.length}
            onCheckedChange={handleSelectAll}
            className="border-slate-600"
          />
          <label
            htmlFor="select-all"
            className="text-sm text-slate-300 cursor-pointer"
          >
            Select all
          </label>
        </div>
      )}

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card className="p-12 bg-slate-800/50 border-slate-700">
          <div className="text-center">
            <Bell className="h-16 w-16 mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold text-white mb-2">
              No notifications
            </h3>
            <p className="text-slate-400">
              {showUnreadOnly
                ? "You have no unread notifications"
                : selectedType !== "all"
                ? `No ${selectedType} notifications`
                : "You're all caught up!"}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, notifs]) => (
            <div key={date} className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                {date}
              </h2>
              <div className="space-y-2">
                {notifs.map((notification) => {
                  const Icon = notificationIcons[notification.type];
                  const isSelected = selectedIds.includes(notification.id);

                  return (
                    <Card
                      key={notification.id}
                      className={`p-4 bg-slate-800/50 border-slate-700 transition-colors ${
                        !notification.read
                          ? "border-l-4 border-l-emerald-500 bg-emerald-500/5"
                          : ""
                      } ${isSelected ? "ring-2 ring-emerald-500" : ""}`}
                    >
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex-shrink-0 pt-1">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleToggleSelect(notification.id)}
                            className="border-slate-600"
                          />
                        </div>

                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            notificationColors[notification.type]
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read ? "text-white" : "text-slate-200"
                              }`}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="flex-shrink-0 h-2 w-2 rounded-full bg-emerald-500" />
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3">
                            <p className="text-xs text-slate-500">
                              {formatDistanceToNow(notification.timestamp, {
                                addSuffix: true,
                              })}
                            </p>
                            {notification.link && (
                              <Link
                                href={notification.link}
                                className="text-xs text-emerald-400 hover:text-emerald-300"
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                View details →
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="h-8 w-8 text-slate-400 hover:text-white"
                              title="Mark as read"
                            >
                              <CheckCheck className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(notification.id)}
                            className="h-8 w-8 text-slate-400 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
