"use client";
import { accountVerifyBefore } from "@/utils/account";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAccount, handleAccResponse } from "@/utils/account";

const AccountVerificationBefore = () => {
  const router = useRouter();
  const [resData, setResData] = useState<object>({});

  useEffect(() => {
    const init = async () => {
      const res = await fetchAccount("/account/verify-email/send", {
        action: "status",
      });
      handleAccResponse(res, router, setResData);
      console.log(resData);
    };
    document.addEventListener("visibilitychange", async (e) => {
      const d = e.target as Document;
      if (d.visibilityState == "hidden") {
      } else if (d.visibilityState == "visible") {
        init();
      }
    });
    init();
    return () => {
      document.removeEventListener("visibilitychange", () => {});
    };
  }, []);

  useEffect(() => {
    console.log(resData);
  }, [resData]);

  const handleButtonClick = async () => {
    const res = await fetchAccount("/account/verify-email/send", {
      action: "mail",
    });
    console.log(res);
    handleAccResponse(res, router, setResData);
  };

  return (
    <>
      <h1>Get an Account Verification Email</h1>
      <button onClick={handleButtonClick}>Get Email</button>
    </>
  );
};

export default AccountVerificationBefore;
