import NewOrg from "@/components/dashboard/org/NewOrg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const CookieStore = await cookies();
  if (!CookieStore.has("refreshToken")) {
    redirect("/auth");
  }
  return (
    <>
      <NewOrg />
    </>
  );
};

export default Page;
