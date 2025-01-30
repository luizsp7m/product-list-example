import { getSession } from "@/actions/get-session";
import { LogoutButton } from "./dashboard/_components/logout-button";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <span>Home</span>

      {session && (
        <div className="flex flex-col gap-3">
          <pre>{JSON.stringify(session, null, 3)}</pre>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
