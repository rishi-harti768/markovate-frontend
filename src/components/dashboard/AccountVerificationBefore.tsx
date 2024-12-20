"use client";
import { accountVerifyBefore } from "@/utils/account";
import React from "react";
import { useRouter } from "next/navigation";

const AccountVerificationBefore = () => {
  const router = useRouter();
  const handleButtonClick = async () => {
    const res = await accountVerifyBefore();
    console.log(res);
    if (res.status == 200 && res.responseText == "UNAUTHORIZED") {
      return;
    }
    if (res.status == 200 && res.responseText == "ACCOUNT_NOT_FOUND") {
      return;
    }
    if (res.status == 200 && res.responseText == "ACCOUNT_ALREADY_VERIFIED") {
      router.replace("/dashboard");
      return;
    }
    if (res.status == 500) {
      console.log("internal server error");
      return;
    }
    if (res.status == 200 && res.responseText == "EMAIL_VERIFICATION_SENT") {
      return;
    }
  };
  return (
    <>
      <h1>Get an Account Verification Email</h1>
      <button onClick={handleButtonClick}>Get Email</button>
    </>
  );
};

export default AccountVerificationBefore;
