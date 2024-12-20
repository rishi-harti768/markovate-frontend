import AccountVerificationBefore from "@/components/dashboard/AccountVerificationBefore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Page = async () => {
  const cook = await cookies();
  if (!cook.has("refreshToken")) {
    redirect("/dashboard");
  }

  return (
    <>
      <AccountVerificationBefore />
    </>
  );
};

export default Page;
