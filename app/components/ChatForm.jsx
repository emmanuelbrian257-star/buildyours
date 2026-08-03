import { useLoader } from '@/hooks/LoaderProvider'
import React, { useState } from 'react'
import {useForm, Controller} from "react-hook-form"
import {Field, FieldGroup, FieldLabel} from "../../components/ui/field"
import {zodResolver} from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input'
import { CHAT_EMAIL_PLACEHOLDER } from '@/constants/index'
import confetti from "canvas-confetti"
import { Button } from '@/components/ui/button'
import toast from "react-hot-toast"
import { Label } from '@/components/ui/label'
import {z} from "zod"
import { Upload } from 'lucide-react';
import {X} from "lucide-react"
import { handleFormSubmission } from '../lib/form/actions'
import { runConfetti } from './CommonForms'


const ChatForm=({emailSchema, defaultValues, inputTextStyle})=>{
    const [fileName, setFileName]=useState("")
    const loader=useLoader()
    const chatForm=useForm<FormData>({
                defaultValues,
                resolver: zodResolver(emailSchema)
            })

            const onInvalid=(errors)=>{
                console.log("Form Validation Failed:", errors)
            }

            const handleChatSubmit=async(data)=>{
                if(!data) return;

                const {email, phonenumber, message, attachment}=data
                 const formData=new FormData()
                formData.append("email",email)
                formData.append("phonenumber",phonenumber)
                formData.append("message",message)

                if(attachment){
                    formData.append("attachment",attachment)
                }
                

                loader.start()
                try{
                    const response=await handleFormSubmission(formData)
                    if(response?.success){
                        chatForm.reset()
                        runConfetti()
                        toast.success(`${response.message}`,{
                            duration:10000
                        })
                        loader.stop()
                    }
                }catch(error){
                    console.error('Error occured!',error)
                }
            }

    return(
        <form onSubmit={chatForm.handleSubmit(handleChatSubmit, onInvalid)}>
                <FieldGroup>
                    <div className="flex flex-col justify-center items-center ">
                        <div className="flex flex-col w-full ">
                            {Object.keys(defaultValues).map((field)=>(
                            <Controller
                                name={field}
                                control={chatForm.control}
                                render={({field})=>(
                                    <Field>
                                        <div className="my-2 cursor-pointer">
                                            {field.name==='attachment'?(
                                            <>
                                                {fileName?(
                                                <div className="flex px-2 justify-between item-center">
                                                    <p className="text-sm text-green-600 font-bosch sm:text-xl mt-1">
                                                     Selected file: <strong>{fileName}</strong>
                                                    </p>
                                                    <X width={30} height={30} className="bg-white text-black" onClick={()=>setFileName(null)}/>
                                                </div>
                                                ):(
                                                    <Input type="file" name={field.name} ref={field.ref} value="" onBlur={field.onBlur} accept="application/pdf" onChange={(event)=>{
                                                    const file=event?.target.files?.[0]
                                                    if(file){
                                                        field.onChange(file)
                                                        setFileName(file.name)
                                                        console.log(file,"fileName")
                                                    }
                                                    }}/>
                                                )}
                                            </>
                                            ):(
                                                <Input type={field.name!=='email'?'text':'email'} placeholder={CHAT_EMAIL_PLACEHOLDER[field.name]} required {...field} className={`${inputTextStyle}  border-0 rounded-none min-h-12 outline-none bg-white sxs:placeholder-shown:text-xs sm:placeholder:text-sm placeholder-shown:text-black`}/>
                                            )}
                                        </div>
                                    </Field>
                                )}
                            />
                        ))}
                        </div>
                        <Button className="text-white w-full bg-slate-400 hover:bg-slate-600 text-center font-bosch py-6 uppercase sm:text-xl sm:tracking-wider cursor-pointer" type="submit">
                            send message
                        </Button>
                    </div>
                </FieldGroup>
            </form>
    )
}


export default ChatForm;
