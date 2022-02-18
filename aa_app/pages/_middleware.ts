import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
const secret:any=process.env.SECRET_NAME;
export default function middleware(req:NextRequest){
    interface cook{
        user_type:string,
        _id:ObjectId,
        rememberme:boolean,
        iat:number,
        exp:number
    }
    const {cookies} =req;
    const jwt=cookies.auth;
    const url:string=req.url;
    // if(jwt && url.includes('/') && !url.includes('/user') && !url.includes('/admin')){
    //  const aa:cook=verify(jwt,secret) as unknown as cook
    //  if(aa.rememberme){
    //      if(aa.user_type==="Author"){
    //         return NextResponse.redirect(`/user/${aa._id}`);
    //      }
    //      else{
    //         return NextResponse.redirect(`/admin/${aa._id}`); 
    //      }
            
    //  }
    // }
    if(url.includes('/admin') || url.includes('/user') ){
        if(jwt){
        try{
            verify(jwt,secret);
            return NextResponse.next();
        }catch(e){
            return NextResponse.redirect("/")
        }
        }
        else{
            return NextResponse.redirect("/");
        }
    }
}