const host = process.env.NEXT_PUBLIC_HOST_URL;

export const getDashboard = async () => {
  try {
    const res = await fetch(`${host}/account/get-dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseText: string = await res.text();
    toAuthForce(responseText);
    const status: number = res.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const accountVerifyBefore = async (body: object) => {
  try {
    const res = await fetch(`${host}/account/email-verify-before`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    let responseText: string | object = await res.text();
    const status: number = res.status;

    if (isJSON(responseText)) {
      responseText = JSON.parse(responseText);
    }

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

export const getMyProfile = async () => {
  try {
    const res = await fetch(`${host}/account/get-my-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    let responseText: string | object = await res.text();
    const status: number = res.status;

    if (isJSON(responseText)) {
      responseText = JSON.parse(responseText);
    }
    return { status, responseText };
  } catch (error) {
    return { status: 500, responseText: error };
  }
};

export const setMyProfile = async (body: object) => {
  try {
    const res = await fetch(`${host}/account/set-my-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const responseText: string = await res.text();
    const status: number = res.status;

    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

const isJSON = (txt: string) => {
  try {
    JSON.parse(txt);
  } catch (error) {
    return false;
  }
  return true;
};

const toAuthForce = (resStr: string) => {
  if (resStr === "FORCE_AUTH_OUT") {
    document.location = "/auth";
  }
};
