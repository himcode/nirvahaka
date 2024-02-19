import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const res = await request.json();

  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");
  const insertResult = await collection.insertOne({
    email: res.email,
    password: res.password,
    userType: res.userType,
  });
  // console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  client.close();

  return Response.json({ success: true });
}
