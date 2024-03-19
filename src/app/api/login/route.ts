import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
var CryptoJS = require("crypto-js");

export async function POST(request: Request) {
  const url: string | undefined = process.env.MONGO_URL;
  const client = new MongoClient(url);
  const dbName = process.env.MONGO_DB;
  const res = await request.json();
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");
  const user = await collection.findOne({ email: res.email });
  client.close();
  if (user) {
    let bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    );
    let password = bytes.toString(CryptoJS.enc.Utf8);
    let ubytes = CryptoJS.AES.decrypt(
      res.password,
      process.env.NEXT_PUBLIC_CRYPTO_KEY
    );
    let upassword = ubytes.toString(CryptoJS.enc.Utf8);
    if (res.email === user.email && upassword == password) {
      const token = jwt.sign(
        {
          serviceProviderId: user.serviceProviderId,
          profileType: user.profileType,
        },
        process.env.JWT_KEY
      );

      cookies().set("token", token, { secure: true });

      return Response.json({ success: true, user: user, token: token });
    } else {
      return Response.json({ success: false, error: "Invalid Credentials" });
    }
  }
  return Response.json({ success: false, error: "User doesn't exist" });
  // the following code examples can be pasted here...
}
