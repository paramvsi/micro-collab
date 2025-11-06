"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

const breadcrumbConfig: BreadcrumbConfig = {
  dashboard: { label: "Dashboard", icon: Home },
  browse: { label: "Browse Requests" },
  requests: { label: "Requests" },
  "my-requests": { label: "My Requests" },
  "my-offers": { label: "My Offers" },
  sessions: { label: "Sessions" },
  profile: { label: "Profile" },
  settings: { label: "Settings" },
  notifications: { label: "Notifications" },
  discover: { label: "Discover Users" },
  analytics: { label: "Analytics" },
  help: { label: "Help & FAQ" },
  new: { label: "New" },
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on root dashboard
  if (!pathname || pathname === "/dashboard") {
    return null;
  }

  // Split pathname and filter out empty strings
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Don't show breadcrumbs if only one segment or not in dashboard
  if (segments.length <= 1 || segments[0] !== "dashboard") {
    return null;
  }

  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    const config = breadcrumbConfig[segment];

    // If segment is a dynamic ID (UUID or number), use previous segment's label + "Details"
    const isDynamicId = /^[0-9a-f-]+$/.test(segment) || /^\d+$/.test(segment);
    const label = isDynamicId
      ? `${breadcrumbConfig[segments[index - 1]]?.label || "Item"} Details`
      : config?.label || segment.charAt(0).toUpperCase() + segment.slice(1);

    const Icon = config?.icon;

    return {
      label,
      path,
      icon: Icon,
      isLast: index === segments.length - 1,
      isDynamic: isDynamicId,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-slate-500" aria-hidden="true" />
            )}
            {crumb.isLast ? (
              <span className="flex items-center gap-1.5 font-medium text-white">
                {crumb.icon && <crumb.icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{crumb.label}</span>
                <span className="sm:hidden">{crumb.label.split(" ").pop()}</span>
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                {crumb.icon && <crumb.icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{crumb.label}</span>
                <span className="sm:hidden">{crumb.label.split(" ").pop()}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
