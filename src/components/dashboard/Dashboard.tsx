"use client";

import { accountFetch } from "@/utils/account";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    accountGet();
  }, []);
  const accountGet = async () => {
    const res = await accountFetch();
    console.log(res);

    if (res.status == 200 && res.responseText == "UNAUTHORIZED") {
      return;
    }
    if (res.status == 200 && res.responseText == "ACCOUNT_NOT_FOUND") {
      return;
    }
    if (res.status == 200 && res.responseText == "ACCOUNT_NOT_VERIFIED") {
      router.replace("/dashboard/get-verified");
      return;
    }
    if (res.status == 200 && res.responseText == "JOIN_ANY_ORG") {
      router.replace("/dashboard/join-org");
      return;
    }
    if (res.status == 500) {
      console.log("internal server error");
      return;
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
