import prisma from '../../../../../../packages/db/index'
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, {JwtPayload} from 'jsonwebtoken'
const jwtSecret = 'something'

export async function POST(req : NextRequest) {
    const {data, field} = await req.json();
    const token = cookies().get('userToken')?.value;
    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
        if (field === 'post'){
        const userData = await prisma.knowledgeBase.create({
            data: {
                email: decoded.email,
                post: data
            }
        })} else if (field === 'resume'){
        const userData = await prisma.knowledgeBase.create({
            data: {
                email: decoded.email,
                resume: data
            }
        });

        return NextResponse.json({success:true})
        }
    
        return NextResponse.json({success: true}
        )} catch(err){
                console.log("something went wrong:" , err)
                return NextResponse.json({err, success: false})
        }
}