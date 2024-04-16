
import prisma from "../../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import {cookies} from "next/headers"
import jwt from "jsonwebtoken"
const jwtSecret = 'something'

export async function POST(req: NextRequest) {
      const {  email, password }: {
        email: string;
        password: string
      } = await req.json();
      
      try {
        if (!email || !password){
            return NextResponse.json({success: false, msg: "Send credentials please"});
        }

        const existingUser = await prisma.user.findFirst({
            where: {email}
        })

        if (!existingUser){
            return NextResponse.json({success: false, msg: "Invalid Cred."})
        }

        if(!(existingUser.password == password)){
            return NextResponse.json({success: false, msg: "Invalid Creden."})
        }

        const token = jwt.sign({email}, jwtSecret);

        cookies().set('userToken', token, {
            httpOnly: true,
        })

        return NextResponse.json({success: true})
      }catch (err){
    
        return NextResponse.json({msg: err, success: false})
      }
        
  }
