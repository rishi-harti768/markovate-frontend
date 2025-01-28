import AccountVerificationBefore from "@/components/dashboard/AccVer/AccountVerificationBefore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    
    return (
      <>
        <AccountVerificationBefore />
      </>
    );
  } else {
    redirect("/auth");
  }
};

export default Page;
