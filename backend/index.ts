import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

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
        return res.status(403).json({msg: "user already exists with the following credentials", success: false})
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

app.listen(3001, () => {
    console.log("Hello")
})
