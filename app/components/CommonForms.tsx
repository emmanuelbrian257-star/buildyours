import { useLoader } from '@/hooks/LoaderProvider'
import React, { useState } from 'react'
import {useForm, Controller} from "react-hook-form"
import {Field, FieldGroup, FieldLabel} from "../../components/ui/field"
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { CHAT_EMAIL_PLACEHOLDER, EMAIL_PLACEHOLDER } from '@/constants/index'
import confetti from "canvas-confetti"
import { Button } from '@/components/ui/button'
import toast from "react-hot-toast"
import { Label } from '@/components/ui/label'
import {z} from "zod"
import { Upload } from 'lucide-react';
import {X} from "lucide-react"
import WhatsappChat from './WhatsappChat'
import { handleFormSubmission } from '../lib/form/actions'
import ChatForm from "./ChatForm"
import EmailForm from "./EmailForm"

export const runConfetti=()=>{
    confetti({
        particleCount:100,
        spread:70,
        origin:{y:0.6}
    })
}

const Form=({formElement, defaultValues, emailSchema, type, inputTextStyle})=>{
    const loader=useLoader()
    
    /* type FormData=z.infer<typeof emailSchema> */
            
    switch(formElement){
        case "email":   
        return(
           <EmailForm inputTextStyle={inputTextStyle} emailSchema={emailSchema} defaultValues={defaultValues}/>
        )

        case 'chat':
         return(
            <ChatForm inputTextStyle={inputTextStyle}  emailSchema={emailSchema} defaultValues={defaultValues}/>
        )

        case 'whatsapp':
            console.log('whatsapp being rendered')
        return <WhatsappChat/>

        default:
            return null;
    
    }
    
}

const CommonForms = ({emailSchema, defaultValues, formElement, type, inputTextStyle}) => {
  return (
    <Form inputTextStyle={inputTextStyle} emailSchema={emailSchema} defaultValues={defaultValues} formElement={formElement} type={type}/>
  )
}

export default CommonForms