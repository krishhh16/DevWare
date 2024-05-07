import prisma from "../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {email, feedback}: {
        email: string;
        feedback: string;
    } = await req.json();
    try{
    await prisma.feedback.create({
        data: {
            email,
            content: feedback
        }
    })

    return NextResponse.json({success: true, msg: "feedback stored"});

} catch(err) {
        return NextResponse.json({success: false, msg:'internal server error'})
    }
}
