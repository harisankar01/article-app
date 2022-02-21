import { NextApiRequest,NextApiResponse } from "next";
import { Db, ObjectId } from 'mongodb'
import { connectToDatabase } from "../../src/service/db.service";
import { compare } from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
export default async function(req:NextApiRequest,res:NextApiResponse){  
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
    let user:ObjectId=new ObjectId();
    let type:string="";
    let ff:boolean=false;
    const logger:user=JSON.parse(req.body)
    const secret:any=process.env.NEXT_PUBLIC_SECRET_NAME
    userrr.map((r:n)=>{
        if(r.name==logger.name && r.password==logger.password){
        const claims = {user_type:r.user_type,_id:r._id,rememberme:logger.rememberme};
        const jwt = sign(claims, secret , { expiresIn: '1h' });
        res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 3600,
          path: '/'
        }))
        ff=true;
        user=r._id;
        type=r.user_type;
        }
        else{
            valu="failed";
        }
    })
    if(ff){
      return res.status(200).json({status:"sucess",user:type,userid:user})
    }
    else{
         return res.json({status:valu,user:null,userid:null})
    }

  } catch (e) {
    console.error(e)
    return res.status(400).json({status:"failed",user:null,userid:null})
  }
}