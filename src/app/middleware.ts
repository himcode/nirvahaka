import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/profile')) {
    const jwt = cookies().get('jwt')
    if(!jwt){
        return NextResponse.rewrite(new URL('/login', request.url))
    }
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}