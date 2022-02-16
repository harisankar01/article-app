import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections: { games?: mongoDB.Collection } = {}
export async function connectToDatabase () {
   dotenv.config();
   let bb:any
    bb=process.env.MONGODB_URI
   const client: mongoDB.MongoClient = new mongoDB.MongoClient(bb as string);
   await client.connect();
   const db: mongoDB.Db = client.db(process.env.MONGODB_DB);
    let cc:any;
    cc=process.env.COLLECTION_NAME
   const userinfo: mongoDB.Collection = db.collection(cc as string);
    collections.games = userinfo;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userinfo.collectionName}`); 
    return db; 
}