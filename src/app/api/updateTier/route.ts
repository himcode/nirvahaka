import { MongoClient } from "mongodb";
import { redirect } from "next/navigation";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Razorpay from "razorpay";
import crypto from "crypto";
export async function POST(request: Request) {
  const formData = await request.formData();
  const razorpayOrderId = formData.get("razorpayOrderId");
  const razorpayPaymentId = formData.get("razorpayOrderId");
  const razorpaySignature = formData.get("razorpayOrderId");
  const cookieStore = cookies();
  const token: RequestCookie | undefined = cookies().get("token");
  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  console.log(user);

  const body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", "3UFrNGkdLR9apMa3dOUE1jvh")
    .update(body.toString())
    .digest("hex");
  const isAuthentuic = razorpaySignature === expectedSignature;

  // if (isAuthentuic) {
  //   try {
  //     await client.connect();
  //     const currentDateTime = new Date();
  //     const formattedDateTime = currentDateTime.toLocaleString();
  //     console.log("Connected successfully to server");
  //     const db = client.db(dbName);
  //     const collection = db.collection("payment");

  //     const updateResult = await collection.findOneAndUpdate(
  //       { userId: user.userId },
  //       { $set: { tier: "paid", updatedOn: formattedDateTime } },
  //       { returnDocument: "after" } // Return the updated document
  //     );

  //     // Check if the update was successful
  //     if (updateResult) {
  //       // Return the updated document as JSON
  //       return Response.json({ success: true, updateResult: updateResult });
  //     } else {
  //       // Return an error message
  //       return Response.json({ success: false, message: "Update failed" });
  //     }
  //   } catch (err: any) {
  //     // Handle any errors
  //     console.error(err);
  //     return Response.json({ success: false, message: err.message });
  //   } finally {
  //     // Close the connection
  //     await client.close();
  //   }
  // } else {
  //   return Response.json({ success: false });
  // }

  // var instance = new Razorpay({
  //   key_id: "rzp_test_gKANZdsNdLqaQs",
  //   key_secret: "3UFrNGkdLR9apMa3dOUE1jvh",
  // });

  // var {
  //   validatePaymentVerification,
  //   validateWebhookSignature,
  // } = require("./dist/utils/razorpay-utils");
  // validatePaymentVerification(
  //   { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
  //   razorpaySignature,
  //   secret
  // );

  // console.log(formData.get("razorpay_payment_id"));
  redirect("/profile");

  return Response.json({ });
}
