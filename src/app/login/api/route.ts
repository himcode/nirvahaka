import { error } from 'console';
import { MongoClient } from 'mongodb'
const jwt = require('jsonwebtoken');
import { cookies } from 'next/headers'

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
  const user = await collection.findOne({ email: res.email });
  console.log(user)
  client.close()
  if(user){
    if(res.email===user.email && res.password==user.password){
      const token = jwt.sign({ email: user.email }, 'secret');
      // console.log(token)
      cookies().set('token', token, { secure: true })

      return Response.json({ success:true, result:user, token:token })
    }else{
      return Response.json({ success:false, error:"Invalid Credentials"})
      
    }
  }
  return Response.json({ success:false, error:"User doesn't exist" })
  // the following code examples can be pasted here...
  }