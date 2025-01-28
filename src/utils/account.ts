import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { resObject } from "./types/resObject";

const host = process.env.NEXT_PUBLIC_HOST_URL;

export const fetchAccount = async (
  url: string,
  body: object,
  cookies?: string
) => {
  try {
    let headers: {} = {
      "Content-Type": "application/json",
    };

    if (cookies) {
      headers = {
        ...headers,
        Cookie: cookies,
      };
    }
    const res = await fetch(`${host}${url}`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });
    let responseData = await res.json();
    responseData.status = res.status as number;
    return responseData;
  } catch (error) {
    return { status: 500, resErrMsg: error };
  }
};

export const handleAccResponse = (
  res: resObject,
  router: AppRouterInstance,
  setResData: Dispatch<SetStateAction<object>>
) => {
  if (res.status >= 400) {
    console.log("Server Error (" + res.resCode + "): " + res.resErrMsg);
    return;
  }
  if (res.status == 200) {
    if ("resRoute" in res && res.resRoute) {
      router.replace(res.resRoute as string);
      return;
    }
    if ("resServerErrDialog" in res && res.resServerErrDialog) {
      alert(res.resServerErrDialog);
      return;
    }
    if ("resData" in res && res.resData) {
      setResData(res.resData as object);
      return;
    }
  }
};
