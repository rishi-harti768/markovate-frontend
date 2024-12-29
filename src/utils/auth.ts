const host = process.env.NEXT_PUBLIC_HOST_URL;
export const authLogin = async (credentials: object) => {
  try {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const responseText: string = await response.text();
    const status: number = response.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const authRegister = async (credentials: object) => {
  try {
    const response = await fetch(`${host}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const responseText: string = await response.text();
    const status: number = response.status;

    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const authforgotpassbefore = async (credentials: object) => {
  try {
    const response = await fetch(`${host}/auth/forgot-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    const responseText: string = await response.text();
    const status: number = response.status;

    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};

export const authforgotpassafter = async (credentials: object) => {
  try {
    const response = await fetch(`${host}/auth/forgot-pass/change-pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });
    const responseText: string = await response.text();
    const status: number = response.status;
    return { status, responseText };
  } catch (error) {
    return { status: 500 };
  }
};
