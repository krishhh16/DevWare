import prisma from "../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
const jwtSecret = 'something'
export async function POST(req:NextRequest){
    const {}  = await req.json();
    const token = cookies().get('userToken')?.value;
    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    } catch(err){

    }

    
} 
