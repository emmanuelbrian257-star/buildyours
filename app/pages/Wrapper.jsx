"use client"

import React, { useLayoutEffect, useRef, useState } from 'react'
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import SplitType from "split-type"

import useAppReady from '@/hooks/AppReady'
import Billboard from '../components/billboard'
import AnimatedCube from '../components/Cube'
import ImageSlider from '../components/ImageSlider'
import ClientResponse from '../components/ClientResponse'
import {useSelector} from "react-redux"

gsap.registerPlugin(ScrollTrigger)



const Wrapper = () => {
  const ready=useAppReady()
  const container=useRef()
  const presentationHeading=useRef()
  const mode=useSelector((state)=>state.global.mode)
  
  
  
 
  
  //console.log(presentationHeadingParent.innerHTML,"parent")
  useLayoutEffect(()=>{
    if(!ready) return
    const presentationHeadingChars=new SplitType(presentationHeading.current,{
    type:'chars'
  })

    const presentationHeadingLength=presentationHeadingChars.chars.length
    /* presentationHeadingChars.chars.forEach((char)=>(
        char.innerHTML=`<span>${char.innerHTML}</span>`
      )) */

      
    const ctx=gsap.context(()=>{

    presentationHeadingChars.chars.forEach((char,index)=>{
      char.parentNode.style.display="flex"
      char.parentNode.style.flexDirection="column"
    })
    const tl=gsap.timeline({
      scrollTrigger:{
        trigger:container.current,
        start:'top top',
        end:'+=1200',
        //scrub:1,
        pin:true,
        //markers:true
      }
    })

    tl.from(presentationHeadingChars.chars,{
      opacity:0,
      stagger:0.005,
      duration:0.95,
      x:(index)=>-(10-index)*20
    })


    })

    return ()=>ctx.revert()
  },[ready])


   
  return (
      <div ref={container} className={`${mode=='dark'?"text-white":'text-black'} flex relative flex-col gap-3`}>
          <Billboard className="text-center" title="We inspire, empower and build creative arsenols for your brand."/>
          <div className="flex flex-col">
              <div className="sm:grid relative sm:grid-cols-[repeat(2,minmax(650px,1fr))]  sxs:px-1 sm:px-10 gap-2">
                <div style={{width:'100%'}}>
                  <div className="h-[350px]">
                    <AnimatedCube/>
                  </div>
                   <div className="">
                  <p className="list-small">
                    Creating a future, where your creativity reaches wider audiences, your business grows beyond borders, and your brand connects effortlessly with the people who matter most. A future where creators, entrepreneurs, photographers, and businesses thrive together in one digital space-- building projects, inspiring stories, and shaping tomorrow
                  </p>
                  <ImageSlider/>
                </div>
                </div>
                <div className="">
                  <h1 ref={presentationHeading} className='upper'>buildyours</h1>
                </div>
                <div className="px-3">
                  <h1 className="headingTitle">Unmatched IT expertise with years of experience.</h1>
                  <p className="list-small">Our extensive experience in IT solutions helps us provide tailored services that meet your specific business needs. From website and software development to digital marketing and graphic design, we deliver results-driven strategies to help your business grow.</p>
                  <div className="sxs:block sm:hidden">
                    <ClientResponse/>
                  </div>
                 
                </div>
               
          </div>
            
          
      </div>
      </div>
  )
}

export default Wrapper
