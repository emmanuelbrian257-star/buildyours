"use client"
import React, { useState } from 'react'
import BlogHomePage from '@/app/components/blog/home';
import { useParam } from '@/app/components/blog/ParamContext';
import Header from '@/app/components/header';
import Loader from '@/app/components/Loader';
import MainLayout from '@/app/components/ThemeProvider';
import { LoaderContext } from '@/providers/LoaderProvider';


interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogPage = () => {
  const [isLoading, setIsLoading]=useState(false)
  const {slug}=useParam()

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
      <MainLayout>
        <BlogHomePage blog={slug}/>
        {isLoading&&(
            <Loader/>
          )}
      </MainLayout>
    </LoaderContext.Provider>
        
  )
}

export default BlogPage