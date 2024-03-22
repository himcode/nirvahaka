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
  const razorpayOrderId = formData.get("razorpay_order_id");
  const razorpayPaymentId = formData.get("razorpay_payment_id");
  const razorpaySignature = formData.get("razorpay_signature");
  const cookieStore = cookies();
  const token: RequestCookie | undefined = cookies().get("token");
  const user: any = jwt.verify(token.value, process.env.JWT_KEY);
  console.log(user);

  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();

  const expectedSignature = crypto
    .createHmac("sha256", "3UFrNGkdLR9apMa3dOUE1jvh")
    .update(body.toString())
    .digest("hex");
  const isAuthentuic = razorpaySignature === expectedSignature;
  let dataToInsert = {
    razorpayOrderId: razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId,
    razorpaySignature: razorpaySignature,
    amount: 500,
    transactionTime: formattedDateTime,
    userId: user.userId
  }

  if (isAuthentuic) {

    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const transaction = db.collection("transaction");
      const userCollection = db.collection("user")
      const insertResult = await transaction.insertOne(dataToInsert);
      const updateResult = await userCollection.findOneAndUpdate(
        { userId: user.userId },
        { $set: { tier: "paid", updatedOn: formattedDateTime } },
      )
      // Check if the update was successful
      if (updateResult) {
        // Return the updated document as JSON
        return Response.json({ success: true, updateResult: updateResult });
      } else {
        // Return an error message
        return Response.json({ success: false, message: "Update failed" });
      }
    } catch (err: any) {
      // Handle any errors
      console.error(err);
      return Response.json({ success: false, message: err.message });
    } finally {
      // Close the connection
      await client.close();
    }
  } else {
    return Response.json({ success: false });
  }

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

  return Response.json({});
}
