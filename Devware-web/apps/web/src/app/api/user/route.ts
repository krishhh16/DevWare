import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import prisma from '../../../../../../packages/db/index'
import { NextRequest, NextResponse } from "next/server";
const jwtSecret = 'something'
export async function GET(req: NextRequest){
    const token = cookies().get('userToken')?.value;
    try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    const userData = await prisma.user.findFirst({
        where: {email: decoded.email}
    })

    console.log(userData)
    if (!userData) {
        return NextResponse.json({success: false, msg: "Failed to fetch user data"})
    }
    return NextResponse.json({userName: userData.username, email: userData.email}
        )} catch(err){
            console.log(err)
            return NextResponse.json({success:false})
        }
}
