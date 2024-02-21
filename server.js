import express from "express";
import ViteExpress from "vite-express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();

const server = app.listen(3000, "0.0.0.0", () =>
  console.log("Server is listening...")
);

const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);

app.get("/api", async (_, res) => {
  const result = await run().catch(console.dir);

  res.json(result);

  async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const db = client.db("project");
      const collection = db.collection("tickets");
      const tickets = await collection.find({}).toArray();
      const lanes = await db.collection("lanes").find({}).toArray();

      return {
        tickets,
        lanes
      };
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
});


ViteExpress.bind(app, server);