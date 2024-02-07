const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://<username>:<passward>@mongodbcluster.2rqbxir.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // Send Data to MongoDB Atlas
    const db = client.db('College');
    const collection = db.collection('Students');

    // Insert Data
    const documents = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 40 }
    ];
    await collection.insertMany(documents);

    // Read data
    const cursor = collection.find();
    await cursor.forEach((doc) => {
      console.log(doc);
    });

    // Update Data
    const filter = { name: 'Alice' };
    const update = { $set: { name: 'Shubham Jaiswal!' } };
    const result = await collection.updateOne(filter, update);
    console.log(
      `${result.matchedCount} document(s) matched the filter criteria.`
    );
    console.log(`${result.modifiedCount} document(s) were updated.`);

    //delete Data
    const filter2 = { name: 'Bob' };
    const result2 = await collection.deleteOne(filter2);
    console.log(`${result2.deletedCount} document(s) deleted.`);
  } catch (error) {
    console.log('Error', error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
