import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import PrismaClient from "../../../db/index"
import { NextRequest, NextResponse } from "next/server";
import { UserEnum } from '@/app/app/profile/page';
import z from "zod"

const jwtSecret = 'something'
const prisma = new PrismaClient();

export async function POST(req: NextRequest){
    const {field, data} = await req.json()
    
    const token = cookies().get('userToken')?.value;
    try {
        const decoded = await jwt.verify(token, jwtSecret) as JwtPayload;
        console.log(decoded)
        const userData = await prisma.user.findFirst({
            where: {email: decoded.email}
        })
        console.log(userData)
        if (!userData){
            return NextResponse.json({msg: "Invalid auth token", success: false})
        }

        
            if (field === "email"){
                const emailSchema = z.coerce.string().email({message: "Invalid email address"});

                emailSchema.parse(data)
                console.log('something is crazy today')
                await prisma.user.update({
                where: {
                    email: decoded.data
                },
                data: {
                    email: data
                }
            })
        
            const token = jwt.sign({data}, jwtSecret)

            cookies().set('userToken', token, {
                httpOnly: true,
            })
        } else if (field === "username"){
            await prisma.user.update({
                where: {
                    email: decoded.data
                },
                data: {
                    username: data
                }
            })
        }

        return NextResponse.json({success: true})
        
    
        return NextResponse.json({userName: userData.username, email: userData.email}
            )} catch(err){
                console.log(err)
                return NextResponse.json({msg:"internal server error"})
            }
}
