import axios from "axios";
import prisma from "../../../../../../../packages/db";
import { NextRequest, NextResponse } from "next/server";
import {Octokit} from 'octokit'
import jwt from "jsonwebtoken"
import {cookies} from "next/headers"

const jwtSecret = 'something'

export async function POST(req: NextRequest) {
      const { username, email, password, displayName, accessToken }: {
        username: string;
        email: string;
        displayName: string;
        password: string;
        accessToken: string
      } = await req.json();
     
      const octokit = new Octokit({ 
        auth: accessToken
      });

      const userExists = await prisma.user.findFirst({
        where: {
          email,
        }, 
      });

      console.log(userExists)

      if (!userExists) {
        await prisma.user.create({
          data: {
            email,
            username,
            password
          }
        })
      }

      const response = await octokit.request(`GET /users/{username}/repos`,{username})
      
      let arr = [];
      await Promise.all(response.data.map(async (i) =>{
        if(!i.fork){
          const res = await octokit.request('http://api.github.com/repos/{username}/{repo}/languages', {
            username,
            repo: i.name,
          })
          
          if(!(Object.keys(res.data).length === 0)){
            arr.push(res.data);
          }
        }
      }))
      
      let str = '';
      let random = arr.map(item =>{
          return Object.keys(item)
      });
      let final = random.map(item =>{
          return item.join(' ')
      });
      
      final.filter(item => {
           const newEle = item.split(' ');
            newEle.map(e =>{
             let pattern = new RegExp(e);
             let found = pattern.test(str);
             if(!found){
              str+=' '+e;
             }
           })
      });
      
      try {   
      await prisma.gHData.create({
        data : {
          email,
          content: str
        }
      });
     } catch(err){
      return NextResponse.json({success: false, msg: "Unique constraint"})
     }
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
        const token = jwt.sign({email}, jwtSecret);
        cookies().set('userToken', token, {
          httpOnly: true,
      });

      return NextResponse.json({success: true}, {status: 200})
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({success: false}, {status: 200})
      }
    
  }
  