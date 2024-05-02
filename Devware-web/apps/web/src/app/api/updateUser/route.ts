import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import prisma from '../../../../../../packages/db';
import { NextRequest, NextResponse } from "next/server";
import z from "zod"

const jwtSecret = 'something'

export async function POST(req: NextRequest){
    const {data} = await req.json()
    
    const token = cookies().get('userToken')?.value;
    try {
        const decoded = await jwt.verify(token, jwtSecret) as JwtPayload;

        const userData = await prisma.user.findFirst({
            where: {email: decoded.email}
        })
        if (!userData){
            return NextResponse.json({msg: "Invalid auth token", success: false})
        }

        
        if (data.field === "email"){
                const emailSchema = z.coerce.string().email({message: "Invalid email address"});

                emailSchema.parse(data.data)
                await prisma.user.update({
                where: {
                    email: decoded.email
                },
                data: {
                    email: data.data
                }
            })
        
            const token = jwt.sign({email: data.data}, jwtSecret)

            cookies().set('userToken', token, {
                httpOnly: true,
            })
            return NextResponse.json({success: true})
        } else if (data.field === "username"){
            await prisma.user.update({
                where: {
                    email: decoded.email
                },
                data: {
                    username: data.data
                }
            })
            return NextResponse.json({success: true})

            
        }  else if (data.field === "password"){
            await prisma.user.update({
                where: {
                    email: decoded.email
                },
                data: {
                    password: data.data
                }
            })
            return NextResponse.json({success: true})

        }
    } catch(err){
                console.log(err)
                return NextResponse.json({msg:"internal server error", success: false})
            }
}
