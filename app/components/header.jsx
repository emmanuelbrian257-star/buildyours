"use client"

import React,{useState, useEffect,ReactNode} from 'react'
import {ShoppingCart} from 'lucide-react'
import {useDispatch} from "react-redux"
import {Box, IconButton, useTheme} from "@mui/material"
import {LightModeOutlined, DarkModeOutlined} from '@mui/icons-material'
import { setMode } from '@/state/lib/index'
import SheetMenu from './Menu'

const Header = ({cartOpen, setCartOpen}) => {
    const [dialogOpen, setDialogOpen]=useState(false)
    const dispatch=useDispatch()
    const theme=useTheme()

        
  return (
    <>
        <section className="relative bg-blue-500">
        <div className={`fixed z-[999]  text-white sm:px-2 top-0 py-4 sxs:px-2 left-0 right-0`}>
        <div className="flex justify-end items-center">
           {/*  <h2 className="font-bosch uppercase sxs:tracking-wide sm:text-2xl">
                buildyours
            </h2> */}
            <div className="flex items-center justify-center gap-2">
                <div>
                    <IconButton onClick={()=>dispatch(setMode())}>
                        {theme.palette.mode==='dark'?(
                            <DarkModeOutlined sx={{fontSize:'25px', color:'black'}}/>
                        ):(
                            <LightModeOutlined sx={{fontSize:'25px',color:'black'}}/>
                        )}
                    </IconButton>
                </div>
                <h2 className="sm:text-xl font-bosch">Menu</h2>
                <div onClick={()=>setCartOpen(!cartOpen)} className="cursor-pointer z-[99]">
                    <ShoppingCart className="w-6 h-6"/>
                </div>
            </div>
            </div>

        </div>

            <SheetMenu dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} cartOpen={cartOpen} setCartOpen={setCartOpen}/>
    </section>
    
    </>

  )
}

export default Header
