import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const req = await request.json();
  const currentDateTime = new Date();
  // Use connect method to connect to the server

  let x;
  if (req.userType === "normal") {
    x = {
      name: "",
      email: "",
      phone: "",
      address: {
        pincode: "000000",
        city: "",
        state: "",
        line1: "",
        line2: "",
      },
    };
  } else {
    x = {
      name: "",
      email: "",
      phone: "",
      address: {
        pincode: "000000",
        city: "",
        state: "",
        line1: "",
        line2: "",
      },
      company: {
        companyname: "",
        website: "",
        pan: "",
        gstIN: "",
        instagram: "",
      },
      tier:"free"
    };
  }
  let defaultData = {
    userId:
      Date.now().toString().substr(-4, 4) +
      req.email.substr(0, 4) +
      req.profileType,
    createdAt: currentDateTime,
    profileType: "user",
    profile: x,
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
