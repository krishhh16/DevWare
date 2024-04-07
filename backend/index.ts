import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { decode } from "punycode";
//initializing server and db clients + server preconfigs
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

const jwtSecret = "somethingCrazyAsHell"
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.get("/", (req: any, res: any) => {
    console.log("Hello world")
    res.status(200)
})

app.post("/signup", async (req: any, res: any) => {
    const {username, email, password} = req.body;

    console.log(username, email, password)
    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    })
    console.log(userExists)
    if (userExists) {
        return res.status(403).json({msg: "user already exists with the following credentials", success:false})
    }

    await prisma.user.create(
        {
            data: {
                username,
                email,
                password,
                isFeedback: false,
            }
        }
    )
    console.log('user created')
    res.status(200).json({msg: "User Created Successfully", success: true})

})

app.post("/signin",async (req, res) => {
    const {email, password} = req.body;
    
    try {
        // Check if email and password are provided
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
          where: { email }
        });
    
        if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Compare passwords
        const passwordMatch = existingUser.password == password;
    
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid password' });
        }
        
        const token = jwt.sign({email}, jwtSecret)
        console.log('user token created')
        res.cookie('userToken', token)
        res.status(200).json({success: true})
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    
})

app.get('/user', (req, res) =>{
    const token = req.cookies.userToken;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    console.log('hitted the server')

    res.json({
        userEmail: decoded.email,
    })
})

app.listen(3001, () => {
    console.log("Hello")
})
