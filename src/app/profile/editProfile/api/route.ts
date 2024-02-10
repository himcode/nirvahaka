import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);
const dbName = 'nirvahaka';

export async function POST(request: Request) {
    const res = await request.json()

  console.log(request)
  let defaultData = {
    text: 'default text'
};
let requestBody = {...res}
delete requestBody.userType
let dataToInsert = {
    ...defaultData,
    ...res
};
    console.log(res)
    // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(res.userType);
//   const insertResult = await collection.insertOne({email:res.email,password:res.password,userType:res.userType});
const insertResult = await collection.insertOne(dataToInsert);
  console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  client.close()
    console.log(Response)
    return Response.json({ success:true })
  }