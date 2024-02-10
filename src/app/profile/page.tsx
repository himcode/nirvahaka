import React from 'react'
import { cookies } from 'next/headers'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
const jwt = require('jsonwebtoken');
import type { Metadata, ResolvingMetadata } from 'next'
 

 
export async function generateMetadata(

  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const token: RequestCookie | undefined = cookies().get('token')
  
  const user = jwt.verify(token.value, "secret")
//  console.log(user)
 
  return {
    title: user.email,
      }
}

const Profile = () => {

  const token: RequestCookie | undefined = cookies().get('token')
  const user = jwt.verify(token.value, "secret")
  // console.log(user)

  return (
    <div>
 


    {user.email}
    


    
    </div>
  )
}

export default Profile