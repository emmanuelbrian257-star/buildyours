import { useLoader } from '@/hooks/LoaderProvider'
import React, { useState } from 'react'
import {useForm, Controller} from "react-hook-form"
import {Field, FieldGroup, FieldLabel} from "../../components/ui/field"
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { EMAIL_PLACEHOLDER } from '@/constants/index'
import confetti from "canvas-confetti"
import { Button } from '@/components/ui/button'
import toast from "react-hot-toast"
import { Label } from '@/components/ui/label'

import { runConfetti } from './CommonForms'

const EmailForm=({defaultValues, emailSchema, inputTextStyle})=>{
    const loader=useLoader()
    const form=useForm<FormData>({
                defaultValues,
                resolver: zodResolver(emailSchema)
            })
    
            const handleEmailSubmit=async(data)=>{
            const {email, message}=data;
            if(!email||!message){
                toast.success("Please provide an email", {
                    duration:10000
                })
                return;
            }
            loader.start()
            const response=await fetch('/api/mailsend',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })

            const result=await response.json()
            if(result){
                form.reset()
                runConfetti()
                toast.success(`${result.message}`,{
                    duration:10000
                })
                loader.stop()
            }
        }
    return(
         <form onSubmit={form.handleSubmit(handleEmailSubmit)}>
                <FieldGroup>
                    <div>
                        {Object.keys(defaultValues).map((field)=>(
                            <Controller
                                name={field}
                                control={form.control}
                                render={({field})=>(
                                    <Field>
                                        <div>
                                            <Label className="uppercase font-bosch sm:text-xl text-white">{field.name}</Label>
                                            <Input type={field.name!=='email'?"text":"email"} placeholder={EMAIL_PLACEHOLDER[field.name]} required {...field} className={`${inputTextStyle} border-0 rounded-none min-h-12 outline-none bg-white sxs:placeholder-shown:text-xs sm:placeholder:text-sm`}/>
                                        </div>
                                    </Field>
                                )}
                            />
                        ))}
                        <Button className="text-white bg-black text-center font-bosch py-6 w-full uppercase sm:text-xl sm:tracking-wider cursor-pointer" type="submit">
                            Email Us
                        </Button>
                    </div>
                </FieldGroup>
            </form>
    )
}


export default EmailForm;
