"use client";
import { getMyProfile, setMyProfile } from "@/utils/account";
import { object } from "motion/react-client";
import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";

const Profile = () => {
  const [profile, setProfile] = useState<{
    first_name: string;
    last_name: string;
    gender: string;
    date_of_birth: string;
  }>({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
  });
  useEffect(() => {
    const init = async () => {
      const res = await getMyProfile();
      console.log(res);
      if (res.status == 200 && res.responseText == "UNAUTHORIZED") {
        return;
      }

      if (res.status == 200 && res.responseText == "ACCOUNT_NOT_FOUND") {
        return;
      }
      if (res.status == 200 && res.responseText == "NO_PROFILE") {
        return;
      }

      if (res.status == 500) {
        return;
      }

      if (res.status == 200 && typeof res.responseText === "object") {
        const obj = res.responseText as {
          first_name: string;
          last_name: string;
          gender: string;
          date_of_birth: string;
        };
        setProfile(obj);
      }
    };
    init();
  }, []);

  const btnchangeprofile = async () => {
    const res = await setMyProfile({ profile: profile });
    console.log(res);
  };

  return (
    <>
      <div>Profile</div>
      <p>{JSON.stringify(profile)}</p>
      <input
        type="text"
        defaultValue={profile.first_name}
        onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
      />
      <input
        type="text"
        defaultValue={profile.last_name}
        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
      />
      <input
        type="text"
        defaultValue={profile.gender}
        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
      />
      <input
        type="text"
        defaultValue={profile.date_of_birth}
        onChange={(e) =>
          setProfile({ ...profile, date_of_birth: e.target.value })
        }
      />
      <button onClick={btnchangeprofile}>Change</button>
    </>
  );
};

export default Profile;
