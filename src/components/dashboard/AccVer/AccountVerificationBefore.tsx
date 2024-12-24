"use client";
import { accountVerifyBefore } from "@/utils/account";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AccountVerificationBefore = () => {
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("visibilitychange", async (e) => {
      const d = e.target as Document;
      if (d.visibilityState == "hidden") {
      } else if (d.visibilityState == "visible") {
        getverStatus();
      }
    });
    getverStatus();
    return () => {
      document.removeEventListener("visibilitychange", () => {});
    };
  }, []);

  const getverStatus = async () => {
    const res = await accountVerifyBefore({ action: "check" });
    handleRespose(res.status, res.responseText);
  };

  const handleButtonClick = async () => {
    const res = await accountVerifyBefore({ action: "mail" });
    handleRespose(res.status, res.responseText);
  };

  const handleRespose = (
    status: number,
    resTxt: string | undefined | object
  ) => {
    if (status == 200 && resTxt == "MISSING_FIELDS") {
      return;
    }
    if (status == 200 && resTxt == "ACCOUNT_NOT_FOUND") {
      return;
    }
    if (status == 200 && resTxt == "ACCOUNT_ALREADY_VERIFIED") {
      router.replace("/dashboard");
      return;
    }
    if (status == 500) {
      console.log("internal server error");
      return;
    }
    if (status == 200 && resTxt == "EMAIL_VERIFICATION_SENT") {
      return;
    }
    if (typeof resTxt == "object" && status == 200 && "verified" in resTxt) {
      if (resTxt.verified) return router.replace("/dashboard");
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
