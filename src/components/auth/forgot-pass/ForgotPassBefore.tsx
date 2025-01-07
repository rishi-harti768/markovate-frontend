"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { handelAuthResponse, fetchAuth } from "@/utils/auth";

interface resDataObject {
  error?: {
    email?: string;
  };
  mailSent: boolean;
}
const ForgotPassBefore = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ email: "" });
  const [resData, setResData] = useState<resDataObject>({
    error: {
      email: "",
    },
    mailSent: false,
  });

  useEffect(() => {}, [resData]);

  const handlefp = async () => {
    const res = await fetchAuth("/auth/forgot-pass", credentials);
    handelAuthResponse(
      res,
      router,
      setResData as Dispatch<SetStateAction<object>>
    );
  };

  return (
    <>
      <h1>Forgot Password</h1>
      <input
        type="text"
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <p>{resData.error?.email}</p>
      <button onClick={handlefp}>Send Email</button>
      <p>mailSent: {resData.mailSent ? "true" : "false"}</p>
    </>
  );
};

export default ForgotPassBefore;
