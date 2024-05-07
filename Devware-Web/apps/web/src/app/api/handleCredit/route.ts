import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import prisma from '../../../../../../packages/db/index'
import { NextRequest, NextResponse } from "next/server";
const jwtSecret = 'something'
export async function POST(req: NextRequest){
    const token = cookies().get('userToken')?.value;
    try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const email = decoded.email;
    const userData = await prisma.user.findFirst({
        where: {email}
    })

    console.log(userData)
    if(!userData){
        return NextResponse.json({success: false, msg: "invalid user creds"})
    }
    const credits = await prisma.credit.findFirst({
        where: {email}
    })

    const newCreds = await prisma.credit.update({
        data: {credit: credits.credit + 1},
        where: {email}
    })

    return NextResponse.json({success: true, credits: newCreds.credit})
    } catch(err){
            console.log(err)
            return NextResponse.json({err})
        }
}

export async function GET(req: NextRequest){
    const token = cookies().get('userToken')?.value;
    try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const email = decoded.email;
    const userData = await prisma.user.findFirst({
        where: {email}
    })

    console.log(userData)
    if(!userData){
        return NextResponse.json({success: false, msg: "invalid user creds"})
    }
    const credits = await prisma.credit.findFirst({
        where: {email}
    })
    
    if (!credits){
        await prisma.credit.create({
            data: {email}
        })
    }
    
    return NextResponse.json({success: true, credits: credits.credit})
    } catch(err){
            console.log(err)
            return NextResponse.json({err, success: false})
        }
}



