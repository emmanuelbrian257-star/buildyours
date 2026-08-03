"use client"
import { LoaderContext } from '@/providers/LoaderProvider'
import React,{useEffect, useState} from 'react'
import { LazyLoader } from '../components/LazyLoader'
import Loader from '../components/Loader'

const MainPage = () => {
  const [isLoading, setIsLoading]=useState(false)

  

  const start=()=>{
    setIsLoading(true)
  }

  const stop=()=>{
    setIsLoading(false)
  }
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        start,
        stop
      }}
    >
          
          <LazyLoader/>     
          {isLoading&&(
            <Loader/>
          )}
    </LoaderContext.Provider>
  )
}

export default MainPage