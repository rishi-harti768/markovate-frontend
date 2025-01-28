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

  const [formData, setFormData] = useState({
    newPass: "",
    confirmPass: "",
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
    e.preventDefault();

    if (formData.newPass !== formData.confirmPass) {
      setResData((prev) => {
        return {
          ...prev,
          error: {
            ...prev.error,
            password: "Password does not match",
          },
        };
      });
      return;
    }

    setCredentials((prev) => {
      return {
        ...prev,
        password: formData.newPass,
      };
    });
    console.log(formData);
    console.log(credentials);

    const res = await fetchAuth("/auth/forgot-pass/change-pass", credentials);
    console.log(res);

    handelAuthResponse(
      res,
      router,
      setResData as Dispatch<SetStateAction<object>>
    );
  };

  const finalizePass = () => {};

  return (
    <>
      <h1>Your new Password</h1>
      <input type="text" value={email} disabled />
      <p>{resData.error?.email as string}</p>
      <input
        type="text"
        placeholder="New Password"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setFormData((prev) => {
            return {
              ...prev,
              newPass: target.value,
            };
          });
          finalizePass();
        }}
      />
      <input
        type="text"
        placeholder="Confirm Password"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          setFormData((prev) => {
            return {
              ...prev,
              confirmPass: target.value,
            };
          });
          finalizePass();
        }}
      />
      <p>{resData.error?.password as string}</p>
      <button onClick={handleSubmit}>Change</button>
      <p>{resData.pwdChanged ? "true" : "false"}</p>
    </>
  );
};

export default ForgotPassAfter;
