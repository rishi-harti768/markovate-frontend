"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAccount, handleAccResponse } from "@/utils/account";

interface resDataObject {
  hasSuperControls?: boolean;
}

const Dashboard = () => {
  const [resData, setResData] = useState<resDataObject>({
    hasSuperControls: false,
  });

  const router = useRouter();
  useEffect(() => {
    const init = async () => {
      const res = await fetchAccount("/account/get-dashboard", {});
      console.log(res);
      handleAccResponse(res, router, setResData);
    };
    init();
  }, []);

  useEffect(() => {
    if ("hasSuperControls" in resData) {
    }
  }, [resData]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>{JSON.stringify(resData)}</p>
      <button onClick={() => router.push("/dashboard/my-profile")}>
        Profile
      </button>
      <hr />
      <button onClick={() => router.push("/dashboard/org/new")}>
        New Organizations
      </button>
      {"hasSuperControls" in resData && resData.hasSuperControls && (
        <button onClick={() => router.push("/dashboard/plus-plus")}>
          Admin
        </button>
      )}
    </>
  );
};

export default Dashboard;

/* 
handleAccResponse(res: resObject, router: AppRouterInstance, setResData: Dispatch<SetStateAction<object>>): void
handleAccResponse(res: resObject, router: AppRouterInstance, setResData: React.Dispatch<React.SetStateAction<object>>): void
*/
