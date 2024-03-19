"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
var CryptoJS = require("crypto-js");
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface userDetails {
  email: string;
  password: string;
  profileType: string;
}

const Signup = () => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<userDetails>();
  const [profileType, setProfileType] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [cPassword, setCPassword] = React.useState<string>();

  const handleRodioChange = (u: string) => {
    setProfileType(u);
  };

  const checkSamePassword = () => {
    if (cPassword !== password) {
      toast("Passwords don't match", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return false;
    }
    return true;
  };

  const checkPassword = (password: string) => {
    let error = "";
    // Check if the password length is at least 8 characters
    if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter.";
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      error = "Password must contain at least one lowercase letter.";
    }

    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      error = "Password must contain at least one digit.";
    }

    // Check if the password contains at least one special character
    if (!/[^a-zA-Z0-9]/.test(password)) {
      error = "Password must contain at least one special character.";
    }
    if (error.length > 0) {
      toast(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    setPassword(password);
    if (!checkSamePassword()) return false;
    // If all criteria pass, return true
    return true;
  };

  const handleUserInput = async () => {
    
    let x = await CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_CRYPTO_KEY).toString()


    const data = { email, password:x, profileType };
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}signup`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response?.json();

      if (result.success) {
        setPassword('')
        setCPassword('')
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
        
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
                value={"service"}
                checked={profileType === "service"}
                onChange={() => handleRodioChange("service")}
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
                checked={profileType === "normal"}
                value={"normal"}
                onChange={() => handleRodioChange("normal")}
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
          <p className="mb-1 font-medium text-gray-500">Confirm Password</p>
          <div className="mb-4 flex flex-col">
            <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
              <input
                type="password"
                onChange={(e) => setCPassword(e.target.value)}
                id="confirm-password"
                className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
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
