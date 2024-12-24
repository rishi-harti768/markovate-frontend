"use client";
import { accountVerifyAfter } from "@/utils/account";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AccountVerifcationAfter = ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const router = useRouter();
  useEffect(() => {
    accVerAfter();
  }, []);
  const accVerAfter = async () => {
    const res = await accountVerifyAfter({ id, token });
    console.log(res);
    if (res.status == 200 && res.responseText == "ACCOUNT_NOT_FOUND") {
      return;
    }

    if (res.status == 200 && res.responseText == "INCORRECT_TOKEN") {
      return;
    }

    if (res.status == 500) {
      console.log("internal server error");
      return;
    }

    if (res.status == 200 && res.responseText == "EMAIL_VERIFIED") {
      console.log("email verified");
    }
  };
  return (
    <>
      <h1>Account is Verified</h1>
      <p>{id}</p>
      <p>{token}</p>
      <button onClick={() => router.replace("/dashboard")}>dashboard</button>
    </>
  );
};

export default AccountVerifcationAfter;
