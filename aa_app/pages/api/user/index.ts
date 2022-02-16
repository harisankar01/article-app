import { Db } from 'mongodb'
import user from '../../../src/models/user';
import { connectToDatabase } from "../../../src/service/db.service";
import { NextApiRequest,NextApiResponse } from "next";
export default async function(req:NextApiRequest,res:NextApiResponse){
const { method } = req;
switch (method) {
     case 'POST':
      try {
        const db:Db=await connectToDatabase()
        db.collection("login_page").insertOne(req.body);
        res.status(201).json({ success: true})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }

}
