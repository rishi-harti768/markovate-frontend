"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAccount, handleAccResponse } from "@/utils/account";
import { resObject } from "@/utils/types/resObject";

interface resDataObject {
  hasSuperControls?: boolean;
}

const Dashboard = ({ res }: { res: object }) => {
  const [resData, setResData] = useState<resDataObject>({
    hasSuperControls: false,
  });

  const router = useRouter();
  useEffect(() => {
    handleAccResponse(res as resObject, router, setResData);
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
