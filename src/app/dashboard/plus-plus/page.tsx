import AdminDasboard from "@/components/dashboard/admin/AdminDasboard";
import { fetchAdmin } from "@/utils/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cook = await cookies();
  if (cook.has("refreshToken")) {
    const res = await fetchAdmin(
      "/admin/get-admin-dashboard",
      {},
      cook.toString()
    );

    if ("resRoute" in res && res.resRoute) {
      return redirect(res.resRoute as string);
    } else {
      return (
        <>
          <AdminDasboard res={res} />
        </>
      );
    }
  } else {
    redirect("/auth");
  }
};

export default Page;
