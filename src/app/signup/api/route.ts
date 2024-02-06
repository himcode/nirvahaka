import { MongoClient } from 'mongodb'

export async function POST(request: Request) {

  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url);
  const dbName = 'nirvahaka';
    const res = await request.json()
    console.log(res)
    // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');
  const insertResult = await collection.insertOne([{email:res.email,password:res.password,user:res.userType}]);
  console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  client.close()
    return Response.json({ success:true })
  }