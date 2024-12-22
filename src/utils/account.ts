const host = process.env.NEXT_PUBLIC_HOST_URL;

export const accountFetch = async () => {
  try {
    const res = await fetch(`${host}/account/fetch-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseText: string = await res.text();
    const status: number = res.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const accountVerifyBefore = async () => {
  try {
    const res = await fetch(`${host}/account/email-verify-before`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseText: string = await res.text();
    const status: number = res.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const accountVerifyAfter = async (credentials: {
  id: string;
  token: string;
}) => {
  try {
    const res = await fetch(`${host}/account/email-verify-after`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const responseText: string = await res.text();
    const status: number = res.status;

    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};
