"use server";
import Dashboard from "@/components/dashboard/Dashboard";
import { fetchAccount } from "@/utils/account";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    const res = await fetchAccount(
      "/account/get-dashboard",
      {},
      cook.toString()
    );
    console.log(res);
    return (
      <>
        <Dashboard res={res} />
      </>
    );
  } else {
    redirect("/auth");
  }
};
export default Page;
