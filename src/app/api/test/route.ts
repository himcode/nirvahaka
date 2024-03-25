import { redirect } from "next/navigation"

export async function POST(request: Request) {
    redirect('/')
    return Response.redirect('/')
}