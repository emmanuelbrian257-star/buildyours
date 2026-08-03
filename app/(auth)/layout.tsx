import React, {ReactNode} from "react"
import type {Metadata} from "next"
import {ClerkProvider} from '@clerk/nextjs'
import MainLayout from "../components/ThemeProvider"

export const metadata:Metadata={
    title:'BuildyoursOAuth',
    description:'Buildyours Authentication Page'
}

const layout=async({children}:{children:ReactNode})=>{
    return(
            <ClerkProvider>
                <MainLayout>
                    <main className="h-screen w-screen">
                    <div className="flex [&>*]:flex-1 xs:flex-col lg:flex-row h-full">
                        <div className="h-full bg-image-project bg-cover bg-no-repeat bg-center"/>
                        <div className="bg-white gradient xs:px-2 sm:px-4 xs:py-6">
                        {children}
                        </div>
                    </div>
                </main>
                </MainLayout>
            </ClerkProvider>
    )
}

export default layout