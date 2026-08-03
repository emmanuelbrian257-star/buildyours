import React, {useEffect, useState} from "react"
import {LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined} from "@mui/icons-material"
import {AppBar, Button, Box, Typography, IconButton, InputBase, Toolbar, Menu, MenuItem, useTheme} from "@mui/material"
import {useDispatch} from "react-redux"
import FlexBetween from "./FlexBetween"
import {UserButton} from "@clerk/nextjs"
import { setMode } from "@/state/lib/index"


const Navbar=({isSidebarOpen, setIsSidebarOpen, currentUser})=>{
    console.log(currentUser,"currentUser")
    const dispatch=useDispatch()
    const theme=useTheme()
    const [anchorEl, setAnchorEl]=useState(null)

    const isOpen=Boolean(anchorEl)
    const handleClick=()=>{

    }
    const handleClose=()=>{

    }
    return(
        <AppBar
            sx={{
                position:'static',
                /* background:'none', */
                boxShadow:'none',
            }}
        >
            <Toolbar sx={{justifyContent:'space-between'}}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton color="inherit" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon/>
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search.."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                <FlexBetween gap="1.5rem">
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode==='dark'?(
                            <DarkModeOutlined sx={{fontSize:"25px"}}/>
                        ):(
                            <LightModeOutlined sx={{fontSize:"25px"}}/>
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{fontSize:"25px"}}/>
                    </IconButton>
                    <FlexBetween>
                        <Button onClick={handleClick} sx={{display:'flex', justifyContent:'space-between', alignItems:'center', textTransform:'none',gap:'1rem'}}>
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>
                                    {currentUser?.firstName||"Admin"}
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{color: theme.palette.secondary[300], fontSize:'25px'}}
                            />
                        </Button>
                        {/* <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={()=>setAnchorEl(null)}
                            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
                        >
                            Log Out
                        </Menu> */}
                       <UserButton/>

                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}


export default Navbar
