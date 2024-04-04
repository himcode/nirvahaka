import React from 'react'
import Chat from '../components/Chat'
import './test.css'
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const jwt = require("jsonwebtoken");
const page = () => {
  let user: any;
  
  let token: RequestCookie | undefined = cookies().get("token");
  if (token?.value.length) {
    user = jwt.verify(token.value, process.env.JWT_KEY);
  }
  console.log(user)
  return (
    <div className='container mt-56 ml-56 border'><Chat userId={user.userId}></Chat></div>
  )
}

export default page