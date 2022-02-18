import { NextApiRequest,NextApiResponse } from "next";
import { Db, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db.service";
import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
export default async function(req:NextApiRequest,res:NextApiResponse){
  console.log(req.body);
  
    interface n{
        _id:ObjectId,
        name:string,
        user_type:string,
        password:string
    }
    interface user{
        name:string,
        password:string,
        rememberme:boolean
    }
    try {
    const db:Db=await connectToDatabase()
    const userrr=JSON.parse(JSON.stringify(await db.collection("login_page").find({}).toArray()));
    let valu:string="";
    const logger:user=JSON.parse(req.body)
    const secret:any=process.env.SECRET_NAME
    userrr.map((r:n)=>{
        if(r.name==logger.name && r.password==logger.password){
        const claims = {user_type:r.user_type,_id:r._id,rememberme:logger.rememberme};
        const jwt = sign(claims, secret as string, { expiresIn: '1h' });
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        }))
        return res.status(200).json({status:"sucess",user:r.user_type,userid:r._id})
        }
        else{
            valu="failed";
        }
    })
   return res.json({status:valu,user:null,userid:null})
  } catch (e) {
    console.log("errrrrr");
    console.error(e)
    return res.status(400).json({status:"failed",user:null,userid:null})
  }
}