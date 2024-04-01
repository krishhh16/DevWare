import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.get("/", (req: any, res: any) => {
    console.log("Hello world")
    res.status(200)
})

app.post("/signup", async (req: any, res: any) => {
    const userExists = await prisma.user.findFirst({
        where: {
            
        }
    })

})

app.listen(3001, () => {
    console.log("Hello")
})
