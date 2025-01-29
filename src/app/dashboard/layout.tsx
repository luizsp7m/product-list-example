import { AppHeader } from "@/app/dashboard/_components/app-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />

      <div className="container mx-auto p-4 space-y-4">{children}</div>
    </div>
  );
}
