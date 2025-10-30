"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Home, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/demo/dashboard", label: "Dashboard", icon: Home },
    { href: "/demo/browse", label: "Browse", icon: Search },
  ];

  return (
    <div className="min-h-screen bg-charcoal">
      <DemoBanner />

      {/* Demo Navigation */}
      <nav className="border-b border-smoky bg-graphite/50 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-steel transition-colors hover:text-brand-indigo"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Exit Demo</span>
            </Link>

            <div className="hidden h-6 w-px bg-smoky sm:block" />

            <div className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-brand-indigo/20 text-brand-indigo"
                        : "text-steel hover:bg-graphite/50 hover:text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
