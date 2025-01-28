import Profile from "@/components/dashboard/profile/Profile";
import { fetchAccount } from "@/utils/account";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();

  if (cook.has("refreshToken")) {
    const res = await fetchAccount(
      "/account/get-my-profile",
      {},
      cook.toString()
    );
    if ("resRoute" in res && res.resRoute) {
      return redirect(res.resRoute as string);
    }
    return (
      <>
        <Profile res={res} />
      </>
    );
  } else {
    redirect("/auth");
  }
};

export default Page;
