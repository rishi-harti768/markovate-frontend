"use client";
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

  const btnVerNow = async () => {
    const res = await fetchAccount("/account/verify-email/check", {
      id: id,
      token: token,
    });
    console.log(res);
    handleAccResponse(res, router, setResData);
  };
  return (
    <>
      <h1>Account Verification</h1>
      <p>{id}</p>
      <p>{token}</p>
      <button onClick={btnVerNow}>Verify Now</button>
      <p>{JSON.stringify(resData)}</p>
      <button onClick={() => router.replace("/dashboard")}>Dashboard</button>
    </>
  );
};

export default AccountVerifcationAfter;
