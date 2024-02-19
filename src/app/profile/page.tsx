import React from "react";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import jwt from "jsonwebtoken";
import type { Metadata, ResolvingMetadata } from "next";
import EditProfile from "../components/EditProfle";
import "./profile.css";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const token: RequestCookie | undefined = cookies().get("token");

  const user = jwt.verify(token.value, process.env.JWT_KEY);

  return {
    title: user.email,
  };
}

const Profile = async () => {
  const token: RequestCookie | undefined = cookies().get("token");

  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  let result: any;

  try {
    const response = await fetch("http://localhost:3000/api/getUser", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
      // next: { revalidate: false | 0 | number },
    });

    result = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <div>
      abc
      <EditProfile user={result.user} userType={result.result.userType} />
    </div>
  );
};

export default Profile;
