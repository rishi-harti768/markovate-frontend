"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
const host = process.env.NEXT_PUBLIC_HOST_URL;

export const fetchAuth = async (url: string, body: object) => {
  try {
    const response = await fetch(`${host}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    let responseData = await response.json();
    responseData.status = response.status;
    return responseData;
  } catch (error) {
    return { status: 500, resErrMsg: error };
  }
};

export const handelAuthResponse = (
  res: {
    status?: string;
    resErrMsg?: string;
    resCode?: string;
    resRoute?: string;
  },
  setError: Dispatch<SetStateAction<string>>,
  router: AppRouterInstance,
  setMailSent?: Dispatch<SetStateAction<boolean>>
) => {
  if (res.status == "500") {
    console.log(res.resErrMsg);
  }
  if ("resCode" in res) {
    if (res.resCode == "EMPTY_FIELDS") {
      setError("Empty fields");
      return;
    }
    if (res.resCode == "INVALID_EMAIL_FORMAT") {
      setError("Invalid email format");
      return;
    }
    if (res.resCode == "WEAK_PASSWORD") {
      setError("Weak password");
      return;
    }
    if (res.resCode == "AUTH_REGISTER_EMAIL_ALREADY_EXISTS") {
      setError("Email already exists");
      return;
    }
    if (res.resCode == "AUTH_REGISTER_SUCCESS" && "resRoute" in res) {
      router.replace(res.resRoute as string);
      return;
    }

    if (res.resCode == "AUTH_LOGIN_INVALID_EMAIL_OR_PASSWORD") {
      setError("Incorrect email or password");
      return;
    }
    if (res.resCode == "AUTH_LOGIN_SUCCESS" && "resRoute" in res) {
      router.replace(res.resRoute as string);
      return;
    }

    if (res.resCode == "AUTH_FP_EMAIL_NOT_FOUND") {
      setError("Email not found");
      return;
    }
    if (res.resCode == "AUTH_FP_INVALID_TOKEN") {
      setError("Invalid token");
      return;
    }
    if (res.resCode == "AUTH_FP_EMAIL_SENT" && setMailSent) {
      setMailSent(true);
      return;
    }
    if (res.resCode == "AUTH_FP_CHANGED" && "resRoute" in res) {
      router.replace(res.resRoute as string);
      return;
    }
    setError(res.resCode as string);
  }
};
