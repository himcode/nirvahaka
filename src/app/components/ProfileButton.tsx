'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
interface Props {
  user: any;
  handleLogout:()=> void;
}

export const ProfileButton: React.FC<Props>= ({user, handleLogout}) => {
  
   const router = useRouter();
   const logout = () => {
    handleLogout()
    router.push('/');
   }
   
  return (
      <div >
      {!user ?  (
          <li>
          <Link
            href="/login"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
            Login
          </Link>
        </li>
      ):
       (
          <li>
          <button
            onClick={()=>logout()}
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
            Logout
          </button>
        </li>
      )}
      </div>
  )
}

export default ProfileButton