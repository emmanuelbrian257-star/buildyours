"use client"

import React, { useState, useEffect } from 'react'
import { Chat } from "stream-chat-react"
import { StreamChat } from "stream-chat"
import 'stream-chat-react/dist/css/index.css'

import ChannelListContainer from '@/components/chat/ChannelListContainer'
import ChannelContainer from '@/components/chat/ChannelContainer'
import { useClientAdmin } from '@/hooks/ClientAdmin'
import { env } from "@/env/index" // Adjusted path alias

const Page = () => {
  const [createType, setCreateType] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [client, setClient] = useState<StreamChat | null>(null)
  
  const { chatClient, isLoading, error } = useClientAdmin()

  // Safely initialize client on hydration
  useEffect(() => {
    const apiKey = env.NEXT_PUBLIC_STREAM_API_KEY
    if (apiKey) {
      const instance = StreamChat.getInstance(apiKey)
      setClient(instance)
    }
  }, [])

  if (isLoading || !client) {
    return <div>Setting up your secure admin workspace...</div>
  }

  if (error) {
    return <div>Failed to load workspace. Please refresh.</div>
  }

  return (
    <div className="app_wrapper">
      <Chat client={chatClient || client}>
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
