import React,{ReactNode} from "react"
import type {Metadata} from "next"
import StoreProvider from "@/providers/StoreProvider"
import MainLayout from "../components/admin/MainLayout"
import {ClerkProvider} from "@clerk/nextjs"

export const metadata:Metadata={
    title:'Buildyours',
    description:'BuildYours AdmimPage'
}

const layout=({children}:{children:ReactNode})=>{
    return(
        <ClerkProvider>
            <main>
                <StoreProvider>
                    <MainLayout>
                        {children}
                    </MainLayout>
                </StoreProvider>
            </main>
        </ClerkProvider>
    )
}

export default layout