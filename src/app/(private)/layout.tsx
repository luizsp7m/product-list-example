import { AppHeader } from "@/app/(private)/_components/app-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-svh overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
      style={{ scrollbarGutter: "stable" }}
    >
      <AppHeader />

      <div>
        <div className="container mx-auto space-y-4 p-4">{children}</div>
      </div>
    </div>
  );
}
