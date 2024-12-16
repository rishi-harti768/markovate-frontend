import AuthRegister from "@/components/auth/register/AuthRegister";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/");
  }

  return (
    <>
      <AuthRegister />
    </>
  );
};

export default Page;
