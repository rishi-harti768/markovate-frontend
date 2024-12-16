import ForgotPassAfter from "@/components/auth/forgot-pass/ForgotPassAfter";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JSX } from "react";

const Page = async ({
  params: { email, token },
}: {
  params: {
    email: string;
    token: string;
  };
}): Promise<JSX.Element> => {
  email = email.replace("%40", "@");
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/auth");
  }

  return (
    <>
      <ForgotPassAfter email={email} token={token} />
    </>
  );
};

export default Page;
