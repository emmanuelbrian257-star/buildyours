"use client"
import React, { useState } from 'react'
import {Box,useTheme, useMediaQuery} from "@mui/material"
import Customers from '@/app/components/admin/Customers'
import { LoaderContext } from '@/providers/LoaderProvider'
import {StreamChat} from "stream-chat"
import {Chat} from "stream-chat-react"
import ChannelListContainer from '@/app/components/chat/ChannelListContainer'
import { useClientAdmin } from '@/hooks/ClientAdmin'

import LatestChatContainer from '@/app/components/chat/LatestChatContainer'
import {env} from "../../../env/index"


const client=StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_API_KEY)

const AdminPage = () => {
  const theme=useTheme()
  const [isLoading, setIsLoading]=useState(false)
  const [newMessage, setNewMessage]=useState(false)
  const isNonMediumScreens=useMediaQuery("(min-width:1200px)")
  const [createType, setCreateType]=useState("")
    const [isCreating, setIsCreating]=useState(false)
    const [isEditing, setIsEditing]=useState(false)

    const {chatClient, isLoading:loading, error, currentUser}=useClientAdmin()

    if(loading) return <div>Setting up your secure admin workspace...</div>

  const start=()=>{
    setIsLoading(true)
  }
  const stop=()=>{
    setIsLoading(false)
  }
  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        start,
        stop
      }}
    >
      <Box>
        {/* <Header title="BUILDYOURS" subtitle="Admin Management"/> */}
      <Box
        mt="20px"
        /* display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div":{gridColumn: isNonMediumScreens?undefined:"span 12"}
        }} */
      >
        <Customers/>
        <div>
          <Chat client={client}>
            <LatestChatContainer/>
          </Chat>
        </div>
      </Box>
     </Box>
    {/*  {isLoading&&(
        <Loader/>
      )} */}
    </LoaderContext.Provider>
  )
}

export default AdminPage
