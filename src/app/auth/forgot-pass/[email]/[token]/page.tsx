import ForgotPassAfter from "@/components/auth/forgot-pass/ForgotPassAfter";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ email: string; token: string }>;
}) => {
  const email: string = (await params).email.replace("%40", "@");
  const token: string = (await params).token;
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/dashboard");
  } else {
    return (
      <>
        <ForgotPassAfter email={email} token={token} />
      </>
    );
  }
};

export default Page;
