import React, {useState,useLayoutEffect, useRef} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {Draggable} from "gsap/Draggable"
import {InertiaPlugin} from "gsap/InertiaPlugin"
import { urlFor } from '../lib/sanity/client'
import useAppReady from '@/hooks/AppReady'


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)


const Slider = ({slide, images, className}) => {
    const container=useRef()
    const imageLength=images.length
    const imageContainer=useRef()
    const parentContainer=useRef()
    const ready=useAppReady()
    useLayoutEffect(()=>{
        if(!ready) return
         const imageContainerWidth=imageContainer.current.lastChild.getBoundingClientRect().width
        let sections=gsap.utils.toArray(parentContainer.current.children);

        
        const ctx=gsap.context(()=>{
            const timeline=gsap.timeline({
                repeat:-1,
                scrollTrigger:{
                    trigger:imageContainer.current,
                    start:()=>"+=50",
                    end:()=>"+="+imageContainerWidth*(imageLength-1),
                    //markers:false
                }
        })

        for(let i=1; i<imageLength;i++){
            timeline.to(parentContainer.current,{
                x: -imageContainerWidth*i,
                duration:0.8,
                ease:'power2.out',
                
            },"+=1.5")
        }

        timeline.to(parentContainer.current,{
            x:0,
            duration:1,
            ease:'power2.inOut',
        },"+=1.5")

        
           /*  timeline.to(sections,{
                    x:`-${(Array.from(sections).length-1)*imageContainerWidth}`,
                    duration:10,
                    stagger:{
                        each: .8
                    },
                    scrollTrigger:{
                        trigger:imageContainer.current,
                        start:()=>"+=50",
                        end:()=>`+=${imageContainerWidth*(imageLength-1)}`,
                        markers:true,
                        scrub:true
                    }
            }) */

                /* Draggable.create(parentContainer.current,{
                type:'x',
                edgeResistance:0.0005,
                inertia:true,
                bounds:{
                    x:0
                }
            }) */
        })
        return ()=>ctx.revert()
    },[ready])

    
  return (
    <section  className="relative w-full sm sxs:h-[250px] overflow-hidden" ref={container}>
        <ul ref={parentContainer} style={{width:`${imageLength*100}%`}}  className={`${className} h-full flex list-none`}>
            {images&&images.map((image, index)=>(
                <li ref={imageContainer} className="w-full">
                    <img className="object-cover w-full h-full" src={urlFor(image.asset._ref).url()}/>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Slider