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
        let arr=new Array();
        const str:string=req.body;
        const searcher=str.substring(1, str.length-1);
        arr=JSON.parse(JSON.stringify( await  db.collection("articles").find({title:{$regex:`^${searcher}`}}).toArray()));
        res.status(201).json({data:arr})
      } catch (error) {
        res.status(400).json({data:null })
      }
      break
     default:
      res.status(400).json({data:null})
      break
    
  }

}
