import React,{ReactNode} from "react"
import type {Metadata} from "next"

const metadata:Metadata={
    title:'BuildyoursChat',
    description:'Buildyours ChatPage'
}

const layout=({children}:{children:ReactNode})=>{
    return(
        <main>
            {children}
        </main>
    )
}

export default layout