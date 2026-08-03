"use client"

import React, {ReactNode, useState, useMemo, useEffect} from "react"
import {Box, useMediaQuery, ThemeProvider, CssBaseline} from '@mui/material'
import {createTheme} from "@mui/material/styles"
import {useSelector} from "react-redux"
import { themeSettings } from "@/constants/theme"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useClientAdmin } from "@/hooks/ClientAdmin"


const MainLayout=({children}:{children:ReactNode})=>{
    const isNonMobile=useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen]=useState(true)
    const mode=useSelector((state)=>state.global.mode)
    const theme=useMemo(()=>createTheme(themeSettings(mode)), [mode])

    const {currentUser}=useClientAdmin()

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{display:`${isNonMobile?"flex":"block"}`}} width="100%" height="100%">
                <Sidebar
                    currentUser={currentUser}
                    isNonMobile={isNonMobile}
                    drawerWidth="250px"
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Box sx={{flexGrow:1}}>
                    <Navbar
                        currentUser={currentUser}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default MainLayout