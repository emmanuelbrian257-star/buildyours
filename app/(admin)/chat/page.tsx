export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

"use client"

import React, { useState, useEffect } from 'react'
import { Chat } from "stream-chat-react"
import { StreamChat } from "stream-chat"
import 'stream-chat-react/dist/css/index.css'

import ChannelListContainer from '../../components/chat/ChannelListContainer'
import { useClientAdmin } from '../../../hooks/ClientAdmin'
import ChannelContainer from '../../../app/components/chat/ChannelContainer'
import { env } from "@/env/index"

// ❌ REMOVED: const client = StreamChat.getInstance(...) (causes build/shadowing errors)

const Page = () => {
  const [createType, setCreateType] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  // Explicitly type the state so TypeScript knows it can hold StreamChat or null
  const [client, setClient] = useState<StreamChat | null>(null)
  
  const { chatClient, isLoading, error, currentUser } = useClientAdmin()

  useEffect(() => {
    const apiKey = env.NEXT_PUBLIC_STREAM_API_KEY
    if (apiKey) {
      const instance = StreamChat.getInstance(apiKey)
      setClient(instance)
    }
  }, [])

  // Guard Clause: Wait until BOTH hook loading finishes AND client state is populated
  const activeClient = chatClient || client

  if (isLoading || !activeClient) {
    return <div>Setting up your secure admin workspace...</div>
  }

  if (error) {
    return <div>Error loading workspace. Please try again.</div>
  }

  // TypeScript now knows activeClient is guaranteed to be a valid StreamChat instance here
  return (
    <div className="app_wrapper">
      <Chat client={activeClient}>
        <ChannelListContainer
          
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
