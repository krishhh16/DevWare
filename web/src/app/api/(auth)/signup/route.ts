import PrismaClient from "../../../../db/index"
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
     
      const { username, email, password }: {
        username: string;
        email: string;
        password: string
      } = await req.json();
  
      console.log(username, email, password);
      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      console.log(userExists);
      if (userExists) {
        return NextResponse.json({}, {status: 200})
      }
  
      try {
        await prisma.user.create({
          data: {
            username,
            email,
            password,
            isFeedback: false,
          },
        });
        console.log('User created');
        return NextResponse.json({}, {status: 200})
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({}, {status: 200})
      }
    
  }
  