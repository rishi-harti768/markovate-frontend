import ForgotPassBefore from "@/components/auth/forgot-pass/ForgotPassBefore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/auth");
  }

  return (
    <>
      <ForgotPassBefore />
    </>
  );
};

export default Page;
