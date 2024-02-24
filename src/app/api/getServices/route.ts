import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res)
  let response: any;
  // Use connect method to connect to the server
  await client.connect();
  try {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("services");
    const result = await collection.find({ serviceProviderId: res.serviceProviderId, isDeleted:false }).toArray();

    if (result !== null) {
      // console.log(result)
      response = { success: true, result };
    } else {
      response = { success: false, error: "No active service found" };
    }
  } catch (err: any) {
    // Handle any errors
    console.error(err);
    return Response.json({ success: false, message: err.message });
  } finally {
    // Close the connection
    await client.close();
  }

  return Response.json(response);
}
