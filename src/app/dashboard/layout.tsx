import { AppHeader } from "@/app/dashboard/_components/app-header";
import { USER_ROLES } from "@/constants/user-roles";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== USER_ROLES.ADMIN) {
    redirect("/");
  }

  return (
    <div>
      <AppHeader />

      <div className="container mx-auto p-4 space-y-4">{children}</div>
    </div>
  );
}
