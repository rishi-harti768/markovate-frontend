"use client";
import { accountVerifyAfter } from "@/utils/account";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAccount, handleAccResponse } from "@/utils/account";

const AccountVerifcationAfter = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  const [resData, setResData] = useState<object>({ accVerified: false });
  useEffect(() => {
    const init = async () => {
      const res = await fetchAccount("/account/verify-email/check", {
        id: id,
        token: token,
      });
      console.log(res);
      handleAccResponse(res, router, setResData);
    };
    init();
  }, []);
  return (
    <>
      <h1>Account is Verified</h1>
      <p>{id}</p>
      <p>{token}</p>
      <p>{JSON.stringify(resData)}</p>
      <button onClick={() => router.replace("/dashboard")}>Dashboard</button>
    </>
  );
};

export default AccountVerifcationAfter;
