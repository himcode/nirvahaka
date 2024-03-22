import { MongoClient } from "mongodb";
import { redirect } from 'next/navigation'
import { useAppSelector } from "../redux/store";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
const formData = await request.formData()
  let response: string="test";
  console.log(formData.get("razorpay_payment_id"))
  const userInfo = useAppSelector((state) => state.user);
  console.log(userInfo)
  redirect('/profile')

  return Response.json({response});
}
