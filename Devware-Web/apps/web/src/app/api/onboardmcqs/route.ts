import prisma from "../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
const jwtSecret = 'something'
export async function POST(req:NextRequest){
    const {userContent}:{
        userContent: string,
    } = await req.json();

    console.log(userContent)
    const token = cookies().get('userToken')?.value;
    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      await prisma.userOnboard.create({
        data:{
            email: decoded.email,
            content: userContent
        }
      })
      return NextResponse.json({success: true, msg: "mcqs stored"});
    }catch(err){
        console.log(err)
        return NextResponse.json({success: false})
    }
} 
