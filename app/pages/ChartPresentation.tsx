import React, {useLayoutEffect, useRef } from 'react'
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import { useLoader } from '@/hooks/LoaderProvider'
import CardDialog from '../components/Card'

gsap.registerPlugin(ScrollTrigger)


const ChartPresentation = ({blogDetails}) => {
    const container=useRef()
    const chartContainer=useRef()
    const loader=useLoader() 

    

    useLayoutEffect(()=>{
      if(!blogDetails||!chartContainer.current) return;

      const containerChildren=chartContainer.current.children

      
        const ctx=gsap.context(()=>{

          gsap.set(containerChildren,{
            yPercent:(index)=>index*100
          })
            ScrollTrigger.create({
                trigger:chartContainer.current,
                start:'top 20%',
                end:() => `+=${containerChildren.length * 500}`,
                pin:true,
                pinSpacing:true,
                //markers:false
            })

            const timeline=gsap.timeline({
              scrollTrigger:{
                  trigger: chartContainer.current,
                  start:'top 20%',
                  // Adjust the end multiplier based on how long you want the total scroll to last
                  end: () => `+=${containerChildren.length * 400}`,
                  scrub: 1,
                  markers: false
              }
            })

             timeline.to(containerChildren, {
                yPercent: 0,
                ease: 'linear',
                stagger: {
                  each:0.8,
                  ease:'linear'
                } // This creates the spacing/delay between each element's start
              });

            /* Array.from(containerChildren).map((child,index)=>{
              timeline.to(containerChildren[index],{
                y:0,
                scrollTrigger:{
                  trigger:chartContainer.current,
                  start:'top 40%',
                  end:()=>"+="+index*chartContainer.current.firstChild.getBoundingClientRect().height,
                  scrub:.5,
                  markers:true
                }
              })
            }) */
             

         
        
        
    })
        return ()=>ctx.revert()

  },[blogDetails])
  return (
          <div ref={chartContainer} className="relative overflow-hidden min-h-[450px]">
           {blogDetails&&blogDetails[0]?.cardItem.map((card, index)=>(
                <div style={{zIndex:`${index+10*50}`}}  className="absolute left-0 right-0 h-full w-full">
                    <CardDialog cardItem={card}/>
                </div>
           ))}

          </div>
  )
}

export default ChartPresentation