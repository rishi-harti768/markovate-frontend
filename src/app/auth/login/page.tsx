import AuthLogin from "@/components/auth/login/AuthLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/");
  }

  return (
    <>
      <AuthLogin />
    </>
  );
};

export default Page;
