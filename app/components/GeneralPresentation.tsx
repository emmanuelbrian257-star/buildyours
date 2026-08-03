import React,{useRef, useLayoutEffect} from 'react'
import gsap from "gsap"
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SplitType from "split-type"
import useAppReady from '@/hooks/AppReady'
import {Draggable} from "gsap/Draggable"
import { useLoader } from '@/hooks/LoaderProvider'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)

const presentationCard=[
    {
        id:'cutting-edge',
        title:'cutting-edge technologies',
        description:'We utilize the latest tools and technologies to ensure our solutions are both innovative and effective, keeping your business ahead of the competition.',
        backgroundImage:'bg-project-image'
    },
    {
        id:'strategy',
        title:'Strategic Expertise',
        description:'We employ powerful, result-driven strategies that are built on experience and data, ensuring sustainable growth and a competitive edge for your business.',
        backgroundImage:'bg-new-image'
    },
    {
        id:'solutions',
        title:'Customized solutions',
        description:'Our team crafts unique, tailor-made solutions that are specifically designed to address your business challenges and help you achieve your goals.',
        backgroundImage:'bg-image-project'
    }
]

const presentationCardServices=[
    {
        title:'Website Development',
        description:'Create engaging and responsive websites that attract and retain customers, driving business growth and success.',
        pricing:'starting at Ksh.30,000'
    },
    {
        title:'Web Hosting',
        description:'Reliable and secure web hosting solutions that ensure your website is always online and performs optimally.',
        pricing:'as low as $4'
    },
    {
        title:'Graphic Design',
        description:"Enhance your brand's visual appeal with our creative  and professional graphic design services.",
        pricing:'starting at Ksh.500'
    },
    {
        title:'App Development',
        description:'Develop high-quality mobile applications for android and IOS Platforms tailored to your business needs',
        pricing:'starting at Ksh. 100,000'
    }
]

const GeneralServices=()=>{
    return(
        <div className="sm:my-10 sxs:my-4">
            <h1  className="list-medium uppercase mb-3">
                Comprehensive IT services for your success.
            </h1>
            <div className="flex flex-col sm:px-16 items-center gap-3">
                <p className="font-bosch sxs:leading-7 sxs:text-[clamp(0.5rem,6vw,1.5rem)]">We provide a full range of IT services, including website development, mobile app development, UI/UX design, and 24/7 support. Our team is committed to delivering high-quality solutions that are easy to reach and designed to meet your business goals.</p>
            </div>
            {/* <div className="flex sm:flex-row sxs:flex-col flex-wrap sm:px-10 gap-4 rounded-lg justify-center">
            {presentationCardServices.map((card, index)=>(
            <div key={card} className="sm:w-[320px] bg-[#eff0ef] rounded-xl text-black  sm:py-32 sxs:py-10">
                <div>
                    <h2 className="sm:text-3xl sm:tracking-wider sxs:text-2xl font-grotesk">{card.title}</h2>
                    <p className="font-bosch mt-3 sm:max-w-lg sxs:leading-7 sxs:text-lg">{card.description}</p>
                </div>
            </div>
            ))}
            </div> */}
            </div>
    )
}
const GeneralPresentation = ({isReady, blogDetails}) => {
    const container=useRef()
    const heading=useRef()
    const imageContainer=useRef()
    const containerDescription=useRef()
    const loader=useLoader()


    useLayoutEffect(()=>{
        if(!isReady||!blogDetails) return;

        const containerChildren=imageContainer.current.children;
        const imageContainerChildren=[]
        Array.from(containerChildren).map((image,index)=>{
            const elem=document.getElementById(`containerDescription${index}`)
            imageContainerChildren.push(elem)
        })

        

        const ctx=gsap.context(()=>{
            gsap.set(containerChildren,{
            xPercent:(index)=>index*100
          })

            const tl=gsap.timeline({
                scrollTrigger:{
                    trigger: container.current,
                    start:'top top',
                    end:'bottom top',
                    pin:true,
                    //markers:true,
                    scrub:1,
                }
            })

            tl.to(containerChildren, {
                xPercent: 0,
                ease: 'Power.out',
                stagger: {
                  each:0.8,
                  ease:'linear'
                } // This creates the spacing/delay between each element's start
              });

              
                Draggable.create(imageContainerChildren,{
                    type:'x',
                    edgeResistance:0.0005,
                    inertia:true,
                    bounds:(index)=>imageContainerChildren[index]
            })
        })

        return ()=>ctx.revert()
    },[isReady, blogDetails])

    /* useLayoutEffect(()=>{
        if(!isReady) return
        const headingRef=new SplitType(heading.current,{
            type:'chars'
        })
        
        const ctx=gsap.context(()=>{
            gsap.from(headingRef.chars,{
                opacity:0,
                stagger:0.25,
                duration:.3,
                ease:'power.out',
                scrollTrigger:{
                    trigger:container.current,
                    start:'top center',
                    end:'+=300',
                    //scrub:1,
                    markers:true
                }
            })

            
        })
        return ()=>ctx.revert()
    },[isReady]) */
  return (
    <div ref={container} className="w-full py-16 overflow-hidden gap-10 text-center flex flex-col items-center">
        <div className="flex flex-col items-center">
            {/* <img src="/assets/bg004.png" className="object-contain sm:max-w-6xl max-h-max"/> */}
            <h1 ref={heading} className="font-grotesk sm:text-5xl mb-3  sxs:text-2xl uppercase text-white">
                why choose us
            </h1>
            <div className="flex flex-col items-center gap-3">
                <p className="list-small">We are committed to delivering exceptional IT solutions by leveraging the latest technologies offering unique strategies, and maintaining a customer-centric approach to meet our clients' diverse needs.</p>
                <div ref={imageContainer} className="relative flex w-full sm:flex-row sxs:flex-col h-[50vh] flex-wrap gap-4 rounded-lg justify-center">
                {presentationCard.map((card, index)=>(
                    <div key={card.id} className="absolute top-0 right-0 left-0 h-full">
                        <div  className={`relative ${card.backgroundImage} w-full h-full bg-cover bg-no-repeat bg-center text-black`}>
                        {/* <span>{index}.</span> */}
                        <div ref={containerDescription} id={`containerDescription${index}`} className="absolute bg-white bottom-0 left-0 max-w-sm py-1">
                            <h2 className="list-medium uppercase underline underline-offset-2">{card.title}</h2>
                            <p className="font-bosch sxs:leading-7 sxs:text-lg">{card.description}</p>
                        </div>
                    </div>
                    </div>
                ))}
                

            </div>
            </div>
            <GeneralServices/>
        </div>
    </div>
  )
}

export default GeneralPresentation