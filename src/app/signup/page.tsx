"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from "react";

interface userDetails {
  email: string;
  password: string;
  usertype: string;
}

const Signup = () => {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<userDetails>();
  const [userType, setUserType] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const handleRodioChange = (u: string) => {
    console.log(u);
    setUserType(u);
  };

  const handleUserInput = async () => {
    setUserDetails({ email, password, userType });

    // async function postJSON(userDetails: userDetails) {
    try {
      const response = await fetch("http://localhost:3000/signup/api", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const result = await response.json();
      console.log("Success:", result);
      if (result.success) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // }
    console.log(userDetails);

    // postJSON(userDetails);
  };

  return (
    <div>
      <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <p className="mb-20 font-bold tracking-wider">CORINE</p>
          <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
            Start your <br />
            journey with us
          </p>
          <p className="mb-28 leading-relaxed text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nisi
            voluptas a officia. Omnis.
          </p>
          <div className="bg-blue-600/80 rounded-2xl px-4 py-8">
            <p className="mb-3 text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea
              voluptates sapiente!
            </p>
            <div className="">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="/images/y9s3xOJV6rnQPKIrdPYJy.png"
                  alt="Simon Lewis"
                />
                <p className="ml-4 w-56">
                  <strong className="block font-medium">Simon Lewis</strong>
                  <span className="text-xs text-gray-200">
                    {" "}
                    Published 12 Bestsellers{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-20">
          <h2 className="mb-2 text-3xl font-bold">Sign Up</h2>
          <Link href="login" className="mb-10 block font-bold text-gray-600">
            Have an account
          </Link>
          <p className="mb-1 font-medium text-gray-500">Looking for?</p>
          <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio1"
                value={"serviceUser"}
                checked={userType === "serviceUser"}
                onChange={() => handleRodioChange("serviceUser")}
              />
              <label
                className="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio1"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Provide Service</span>
            </div>
            <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
              <input
                className="peer hidden"
                type="radio"
                name="radio"
                id="radio3"
                checked={userType === "normalUser"}
                value={"normalUser"}
                onChange={() => handleRodioChange("normalUser")}
              />
              <label
                className="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                htmlFor="radio3"
              >
                {" "}
              </label>
              <div className="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
              <span className="pointer-events-none z-10">Find Service</span>
            </div>
          </div>
          <p className="mb-1 font-medium text-gray-500">Email</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="signup-email"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <p className="mb-1 font-medium text-gray-500">Password</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="signup-password"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Choose a password (minimum 8 characters)"
              />
            </div>
          </div>
          <button
            onClick={handleUserInput}
            className="hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;