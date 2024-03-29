"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  user: any;
  handleLogout: () => void;
}

export const ProfileButton: React.FC<Props> = ({ user, handleLogout }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const logout = () => {
    toggleOpen();
    handleLogout();
    router.push("/");
  };

  return (
    <div>
      {!user ? (
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <Link
              href="/signup"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Login
            </Link>
          </li>
        </ul>
      ) : (
        <li>
          <button onClick={toggleOpen}>
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src="/docs/images/people/profile-picture-5.jpg"
              alt="Bordered avatar"
            />
          </button>
        </li>
      )}

      {isOpen && (
        <div className="absolute flex flex-col items-left bg-black">
          <Link
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            href="/profile"
          >
            My Profile
          </Link>{" "}
          {user.profileType === "service" && (
            <Link
              onClick={toggleOpen}
              href="/profile/manageService"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Manage Services
            </Link>
          )}
          <button
          
            onClick={() => logout()}
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
