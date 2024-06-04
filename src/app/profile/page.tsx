import React from "react";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import jwt from "jsonwebtoken";
import type { Metadata, ResolvingMetadata } from "next";
import EditProfile from "../components/EditProfle";
import "./profile.css";
import Payment from "../components/Payment";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  //   const token: RequestCookie | undefined = cookies().get("token");

  //   const user = jwt.verify(token.value, process.env.JWT_KEY);
  // console.log(user)
  return {
    title: "Profile",
  };
}

const Profile = async () => {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  let result: any;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}getUser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.userId }),
      // next: { revalidate: false | 0 | number },
    });

    result = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  console.log(result.profileType);
  return (
    <div>
      {user.profileType === "service" && <Payment tier={result.tier}></Payment>}
      <EditProfile
        user={result.profile}
        id={user.userId}
        profileType={result.profileType}
      />
    </div>
  );
};

export default Profile;
