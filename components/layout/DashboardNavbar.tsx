"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Plus, LogOut, User, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { GlobalSearch } from "./GlobalSearch";

// Mock user data - replace with real auth
const mockUser = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "/avatars/default.jpg",
  initials: "AJ",
};

export function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: null },
    { href: "/browse", label: "Browse", icon: null },
    { href: "/my-requests", label: "My Requests", icon: null },
    { href: "/my-offers", label: "My Offers", icon: null },
    { href: "/sessions", label: "Sessions", icon: null },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("Logout clicked");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <motion.div
                className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Zap className="h-5 w-5 text-white" />
              </motion.div>
              <span className="hidden text-xl font-bold text-white md:inline-block">
                MicroCollab
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.href)
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Search Bar (Desktop) - Trigger for Global Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="relative w-full flex items-center gap-3 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md hover:border-emerald-500/50 transition-colors text-left"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-400">Search requests, users, skills...</span>
              <kbd className="ml-auto hidden xl:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-700 bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>

          {/* Global Search Modal */}
          <GlobalSearch />

          {/* Right Side Actions */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {/* Quick Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden md:flex gap-2"
                  asChild
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-4 w-4" />
                    <span>New</span>
                  </motion.button>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
                <DropdownMenuLabel className="text-slate-300">Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="text-slate-200 focus:bg-slate-700 focus:text-white">
                  <Link href="/post-request">Post Request</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-slate-200 focus:bg-slate-700 focus:text-white">
                  <Link href="/browse">Browse Requests</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <NotificationsDropdown />

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
                      {mockUser.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                <DropdownMenuLabel className="text-slate-300">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">{mockUser.name}</p>
                    <p className="text-xs text-slate-400">{mockUser.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild className="text-slate-200 focus:bg-slate-700 focus:text-white">
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-slate-200 focus:bg-slate-700 focus:text-white">
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 focus:bg-slate-700 focus:text-red-300 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-slate-900 border-slate-700">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                          isActive(link.href)
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Quick Actions */}
                  <div className="pt-6 border-t border-slate-700">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Quick Actions
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Button
                        asChild
                        variant="gradient"
                        className="w-full justify-start"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/post-request">
                          <Plus className="h-4 w-4 mr-2" />
                          Post Request
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
