import nodemailer from "nodemailer"
import {readFileSync} from 'fs';

import {join} from "path"


const sendMail=async({email,message})=>{
    const emailTemplatePath=join(process.cwd(),"emails/email-template.html")
    const emailHtml=readFileSync(emailTemplatePath,"utf-8");

    const transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'emmanuelbrian257@gmail.com',
            pass:'igqvuwmqvzrmargh'
        }
    })

   try{
     const mailOptions={
        from:"emmanuelbrian257@gmail.com",
        to:email,
        subject:'New  Update',
        html:emailHtml
    }

    const clientMailOptions={
        from:"emmanuelbrian257@gmail.com",
        to:"emmanuelbrian257@gmail.com",
        replyTo:email,
        text:message
    }

    await transport.sendMail(mailOptions)
    await transport.sendMail(clientMailOptions)

   }catch(error){
    console.error("Failed to send email",error)
   }
}

export {sendMail}
