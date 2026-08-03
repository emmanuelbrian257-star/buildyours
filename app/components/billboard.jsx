import React, { useLayoutEffect, useRef, useState } from 'react'
import SplitType from "split-type"
import {gsap} from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { numericBreakpoints } from '@/constants/breakpoints'
import useAppReady from '@/hooks/AppReady'

gsap.registerPlugin(ScrollTrigger)

type billboard={
  title: string
  className?:string
}

const Billboard = ({title, className}:billboard) => {
  /* const [scale, setScale]=useState(typeof window!=='undefined'?{
    width:window.innerWidth,
    height:window.innerHeight
  }:{
    width:1200,
    height:1000
  }) */
  const heading=useRef()
  const container=useRef()
    const ready=useAppReady()


  
  

  useLayoutEffect(()=>{
    if(!ready) return

    const headingChars=new SplitType(heading.current,{
    type:'chars'
  })
  
    const ctx=gsap.context(()=>{
      gsap.from(headingChars.chars,{
        opacity:0,
        y:30,
        duration:0.5,
        stagger:'0.025',
        scrollTrigger:{
          trigger:container.current,
          start:window.innerWidth<numericBreakpoints.xs?"top 100%":'top 70%',
          end:'top 35%',
          scrub:1,
          //markers:true
          
        }
      })
    })

    return ()=>ctx.revert()
  },[ready])
  return (
    <div ref={container} className="sm:px-20">
        <h1 ref={heading} className={`${className} headingTitle`}>{title}</h1>
    </div>
  )
}

export default Billboard
