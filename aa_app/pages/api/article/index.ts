import { Db } from 'mongodb'
import user from '../../../src/models/user';
import { connectToDatabase } from "../../../src/service/db.service";
import { NextApiRequest,NextApiResponse } from "next";
import { useRouter } from 'next/router';
import { title } from 'process';
export default async function(req:NextApiRequest,res:NextApiResponse){
const { method } = req;
const db:Db=await connectToDatabase();
switch (method) {
     case 'POST':
      try {
        db.collection("articles").insertOne(req.body);
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
        const {user_id,result,remark,title}=req.body;        
          db.collection("articles").updateOne(
            {$and:[{user_id:user_id,title:title}]},
            {$set:
              {
                Status:result,
                Remark:remark
              }
            }
          )
            res.status(201).json({ success: true})
      }catch(e){
        console.error(e)
      }
      break
  }

}
