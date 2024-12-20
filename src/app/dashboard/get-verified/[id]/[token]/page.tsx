import AccountVerifcationAfter from "@/components/dashboard/AccountVerifcationAfter";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; token: string }>;
}) => {
  const id: string = (await params).id;
  const token: string = (await params).token;
  const cook = await cookies();
  if (!cook.has("refreshToken")) {
    redirect("/dashboard");
  }
  return (
    <>
      <AccountVerifcationAfter id={id} token={token} />
    </>
  );
};
export default Page;
