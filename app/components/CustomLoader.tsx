import React, { useContext } from "react"
import useAppReady from "@/hooks/AppReady"
import { useLoader } from "@/hooks/LoaderProvider"
import { LoaderContext } from "@/providers/LoaderProvider"
import Loader from "./Loader"

const CustomLoader=({children}:{children:React.ReactNode})=>{
    const ready=useAppReady()
    const loader=useLoader()
    if(!ready) {
        return (
            <Loader/>
        )
    }
    //loader.stop()
    
    return children;
}

export default CustomLoader