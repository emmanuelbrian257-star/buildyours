import React,{ReactNode} from "react"
import type {Metadata} from "next"
import StoreProvider from "@/providers/StoreProvider"
import MainLayout from "@/app/components/ThemeProvider"
import {ParamProvider} from "../../components/blog/ParamContext"

const metadata:Metadata={
    title:'',
    description:''
}



const BlogsPage=async({children, params}:{children:ReactNode, params:Promise<{slug:string}>})=>{
    const {slug}=await params;
    return(
        <StoreProvider>
           <ParamProvider slug={slug}>
                <main>
             {children} 
            </main>
           </ParamProvider>
        </StoreProvider>
        
    )
}

export default BlogsPage