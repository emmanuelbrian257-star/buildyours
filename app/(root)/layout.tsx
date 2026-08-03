import React,{ReactNode} from "react"
import type {Metadata} from 'next'
import { LenisProvider } from "@/providers/LenisProvider"
import StoreProvider  from "../../providers/StoreProvider"
import MainLayout from "../components/ThemeProvider"
import NoSsr from "../components/NoSsr"


export const metadata:Metadata={
    title:'Buildyours',
    description:'Buildyours application'
}

const layout=({children}:{children:ReactNode})=>{
    return(
        <LenisProvider>
            <StoreProvider>
                <MainLayout>                    
                        <main>
                            {children}
                        </main>
                </MainLayout>
            </StoreProvider>
            
        </LenisProvider>
    )
}

export default layout