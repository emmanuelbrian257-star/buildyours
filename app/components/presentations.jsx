import React, { useEffect, useState } from 'react'
import {groq} from "next-sanity"
import client from '../lib/sanity/client'
import AnimatedCube from "./Cube"

const Presentation = () => {
    const [presentation, setPresentation]=useState()
    const fetchDetailsQuery=groq`*[_type=="presentation"][0]`
        const fetchProfileDetails=async()=>{
            try{
                const profile=await client.fetch(fetchDetailsQuery)
                setPresentation(profile)
            }catch(error){
                console.error("Error fetching details",error)
            }
        }
    useEffect(()=>{
        fetchProfileDetails()
    },[])
    console.log(presentation,"presentation")
  return (
    <div className="text-white sm:w-[350px] h-[350px]">
        <AnimatedCube/>
    </div>
  )
}

export default Presentation
