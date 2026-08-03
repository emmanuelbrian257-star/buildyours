"use client"

import React, { useState, useEffect, useMemo } from 'react'
import {Chat} from "stream-chat-react"
import {StreamChat} from "stream-chat"
import 'stream-chat-react/dist/css/index.css'
import ChannelListContainer from '../../components/chat/ChannelListContainer'
import Auth from '../../components/chat/Auth'
import { useClientAdmin } from '@/hooks/ClientAdmin'
import ChannelContainer from '@/app/components/chat/ChannelContainer'
import {env} from "../../../env/index"

const client=StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_API_KEY)
const authToken=true

const Page = () => {
    const [createType, setCreateType]=useState("")
    const [isCreating, setIsCreating]=useState(false)
    const [isEditing, setIsEditing]=useState(false)
    const [client, setClient]=useState()
    
    const {chatClient, isLoading, error, currentUser}=useClientAdmin()

    useEffect(() => {
    const apiKey = env.NEXT_PUBLIC_STREAM_API_KEY
    if (apiKey) {
      const instance = StreamChat.getInstance(apiKey)
      setClient(instance)
    }
  }, [])

    if(isLoading) return <div>Setting up your secure admin workspace...</div>

  return (
    <div className="app_wrapper">
        <Chat client={client}>
            <ChannelListContainer
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            />
            <ChannelContainer
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              createType={createType}
            />
        </Chat>
    </div>
  )
}
export default Page
