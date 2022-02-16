import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { Router, useRouter } from "next/router";
const secret:any=process.env.SECRET_NAME;
export default function middleware(req:NextRequest){
    const {cookies} =req;
    const jwt=cookies.auth;
    const url:string=req.url;
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