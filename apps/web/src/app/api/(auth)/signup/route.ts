import axios from "axios";
import prisma from "../../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
     
      const { username, email, password, displayName }: {
        username: string;
        email: string;
        displayName: string;
        password: string;
      } = await req.json();
  
      console.log(username, email, password);
      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      console.log(userExists);
      if (userExists) {
        return NextResponse.json({success: false, msg: 'user Already exists'}, {status: 200})
      }
      try {
        await prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });

        const response = await axios.get(`https://api.github.com/users/${username}`);



        console.log('User created');
        return NextResponse.json({success: true}, {status: 200})
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({success: true}, {status: 200})
      }
    
  }
  