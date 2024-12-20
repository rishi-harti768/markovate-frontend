import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
};

export default Page;
