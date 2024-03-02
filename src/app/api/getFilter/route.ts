import { MongoClient, ObjectId } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function GET(request: Request) {
 
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("services");
  const category = await collection.distinct("category");
  const location = await collection.distinct("location");
//   console.log(req.serviceId)
  // console.log('Inserted documents =>', result);
  let response: any;
  if (category !== null || location !==null) {
    response = { success: true, category,location };
  } else{
    response = { success: false, error: "No filter found" };
  }

  // the following code examples can be pasted here...
  client.close();

  return Response.json(response);
}
