import { MongoClient, ObjectId } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {
  const req = await request.json();
  const currentDateTime = new Date();
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("services");
    
    const updateResult = await collection.findOneAndUpdate(
      { serviceId: req.serviceId },
      { $set: { isActive: false, isDeleted: true,updatedOn:currentDateTime } },
      { returnDocument: "after" } // Return the updated document
    );

    // Check if the update was successful
    if (updateResult) {
      // Return the updated document as JSON
      return Response.json({ success: true, updateResult: updateResult });
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
