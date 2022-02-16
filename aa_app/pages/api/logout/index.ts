import { NextApiRequest,NextApiResponse } from "next";
import { serialize } from "cookie";
export default async function(req:NextApiRequest,res:NextApiResponse){
    const { cookies } = req;
    const jwt = cookies.auth;
  if (!jwt) {
    return res.json({status:"failed"});
  } else {
    const serialised = serialize("auth", null as any, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
   return res.status(200).json({status:"sucess"});
}
}