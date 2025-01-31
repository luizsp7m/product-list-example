import { Suspense } from "react";
import { LoginForm } from "./_components/login-form";
import { Loading } from "@/components/shared-components/loading";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
