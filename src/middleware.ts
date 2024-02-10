import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
 
export function middleware(request: NextRequest) {
    let token = request.cookies.get('token')
    // const user = jwt.verify(token, 'secret');

    // console.log(token)
  if (request.nextUrl.pathname.startsWith('/profile')  ) {
    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
  }
 
  if (request.nextUrl.pathname.startsWith('/login')|| request.nextUrl.pathname.startsWith('/signup')) {
    if(token){
        return NextResponse.redirect(new URL('/', request.url))
    }
  }
}

// export const config = {
//   matcher: ['/profile/:path*', '/signup/:path*'],
// }