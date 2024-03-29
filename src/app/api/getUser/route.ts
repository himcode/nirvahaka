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
  const result = await collection.findOne({ userId: res.userId });
  // console.log('Inserted documents =>', result);
  let response: any;
  if (result !== null) {
    response = { success: true, profile:result.profile, profileType:result.profileType,tier:result.tier };
  } else {
    response = { success: false, error: "Email doesn't exist in the database" };
  }

  // the following code examples can be pasted here...
  client.close();

  return Response.json(response);
}
