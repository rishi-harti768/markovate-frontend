"use server";
import Image from "next/image";
import { getAccount } from "@/utils/server/test";

const Home = () => {
  /* const host = process.env.NEXT_PUBLIC_HOST_URL;
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map(({ name, value }) => `${name}=${value}`)
    .join(";");
  const res = await fetch(`${host}/account/fetch-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
  });
  const responseText: string = await res.text(); */

  // setCookies("test", "test");

  return (
    <>
      <h1>Markovate@official</h1>
      <p>risji</p>
    </>
  );
};
export default Home;
