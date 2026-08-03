import React, { useState, useEffect, useMemo, useRef, useLayoutEffect, useContext } from 'react'
import {groq} from "next-sanity"
import client, { urlFor } from '@/app/lib/sanity/client'
import Header from '../header'
import gsap from "gsap"
import {useTheme} from "@mui/material"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {Draggable} from "gsap/Draggable"
import {InertiaPlugin} from "gsap/InertiaPlugin"
import {ClipLoader} from "react-spinners"
import useAppReady from '@/hooks/AppReady'
import { Button } from '@/components/ui/button'
import Calendar from "react-calendar"
import { BlogDetailsQueResult } from '@/app/lib/sanity/types'
import Slider from '../Slider'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import "react-calendar/dist/Calendar.css"
import CommonForms from '../CommonForms'
import { emailSchema } from '@/app/lib/zod/validation'
import { numericBreakpoints } from '@/constants/breakpoints'
import { useLoader } from '@/hooks/LoaderProvider'
import { LoaderContext } from '@/providers/LoaderProvider'


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)




const BookingCard=()=>{
  const [date, setDate]=useState(new Date())
  return(
     <Card className="w-full max-w-sm py-3">
      <CardHeader>
        <CardTitle className="font-grotesk uppercase sm:text-2xl sxs:text-base">Get started Today!</CardTitle>
        <CardDescription className="font-bosch sm:text-2xl">
          Schedule a consultation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 items-center">
              <span className="sm:text-2xl font-grotesk sxs:text-base">Ksh. 1200</span>
              <span className="text-sm line-through text-black">Ksh: 1349</span>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Calendar next2Label={null} prev2Label={null} onChange={setDate} value={date} selectRange={true}/>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="cardButton">
          Book now
        </Button>
      </CardFooter>
    </Card>
  )
}


// We filter the array items inside the projection using the passed $currentSlug
// 1. Find the parent document containing the array
// 2. Reach into the 'card' array and extract ONLY the object matching the slug

const blogDetailsQuery = groq`*[_type == "blogcard"][0].card[blog->BlogTitle == $blogUrl || blog->slug.current match $blogUrl]{
  ...,
  "blog": blog->
}`;


const BlogHomePage = ({blog}) => {
  const theme=useTheme()
  const container=useRef()
  const ready=useAppReady()
  const readMore=useRef("")
  const [open, setOpen]=useState(false)
  const imageContainer=useRef()
  const [blogDetails, setBlogDetails]=useState([])
  const [cartOpen, setCartOpen]=useState(false)
  const loader=useLoader()
  const {isLoading}=useContext(LoaderContext)
  

  const handleOpen=()=>{
    setOpen(!open)
  }
  /* const ready=useAppReady() */
  const fetchBlogDetails=async()=>{
    try{
      const result=await client.fetch(blogDetailsQuery,{blogUrl:decodeURIComponent(blog)})
      setBlogDetails(result)      
    }catch(error){
        console.error(error,"Error occured")
      }
  }

  useEffect(()=>{
    fetchBlogDetails()
  },[])


  
  
  const blogDetailsLength=blogDetails?.length
  
  useLayoutEffect(()=>{
    console.log(blogDetailsLength, ready,'blogDetailsLength')
    if(!blogDetailsLength||!ready) return;

    
    const containerChildren=imageContainer.current.children
    const ctx=gsap.context(()=>{
       gsap.set(containerChildren,{
      xPercent:(index)=>index*100
    })

    /* Draggable.create(imageContainer.current,{
      type:'x',
      edgeResistance:'0.0005',
      
    }) */

    ScrollTrigger.create({
        trigger:container.current,
        start:'top top',
        end:window.innerHeight*Array.from(containerChildren).length,
        pin:true,
        //markers:false
      })

      const timeline=gsap.timeline({
        scrollTrigger:{
            trigger: imageContainer.current,
            start:'top 20%',
            // Adjust the end multiplier based on how long you want the total scroll to last
            end: () => `+=${containerChildren.length * 700}`,
            scrub: 1,
            markers: false
        }
      })

      timeline.to(containerChildren, {
          xPercent: 0,
          ease: 'linear',
          stagger: {
            each:0.8,
            ease:'Power.out'
          } // This creates the spacing/delay between each element's start
      });
        
    })

    return()=>ctx.revert()
  },[blogDetailsLength, ready])

  if(isLoading){
    return(
      <div className="flex h-screen max-h-screen items-center justify-center">
                {/* <h1 className="font-bosch uppercase tracking-wide font-semibold">Loading</h1> */}
                <ClipLoader
                    color="#fff"
                    size={30}
                    loading={isLoading}
                />
            </div>
    )
  }
  
  return (
    <section ref={container} className="overflow-hidden bg-black h-full">
      <Header cartOpen={cartOpen} setCartOpen={setCartOpen}/>
      <div ref={imageContainer} className="relative w-screen h-screen">
        {blogDetails?.map((blog)=>{
          readMore.current=blog.mainDescription;
        return(
          <div className="w-full flex [&>*]:flex-1 h-full absolute top-0 ">
              <div style={{backgroundImage:`url(${urlFor(blog.backgroundImage.asset._ref).url()})`}} className="w-full sxs:h-[350px] sm:h-full bg-cover bg-center bg-no-repeat"/>
              <aside className="max-h-sm overflow-y-auto sm:[&::-webkit-scrollbar]:w-4 [&::webkit-scrollbar]:bg-white">
                <div className="flex [&>*]:flex-1 sxs:flex-col">
                    {window.innerWidth<numericBreakpoints.xs&&(
                       <div style={{backgroundImage:`url(${urlFor(blog.backgroundImage.asset._ref).url()})`}} className="w-full bg-cover sm:hidden sxs:block h-full bg-center bg-no-repeat"/>
                    )}
                    <div  style={{backgroundColor: theme.palette.primary[800]}} className="flex flex-col gap-3">
                      <h1 className="headingTitle uppercase">{blog.heading[0].headingTitle}</h1>
                      <div>
                        <div className="font-bosch sm:text-2xl sm:p-3">
                            <span className="">{open?readMore.current:readMore.current.slice(0,200)}</span>
                            <Button onClick={()=>handleOpen()} className="cardButton sm:py-8 rounded-xl">read more</Button>
                        </div>
                        <Slider images={blog.image}/>
                        
                         
                      </div>
                </div>
              </div>
            </aside>
           </div>
        )})}
      </div>
      <div className="bg-white text-black flex sm:flex-row sxs:flex-col justify-between sm:px-16 sxs:px-2">
        <div className="mb-4 py-4 sm:max-w-xl">
        <h1 className="sm:text-5xl font-grotesk sxs:text-lg uppercase tracking-wide">book your design consultation</h1>
        <p className="px-2 font-bosch sm:text-lg">
          Bring clarity and creativity to your next project with professional interior design and visualization services. We help you make confident decisions by providing realistic previews that turn imagination into reality.
          Whether you're redesigning a single room or planning an entire hom, we're here to help you create spaces that are both beautiful and functional.
        </p>
        <div>
          <span className="upper">or</span>
          <CommonForms emailSchema={emailSchema} defaultValues={{email:'',message:''}} formElement="email"/>

        </div>
      </div>
      <aside className="sxs:self-start sm:self-end">
        <BookingCard/>
      </aside>
      </div>
    </section>
  )
}

export default BlogHomePage
