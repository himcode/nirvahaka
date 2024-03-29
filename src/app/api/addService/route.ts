import { MongoClient, ObjectId } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const req = await request.json();
  const currentDateTime = new Date();
  let count = 0;
  let defaultData = {
    userId: req.userId,
    serviceId: "",
    sName: "",
    category: "",
    location: "",
    displayPicture: "",
    parameters: [],
    isActive: true,
    isDeleted: false,
    createdOn: currentDateTime,
    updatedOn: currentDateTime,
    validUpTo: "",
  };

  // Make a copy of req.body
  let requestBody = { ...req };

  // Exclude a specific property, for example, 'excludeThis'

  let dataToInsert = {
    ...defaultData,
    ...requestBody,
  };

  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("services");
    count = (
      await collection
        .find({ userId: req.userId })
        .toArray()
    ).length;
    dataToInsert.serviceId = req.userId + count;
    const updateResult = await collection.insertOne(dataToInsert);
    const userUpdate = await db.collection("user").updateOne(
      { userId: req.userId },
      {
        $push: { services: dataToInsert.serviceId },
      }
    );

    // Check if the update was successful
    if (updateResult) {
      // Return the updated document as JSON
      return Response.json({
        success: true,
        updateResult: updateResult,
        userUpdate,
      });
    } else {
      // Return an error message
      return Response.json({
        success: false,
        updateResult,
        message: "Update failed",
      });
    }
  } catch (err: any) {
    // Handle any errors
    console.error(err);
    return Response.json({ success: false, message: err.message });
  } finally {
    // Close the connection
    await client.close();
  }

  // the following code examples can be pasted here...
}
