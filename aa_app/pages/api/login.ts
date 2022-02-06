import { NextApiRequest,NextApiResponse } from "next";
import { Db } from 'mongodb'
import { connectToDatabase } from "../../src/service/db.service";
export default async function(req:NextApiRequest,res:NextApiResponse){
    interface n{
        _id:Number,
        name:string,
        user_type:string,
        password:string
    }
    interface user{
        name:string,
        password:string
    }
    try {
    const db:Db=await connectToDatabase()
    const userrr=JSON.parse(JSON.stringify(await db.collection("login_page").find({}).toArray()));
    let valu:string="";
    const logger:user=JSON.parse(req.body)
    userrr.map((r:n)=>{
        console.log(r.name);
        if(r.name==logger.name && r.password==logger.password){
            valu="sucess";
        }
        else{
            valu="failed";
        }
    })
    res.json({status:valu})
  } catch (e) {
    console.log("errrrrr");
    console.error(e)
    res.json({status:"failed"})
  }
}