import React, { useState } from 'react'
import CommonForms from './CommonForms'
import {useTheme} from "@mui/material"
import {z} from "zod"

const orderedList=[
  {
    id:'news',
    title:'news',
    list:[
      "Agency News",
      "Brand News",
      "Industry News",
      "Marketing Resources",
      "Interviews",
      "Awards",
      "Web Design"
    ]
  },
  {
    id:'work',
    title:'work',
    list:[
      "Ad Campaigns",
      "Branding",
      "Case Studies",
      "Social Media Campaigns",
      "Website Design",
    ]
  },
  {
    id:'blog',
    title:'blog',
    list:[
      "Marketing",
      "SEO&SEM",
      "Virtual Reality",
      "AI Marketing"
    ]
  }
]

const MAX_FILE_SIZE=5*1024*1024;
const ACCEPTED_FILE_TYPES=["application/pdf"]

const email=z.object({
    email:z.string().email(),
    message:z.string().min(10)
})

const chat=z.object({
    email:z.string().email(),
    phonenumber: z.string().regex(/^\+[1-9]\d{1,14}$/, {
        message: "Invalid phone number format (E.164 required)"
    }),
    message:z.string().min(15),
    attachment: z
    .any()
    // 1. Ensure a file was actually provided (if it's required)
    .refine((file) => file instanceof File, "Please upload a file.")
    
    // 2. Check the size directly on the file object
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
    
    // 3. Check the type directly on the file object
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), "Only .pdf format is supported."),
    /* attachment: z.any()
        .refine((files) =>!files|| files?.length === 1 || files.length===0, "You can only upload one file")
        .refine((files) =>!files ||files.length===0|| files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine((files) =>!files || files.length===1 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf format is supported.") */
})

const Footer = () => {
  const theme=useTheme()
  const [selectValue, setSelectValue]=useState("email")
  const selectedValue=["email","whatsapp","chat"]
  
  
  const emailSchema={
    email:email,
    chat: chat
  } as const
    const defaultValues={
        email:{
          email:'',
          message:''
        },
        chat:{
          email:'',
          phonenumber:'',
          message:'',
          attachment:null
        } 
    } as const


  return (
    <div className="sm:px-2 sm:my-10">
        {/* <h1 className='upper'>email</h1> */}
        <div className="flex text-black mb-3 bg-white sm:flex-row sxs:flex-col gap-2 [&>*]:flex-1">
          <div className="">
            <ul className="list-none flex sxs:p-2 sm:p-4 sm:gap-2 justify-between">
              {orderedList.map((list)=>(
                <div key={list.id}>
                  <h2 className="uppercase font-grotesk sm:text-xl sxs:text-lg">
                    {list.title}
                  </h2>
                  {list.list.map((item)=>(
                    <li className="sm:text-xl font-bosch sxs:text-sm  cursor-pointer">{item}</li>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div /* style={{backgroundColor: theme.palette.primary[300]}} */ className="flex sm:flex-row flex-col sm:[&>*]:flex-1">
            <div className="grid gap-3">
              <div className="flex gap-2 items-center">
                <h2 className="font-grotesk sxs:text-lg sm:text-2xl">Want to start out today!</h2>
              <div>
                <select className='bg-black p-2 cursor-pointer outline-none' value={selectValue} onChange={(e)=>setSelectValue(e.target.value)}>
                  {selectedValue.map((item)=>(
                        <>
                          <option value={item}>{item}</option>
                        </>
                      ))}
                </select>

                {/* <Select onValueChange={handleValueChange}>
                  <SelectTrigger className="w-full max-w-52">
                    <SelectValue placeholder="How you want to reach us"/>
                  </SelectTrigger>
                  <SelectContent className="bg-black">
                    <SelectGroup>
                      <SelectLabel>Messaging</SelectLabel>
                      {selectedValue.map((item)=>(
                        <SelectItem value={item}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
              </div>
              </div>
              <CommonForms inputTextStyle={"text-black"} emailSchema={emailSchema[selectValue]} defaultValues={defaultValues[selectValue]} formElement={selectValue}/>
            </div>
           
        </div>


    </div>
  )
}

export default Footer
