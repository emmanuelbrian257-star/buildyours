import React, { useEffect, useState, useContext } from 'react'
import Header from './header'
import SmoothScroll from './SmoothScroll'
import Wrapper from "../pages/Wrapper"
import ChartPresentation from "../pages/ChartPresentation"
import Container from "../pages/container"
import useAppReady from '@/hooks/AppReady'
import GeneralPresentation from './GeneralPresentation'
import {groq} from 'next-sanity'
import Footer from './Footer'
import { LoaderContext } from '@/providers/LoaderProvider'
import { FetchBlogDetailsQueryResult } from '../lib/sanity/types'
import client from '../lib/sanity/client'
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Player from './VideoPlayer'
import ClientResponse from './ClientResponse'



gsap.registerPlugin(ScrollTrigger)

const fetchBlogDetailsQuery=groq`*[_type=='card']{
  cardItem[]{
    ...,
    "blog":blog->
  }
}`


const DefaultHomePage = () => {
  const [blogDetails, setBlogDetails]=useState<FetchBlogDetailsQueryResult>()

  const [fontsLoaded, setFontsLoaded]=useState(false)

  const {isLoading}=useContext(LoaderContext)
  const ready=useAppReady()
    const [shoppingCartOpen, setShoppingCartOpen]=useState<boolean>(false)

    const fontLoaded=async()=>{
        await document.fonts.ready.then(()=>{
        setFontsLoaded(true)
    })
  }

  useEffect(()=>{
    fontLoaded()
  },[])

    const fetchBlogDetails=async()=>{
      try{
        const result=await client.fetch(fetchBlogDetailsQuery)
        setBlogDetails(result)
      }catch(error){
        console.error('Error occured while fetching',error)
      }
    }


    useEffect(()=>{
      if(!ready) return;
      ScrollTrigger.refresh()
    },[blogDetails, ready])



    useEffect(()=>{
      fetchBlogDetails()
    },[])
  
  return (
     <SmoothScroll>
        <div className={`${fontsLoaded?"opacity-100":"opacity-0"} duration-300 transition-all  overflow-hidden md:grid gap-2 grid-cols-2`}>
            <div className="">
              <div className="w-full">
                <Header cartOpen={shoppingCartOpen} setCartOpen={setShoppingCartOpen}/>
              </div>
               <Container/>
              <Wrapper/>
              <ChartPresentation blogDetails={blogDetails}/>
              {/* <GeneralPresentation blogDetails={blogDetails}/> */}
              <Footer/>
              </div>
            <div className="md:block sxs:hidden relative h-screen">
              <div className=" h-full">
                <Player src={"/assets/background_play.mp4"}/>
                <div>
                  {/* <h1 className="mt-20 upper">get started</h1> */}
                  <ClientResponse/>
                </div>
                <h1 className="my-10 upper">projects</h1>
                <div className="grid grid-cols-2 gap-2 justify-center items-center">
                  <img src="/assets/latest.jpg" className="object-cover"/>
                  <img src="/assets/latest01.jpg" className="object-cover"/>
                  <img src="/assets/latest02.jpg" className="object-cover"/>
                  <img src="/assets/latest03.jpg" className="object-cover"/>
                </div>
              </div>

            </div>
        </div>
     </SmoothScroll>
  )
}

export default DefaultHomePage