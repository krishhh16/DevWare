import prisma from '../../../../../../packages/db/index'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, {JwtPayload} from 'jsonwebtoken'
const jwtSecret = 'something'

export async function POST(req : NextRequest) {
    const {post} = await req.json();
    const token = cookies().get('userToken')?.value;
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    
        const userData = await prisma.post.create({
            data: {
                email: decoded.email,
                post
            }
        })
    
        return NextResponse.json({success: true}
        )} catch(err){
                console.log(err)
                return NextResponse.json({err, success: false})
        }
}