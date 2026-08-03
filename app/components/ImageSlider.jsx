import React,{forwardRef, useLayoutEffect, useRef} from 'react'
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {Draggable} from "gsap/Draggable"
import {InertiaPlugin} from "gsap/InertiaPlugin"
import useAppReady from '@/hooks/AppReady'


gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)



const ImageSlider = () => {
    const imageContainer=useRef()
    const parentContainer=useRef()
    const container=useRef()
    const ready=useAppReady()
    useLayoutEffect(()=>{

        if(!ready) return

        
        const ctx=gsap.context(()=>{
            let sections=gsap.utils.toArray(imageContainer?.current.children)
            const imageLength=Array.from(sections).length
            const timeline=gsap.timeline({repeat:-1, scrollTrigger:{
                trigger:parentContainer.current,
                start:'top 50%',
                end:'bottom top',
                //markers:true
            }})

            gsap.set(sections,{opacity:(index)=>index===0?1:0})

            sections.forEach((section,index)=>{
                const nextSection=sections[(index+1)%sections.length]
                timeline.to({},{duration:2});

                timeline.to(section,{
                    opacity:0,
                    duration:0.8,
                    ease:'power2.inOut'
                })

                timeline.to(nextSection,{
                    opacity:1,
                    duration:0.8,
                    ease:'power2.inOut'
                },"<")
            })

        })
        return ()=>ctx.revert()
       
    },[ready])
  return (
    <section ref={parentContainer} className="relative w-full sm:h-[500px] sxs:h-[250px] overflow-hidden">
        <ul ref={imageContainer}  className={`w-full h-full`}>
                    <li className="absolute left-0 right-0 top-0 w-full h-full">
                        <img src="/assets/demo1.jpg" className="object-cover w-full h-full"/>
                    </li>
                    <li className="absolute left-0 right-0 top-0 w-full h-full">
                         <img src="/assets/demo2.jpg" className="object-cover w-full h-full"/>
                    </li>
                    <li className="absolute left-0 right-0 top-0 w-full h-full">
                        <img src="/assets/demo3.jpg" className="object-cover w-full h-full"/>
                    </li>
                    
        </ul>
    </section>
  )
}

export default ImageSlider
