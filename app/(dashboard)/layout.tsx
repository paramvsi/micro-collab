import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs />
        <main>{children}</main>
      </div>
    </div>
  );
}
