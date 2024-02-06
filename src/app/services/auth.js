import { MongoClient } from 'mongodb'
//Login




//Signup


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'nirvahaka';

const handler = async (req,res) => { 
    if (req.method == 'POST'){

        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('userDetails');
        
        // the following code examples can be pasted here...
        
        res.status(200).json({success:true})
    }
    else{
        res.status(200).json({success:false})
    }
    }

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

  export default handler