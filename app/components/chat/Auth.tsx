import React from 'react'
import CommonForms from '../CommonForms'
import {useTheme} from "@mui/material"
import {z} from "zod"

const Auth = () => {
    const theme=useTheme()
    const emailSchema=z.object({
        
    })
    const defaultValues={
        email:'',
        number:''
    }
  return (
    <div className="flex w-full h-screen sm:flex-row sxs:flex-col">
        <div className="flex-1" style={{backgroundColor: theme.palette.secondary[400]}}/>
        <div className="flex-1 h-full flex items-center">
            <div className="w-full">
                <h1></h1>
                <CommonForms defaultValues={defaultValues} emailSchema={emailSchema} formElement={"chat"}/>
            </div>
        </div>
    </div>
  )
}

export default Auth