"use server";
import Dashboard from "@/components/dashboard/Dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async (/* {
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
} */) => {
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
