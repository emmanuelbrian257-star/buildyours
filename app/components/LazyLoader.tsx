"use client"

import useAppReady from '@/hooks/AppReady'
import { useLoader } from '@/hooks/LoaderProvider'
import dynamic from 'next/dynamic'
import Loader from './Loader'
import DefaultPage from "./DefaultPage"
import { useEffect, useState } from 'react'
export const LazyLoader=()=>{
    const loader=useLoader()
    
    const ready=useAppReady()
        
        if(!ready){
            loader.start()
            return(
            <div className="flex min-h-screen  justify-center items-center">
                {/* <div>
                    <h1 className='font-bosch uppercase text-black sm:text-2xl'>
                        Loading...
                    </h1>
                </div> */}
                <Loader/>
                
                {}
            </div>
    )
        }
    return(
       <>
            <DefaultPage/>
       </>
    )
}