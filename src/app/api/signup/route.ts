import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const req = await request.json();
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();
  // Use connect method to connect to the server
  let defaultData = {
    serviceProviderId: Date.now().toString().substr(-4, 4) + req.email.substr(0, 4) + req.profileType,
    createdAt: formattedDateTime,
    profileType: "user",
    profile: {
      name: "",
      email: "",
      phone: "",
    },
    services: [],
    isDisabled: false,
  };

  // Make a copy of req.body
  let requestBody = { ...req };

  // Exclude a specific property, for example, 'excludeThis'

  let dataToInsert = {
    ...defaultData,
    ...requestBody,
  };
  await client.connect();

  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");
  const insertResult = await collection.insertOne(dataToInsert);
  // console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  client.close();

  return Response.json({ success: true });
}
