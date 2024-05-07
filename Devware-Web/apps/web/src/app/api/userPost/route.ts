import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import prisma from '../../../../../../packages/db/index'
import { NextRequest, NextResponse } from "next/server";
const jwtSecret = 'something'

export async function POST(req: NextRequest){
    const token = cookies().get('userToken')?.value;
    const {post}:{post: string;} = await req.json();
    try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const email = decoded.email;
    const userData = await prisma.user.findFirst({
        where: {email}
    })

    console.log(userData)
    if(!userData){
        return NextResponse.json({success: false, msg: "invalid user"})
    }
    
    const posts = await prisma.userPost.create({
        data:{
            email,
            content:post
        }
    })
    
    return NextResponse.json({success: true, posts: posts})
    } catch(err){
            console.log(err)
            return NextResponse.json({err})
    }
}

export async function GET(req: NextRequest){
    const token = cookies().get('userToken')?.value;
    try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    const userPosts = await prisma.userPost.findMany({
        where: {email: decoded.email}
    })

    console.log(userPosts)
    if (!userPosts) {
        return NextResponse.json({success: false, msg: "Failed to fetch user data"})
    }
    return NextResponse.json({Posts: userPosts}
        )} catch(err){
            console.log(err)
            return NextResponse.json({success:false})
        }
}

