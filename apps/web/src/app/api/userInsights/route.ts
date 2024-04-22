import prisma from "../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
const jwtSecret = 'something'
export async function POST(req:NextRequest){
    const {userChat}  = await req.json();
    console.log(`userchat:-  ${userChat}`)
    const token = cookies().get('userToken')?.value;
    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      await prisma.userInsights.create({
        data:{
          email: decoded.email,
          content: userChat
        }
      })
      return NextResponse.json({success: true, msg: "feedback stored"});
    } catch(err){
      console.log(err);
      return NextResponse.json({success: false, msg:'internal server error'})
    }
} 
