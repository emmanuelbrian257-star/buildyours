"use client"

import { LoaderContext } from "@/providers/LoaderProvider"
import React, {useContext} from "react"
import {DotLoader} from "react-spinners"
import {useTheme} from "@mui/material"

const Loader=()=>{
    const {isLoading}=useContext(LoaderContext)
    console.log(isLoading,"isLoading")
    const theme=useTheme()
    return(
        <section className={`fixed top-0 bottom-0 left-0 right-0 h-screen bg-black flex justify-center items-center`}>
            <div className="flex flex-col items-center">
                {/* <h1 className="font-bosch uppercase tracking-wide font-semibold">Loading</h1> */}
                <DotLoader
                    color="#fff"
                    size={30}
                    loading={isLoading}
                />
            </div>
        </section>
    )
}

export default Loader;