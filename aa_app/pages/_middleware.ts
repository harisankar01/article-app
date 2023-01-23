/* istanbul ignore file */
import { NextRequest, NextResponse } from "next/server";
export default function middleware(req:NextRequest){
    const {cookies} =req;
    const jwt=cookies.auth;
    const url:string=req.url;

    if(url.includes('/admin') || url.includes('/user') ){
        if(jwt){
        try{
            // const user= jose.jwtVerify(jwt, secret);
            return NextResponse.next();
        }catch(e){
            const url = req.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.rewrite(url)
        }
        }
        else{
            const url = req.nextUrl.clone()
            url.pathname = '/'
            return NextResponse.rewrite(url)
        }
    }
}

