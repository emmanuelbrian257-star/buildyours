"use client"

import React, {ReactNode, useState, useMemo} from "react"
import {createTheme} from "@mui/material/styles"
import {ThemeProvider, CssBaseline} from "@mui/material"
import {useSelector} from "react-redux"
import {themeSettings} from "../../constants/theme"


const MainLayout=({children}:{children:ReactNode})=>{
    const mode=useSelector((state)=>state.global.mode)
    const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode])
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}

export default MainLayout
