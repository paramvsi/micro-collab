"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, MessageSquare, Calendar, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
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
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    read: false,
    link: "/dashboard/requests/123",
  },
  {
    id: "2",
    type: "session",
    title: "Session Starting Soon",
    message: "Your session with Alex starts in 30 minutes",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
    link: "/dashboard/sessions/456",
  },
  {
    id: "3",
    type: "feedback",
    title: "New Feedback",
    message: "John rated your session 5 stars!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: true,
    link: "/dashboard/profile#feedback",
  },
];

const notificationIcons = {
  offer: MessageSquare,
  session: Calendar,
  feedback: Star,
  system: AlertCircle,
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-300 hover:text-white hover:bg-white/5"
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="error"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 bg-slate-800 border-slate-700 max-h-[500px] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-2 py-2">
          <DropdownMenuLabel className="text-slate-300 p-0">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-7 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="bg-slate-700" />

        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 mx-auto mb-3 text-slate-600" />
            <p className="text-sm text-slate-400">No notifications yet</p>
          </div>
        ) : (
          <div className="py-1">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              return (
                <DropdownMenuItem
                  key={notification.id}
                  asChild
                  className={`px-3 py-3 cursor-pointer transition-colors ${
                    !notification.read
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "hover:bg-slate-700"
                  }`}
                  onMouseEnter={() => {
                    if (!notification.read) {
                      handleMarkAsRead(notification.id);
                    }
                  }}
                >
                  <Link
                    href={notification.link || "/dashboard/notifications"}
                    className="flex gap-3"
                  >
                    <div
                      className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        notification.type === "offer"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : notification.type === "session"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : notification.type === "feedback"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
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
                      <p className="text-sm text-slate-400 line-clamp-2 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </div>
        )}

        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          asChild
          className="text-emerald-400 hover:text-emerald-300 focus:bg-slate-700 cursor-pointer justify-center"
        >
          <Link href="/dashboard/notifications" className="text-center py-2">
            View All Notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
