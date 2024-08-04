import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import zodValidation from "@/lib/zod";


export async function POST(req: NextRequest) {
    const body = await req.json();

    const valid = zodValidation(body);
    
    if(!valid) {
        return NextResponse.json({
            message: "Input credentials are not correctly formatted"
        }, 
        {
            status: 406
        })
    }

    try {
        const usernameExist = await db.user.findUnique({
            where: {
                username: body.username
            }
        })
    
        if(usernameExist) {
            return NextResponse.json({
                message: "User with this username exists already"
            },
            {
                status: 403
            })
        }
            
    } catch(err) {

        return NextResponse.json({
            message: err
        })
    }

    try {

        const response = await db.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: body.password,
            }
        })

        return NextResponse.json({
            message: "User created successfully"
        })
    } catch(err) {

        return NextResponse.json({
            message: "Error while signin up"
        })
    }

}