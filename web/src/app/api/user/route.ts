import jwt, {JwtPayload} from 'jsonwebtoken'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const jwtSecret = 'something'
export function GET(req: NextRequest){
    const token = cookies().get('userToken')?.value;

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    return NextResponse.json({userData: decoded.email})
}