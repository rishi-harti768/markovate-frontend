"use server";
import Dashboard from "@/components/dashboard/Dashboard";
import { getDashboard } from "@/utils/server/account";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (!cook.has("refreshToken")) {
    redirect("/auth");
  }
  return (
    <>
      <Dashboard />
    </>
  );
};
export default Page;
