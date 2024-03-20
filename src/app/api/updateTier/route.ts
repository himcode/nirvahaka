import { MongoClient } from "mongodb";
import { redirect } from 'next/navigation'
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
const formData = await request.formData()
  let response: string="test";
  redirect('/profile')
console.log(formData.get("razorpay_payment_id"))

  return Response.json({response});
}
