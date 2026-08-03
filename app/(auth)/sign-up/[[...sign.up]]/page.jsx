"use client"
import React from 'react'
import {LogIn} from "lucide-react"
import {SignUp} from "@clerk/nextjs"


  const beforeInjection=(svg)=>{
    svg.removeAttribute('style')
    /* const desiredWidth=250
    const desiredHeight=250

    svg.setAttribute('width',`${desiredWidth}px`)
    svg.setAttribute('height',`${desiredHeight}`)
    svg.setAttribute('viewBox',`0 0 1500 1500`) */

    svg.removeAttribute('width')
    svg.removeAttribute('height')

    svg.style.width = "clamp(15px, 60vw, 400px)";
    svg.style.height = "auto"

}

const SignUpForm = () => {
  return (
    <section className="relative h-full">
        <div className="fixed top-3 left-0 right-0 ">
          <div className="sm:px-4 xs:px-2 flex items-center justify-between">
              {/* <SvgIcon beforeInjection={beforeInjection}/> */}
              <div className="cursor-pointer flex gap-2 items-center" onClick={()=>{}}>
                  <LogIn stroke="#F5C9E0" width={30} height={30}/>
              </div>
          </div>
        </div>
        <div className='flex xs:flex-col h-full items-center sm:px-3 sm:flex-row gap-6 justify-center'>
          <SignUp/>
        </div>

    </section>
  )
}

export default SignUpForm
