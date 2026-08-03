import { sendMail } from "@/app/lib/mailsend/actions"
import {NextResponse} from "next/server"


export async function POST(request:Request){
    const {email,message}=await request.json()
    if(!email){
        return NextResponse.json({
            message:'No email provided!'
        })
    }

    try{
        await sendMail({email,message})

        return NextResponse.json({
            type:'success',
            message:'Thanks for sending me the email, I will reply to you as fast as possible 😀'
        })
    }catch(error){
        console.error("Error adding email!",error)
    }
}