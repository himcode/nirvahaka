import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

export async function POST(request: Request) {

  const req = await request.json();
  
  let defaultData = {
    
    email:"",
    name:"",
    phone:"",
    alternatePhone:"",
    address:{
      pincode:"000000",
      city:"",
      state:"",
      line1:"",
      line2:""
    }
    
  };

  // Make a copy of req.body
  let requestBody = { ...req };

  // Exclude a specific property, for example, 'excludeThis'
  delete requestBody.userId;

  let dataToInsert = {
    ...defaultData,
    ...requestBody
  };
  
  console.log(dataToInsert)
  // Use connect method to connect to the server
  try {
  await client.connect();
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
    const collection = db.collection("user");
    
    const updateResult = await collection.findOneAndUpdate(
      { userId: req.userId },
      { $set: {profile:dataToInsert,updatedOn:formattedDateTime} },
      { returnDocument: 'after' } // Return the updated document
    );
    
    // Check if the update was successful
    if (updateResult) {
      // Return the updated document as JSON
      return Response.json({ success: true, updateResult: updateResult });
    } else {
      // Return an error message
      return Response.json({ success: false, message: 'Update failed' });
    }
  } catch (err:any) {
    // Handle any errors
    console.error(err);
    return Response.json({ success: false, message: err.message });
  } finally {
    // Close the connection
    await client.close();
  }

  // the following code examples can be pasted here...
}
