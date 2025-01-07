"use client";
import { fetchAuth, handelAuthResponse } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

interface resDataObject {
  error?: {
    email?: string;
    password?: string;
  };
  pwdChanged?: boolean;
}

const ForgotPassAfter = ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const [credentials, setCredentials] = useState({
    email: email,
    token: token,
    password: "",
  });
  const newPwdRef = useRef<HTMLInputElement>(null);
  const confirmPwdRef = useRef<HTMLInputElement>(null);
  const [resData, setResData] = useState<resDataObject>({
    error: {
      password: "",
    },
    pwdChanged: false,
  });

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (newPwdRef.current?.value !== confirmPwdRef.current?.value) {
      setResData({
        ...resData,
        error: {
          password: "Passwords do not match",
        },
      });
      return;
    }

    setCredentials((prev) => {
      return {
        ...prev,
        password: newPwdRef.current?.value,
      } as typeof prev;
    });
    console.log(credentials);
    const res = await fetchAuth("/auth/forgot-pass/change-pass", credentials);
    console.log(res);

    handelAuthResponse(
      res,
      router,
      setResData as Dispatch<SetStateAction<object>>
    );
  };
  return (
    <>
      <h1>Your new Password</h1>
      <input type="text" value={email} disabled />
      <p>{resData.error?.email as string}</p>
      <input type="text" placeholder="New Password" ref={newPwdRef} />
      <input type="text" placeholder="Confirm Password" ref={confirmPwdRef} />
      <p>{resData.error?.password as string}</p>
      <button onClick={handleSubmit}>Change</button>
      <p>{resData.pwdChanged ? "true" : "false"}</p>
    </>
  );
};

export default ForgotPassAfter;
