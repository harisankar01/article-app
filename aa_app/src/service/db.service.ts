import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export async function connectToDatabase () {
   dotenv.config();
   let bb:any
   bb=process.env.NEXT_PUBLIC_MONGODB_URI;
   const client: mongoDB.MongoClient = new mongoDB.MongoClient(bb as string);
   let cc:any;
   cc=process.env.NEXT_PUBLIC_MONGODB_DB;
   await client.connect();
   const db: mongoDB.Db = client.db(cc as string);
   return db; 
}