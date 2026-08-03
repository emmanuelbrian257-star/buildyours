import {SignIn} from "@clerk/nextjs"
import {useTheme} from "@mui/material"

export default function SignInPage(){
    const theme=useTheme()
    return(
        <div style={{backgroundColor:theme.palette.primary[300]}} className="flex h-full justify-center items-center py-8">
            <SignIn/>
        </div>
    )
}

/* 
    import React,{ReactNode} from "react"
import {ClerkProvider, SignInButton, SignUpButton, Show, UserButton} from "@clerk/nextjs"

const RootLayout=({children}:{children:ReactNode})=>{
    return(
        <ClerkProvider>
            <html lang="en">
        <body>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
          </header>
          {children}
        </body>
      </html>
        </ClerkProvider>
    )
}

export default RootLayout
*/