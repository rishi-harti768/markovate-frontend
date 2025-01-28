import AccountVerifcationAfter from "@/components/dashboard/AccVer/AccountVerifcationAfter";
import { fetchAccount } from "@/utils/account";
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
  if (cook.has("refreshToken")) {
    const res = await fetchAccount(
      "/account/verify-email/check",
      {},
      cook.toString()
    );
    if ("resRoute" in res && res.resRoute) {
      return redirect(res.resRoute);
    }
    return (
      <>
        <AccountVerifcationAfter id={id} token={token} />
      </>
    );
  } else {
    redirect("/auth");
  }
};
export default Page;
