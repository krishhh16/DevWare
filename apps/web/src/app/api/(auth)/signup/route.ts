import axios from "axios";
import prisma from "../../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import {Octokit} from 'octokit'

export async function POST(req: NextRequest) {
     
      const { username, email, password, displayName, accessToken }: {
        username: string;
        email: string;
        displayName: string;
        password: string;
        accessToken: string
      } = await req.json();
      console.log(accessToken)
      const octokit = new Octokit({ 
        auth: accessToken
      });

      console.log(username, email, password);
      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      console.log(userExists);
      const response = await octokit.request(`GET /users/{username}/repos`,{
        username
      })
      


      let arr = [];
      console.log(response.data)
      const repos = response.data.map(async (i) =>{
        if(!i.fork){
          const response = await octokit.request('http://api.github.com/repos/{username}/{repo}/languages', {
            username,
            repo: i.name,
          })
          console.log("response: ",response.data);
          if(!(Object.keys(response.data).length === 0)){
            arr.push(response.data);
          }
        }
        console.log('current array:', arr);
        })

      
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




        console.log('User created');
        return NextResponse.json({success: true}, {status: 200})
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({success: true}, {status: 200})
      }
    
  }
  