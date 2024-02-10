import { MongoClient } from 'mongodb'
const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);
const dbName = 'nirvahaka';

export async function POST(request: Request) {

  console.log(request)
    const res = await request.json()
    console.log(res)
    // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');
  const insertResult = await collection.insertOne({email:res.email,password:res.password,userType:res.userType});
  console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  client.close()
    console.log(Response)
    return Response.json({ success:true })
  }