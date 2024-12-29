"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboard } from "@/utils/account";

const Dashboard = () => {
  const [res, setRes] = useState<object>({});
  const [edumail, setEduMail] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      const res = await getDashboard();
      setRes(res);
      if (res.status == 200 && res.responseText == "UNAUTHORIZED") {
        return;
      }
      if (res.status == 200 && res.responseText == "ACCOUNT_NOT_FOUND") {
        return;
      }
      if (res.status == 200 && res.responseText == "ACCOUNT_NOT_VERIFIED") {
        router.replace("/dashboard/get-verified");
      }
      if (res.status == 500) {
        console.log("internal server error");
        return;
      }
    };
    init();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      <p>{JSON.stringify(res)}</p>
      <button onClick={() => router.push("/dashboard/my-profile")}>
        Profile
      </button>
      <hr />

      <button onClick={() => router.push("/dashboard/org/new")}>
        New Organizations
      </button>
    </>
  );
};

export default Dashboard;
