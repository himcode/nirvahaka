import { MongoClient } from "mongodb";
// import { redirect  } from "next/navigation";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Razorpay from "razorpay";
import crypto from "crypto";
import { redirect } from "next/navigation";
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
  const validUpto = new Date();
  validUpto.setMonth(validUpto.getMonth() + 1);
  const expectedSignature = crypto
    .createHmac("sha256", "3UFrNGkdLR9apMa3dOUE1jvh")
    .update(body.toString())
    .digest("hex");
  const isAuthentic = razorpaySignature === expectedSignature;
  let dataToInsert = {
    razorpayOrderId: razorpayOrderId,
    razorpayPaymentId: razorpayPaymentId,
    razorpaySignature: razorpaySignature,
    amount: 500,
    transactionTime: currentDateTime,
    userId: user.userId,
  };
  let insertResult;
  let updateResult;
  let updateServices;
  if (isAuthentic) {
    try {
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const transaction = db.collection("transaction");
      const userCollection = db.collection("user");
      const services = db.collection("services");
      insertResult = await transaction.insertOne(dataToInsert);
      updateResult = await userCollection.findOneAndUpdate(
        { userId: user.userId },
        {
          $set: {
            tier: "paid",
            updatedOn: currentDateTime,
            validUpto: validUpto,
          },
        }
      );
      updateServices = await services.updateMany(
        { userId: user.userId },
        {
          $set: {
            tier: "paid",
            updatedOn: currentDateTime,
            validUpto: validUpto,
          },
        }
      );
    } catch (err: any) {
      // Handle any errors
      console.error(err);
      return Response.json({ success: false, message: err.message });
    } finally {
      // Close the connection
      await client.close();
    }
    // Check if the update was successful
    if (updateResult && insertResult) {
      redirect("/profile");
    } else if (updateResult) {
      // Return the updated document as JSON
      return Response.json({
        success: false,
        updateResult: updateResult,
        message: "transaction update failed",
      });
    } else if (insertResult) {
      // Return the updated document as JSON
      return Response.json({
        success: false,
        updateResult: updateResult,
        message: "user update failed",
      });
    } else {
      // Return an error message
      return Response.json({ success: false, message: "Update failed" });
    }
  } else {
    return Response.json({ success: false });
  }
}
