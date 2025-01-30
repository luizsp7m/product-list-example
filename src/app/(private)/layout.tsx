import { AppHeader } from "@/app/(private)/_components/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />

      <div className="container mx-auto p-4 space-y-4">{children}</div>
    </div>
  );
}
