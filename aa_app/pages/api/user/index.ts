import { Db, ObjectId } from 'mongodb'
import user from '../../../src/models/user';
import multer from 'multer';
import nc from 'next-connect';
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
     case 'PUT':
       try{
         const db:Db=await connectToDatabase()
        const {user_id,imgUrl,user}=req.body;
        const id=new ObjectId(user_id);
          db.collection("login_page").updateOne(
            {_id:id},
            {$set:
              {
               profile_image: imgUrl
              }
            }
          )
        res.status(201).json({ success: true})
       }
       catch(e){
          console.error(e);
       }
}
}
