import { TopBar } from "@/components/layout/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <TopBar />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
