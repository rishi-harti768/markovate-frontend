"use client";
import { useEffect } from "react";

const Home = () => {
  const host = process.env.NEXT_PUBLIC_HOST_URL;
  useEffect(() => {
    test();
  });
  const test = async () => {
    const res = await fetch(`${host}/account/fetch-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseText: string = await res.text();
    const status: number = res.status;
    console.log(status, responseText);
  };
  return (
    <>
      <h1>Markovate@official</h1>
    </>
  );
};
export default Home;
