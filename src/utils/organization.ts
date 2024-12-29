const host = process.env.NEXT_PUBLIC_HOST_URL;
import { useRouter } from "next/navigation";

export const newOrgReg = async (credentials: object) => {
  try {
    const response = await fetch(`${host}/orgs/new-org-reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const responseText: string = await response.text();
    toAuthForce(responseText);
    const status: number = response.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500, responseText: error };
  }
};

const toAuthForce = (resStr: string) => {
  if (resStr === "FORCE_AUTH_OUT") {
    document.location = "/auth";
  }
};
