import React, {useState, useEffect} from "react"
import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css";
import client, { urlFor } from "../lib/sanity/client";
import {groq} from 'next-sanity'

const fetchCardDetailsQuery=groq`*[_type=='experience'][0]`;
const ExperienceCard=({experience})=>{
    console.log(experience,"experience")
    return(
        <VerticalTimelineElement
            contentStyle={{
                background: "#fff",
                color: "#000",
            }}
            contentArrowStyle={{ borderRight: "7px solid  #232631" }}
            date={experience.createdAt}
            iconStyle={{ background: '#fff' }}
            icon={
                <div className='flex justify-center items-center w-full h-full'>
                <img
                    src={urlFor(experience.cardImage.asset._ref).url()}
                    alt={experience.subtitle}
                    className='w-[60%] h-[60%] object-contain'
                />
                </div>
      }
        >
             <div>
                <h3 className='text-black text-[24px] font-grotesk font-bold'>{experience.title}</h3>
                <p
                className='text-secondary text-[16px] font-semibold'
                style={{ margin: 0 }}
                >
                {experience.subtitle}
                </p>
            </div>

            <ul className='mt-5 list-disc ml-5 space-y-2'>
                {experience.cardTitle.map((point, index) => (
                <li
                    key={`experience-point-${index}`}
                    className='list-small'
                >
                    {point}
                </li>
                ))}
            </ul>
        </VerticalTimelineElement>
    )
}

const ClientResponse=()=>{
    const [cardDetails, setCardDetails]=useState(null)
    const fetchCardDetails=async()=>{
        try{
            const response=await client.fetch(fetchCardDetailsQuery)
            setCardDetails(response)
        }catch(error){
            console.error(error,"Error fetching card details...")
        }
    }

    useEffect(()=>{
        fetchCardDetails()
    },[])

    
    return(
        <div className="flex flex-col mt-20">
            <VerticalTimeline layout={"1-column-left"}>
                {cardDetails?.card?.map((experience,index)=>(
                     <ExperienceCard
                        key={`experience-${index}`}
                        experience={experience}
                    />
                    
                ))}
            </VerticalTimeline>
        </div>
    )
}

export default ClientResponse;