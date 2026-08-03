import React, { useState } from "react"
import { ChannelList, useChatContext, WithComponents, ChannelPreviewUIComponentProps  } from "stream-chat-react";
import {useRouter} from "next/navigation"
import ChannelContainer from "./ChannelContainer"

// Optional: Keep filters stable outside the component so they don't recreate on every render
const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

/* const CustomDashboardPreview = (props: ChannelPreviewUIComponentProps) => {
  const { channel, lastMessage, latestMessagePreview } = props
  const router = useRouter()

  const channelName = channel.data?.id || "Chat Room"
  const latestMessageText = lastMessage?.text || "No messages yet"

  console.log(props.latestMessagePreview,"props")

  const handleChannelClick = () => {
    // Safely redirect to your actual chat page with the channel ID
    router.push(`/chat?channelId=${channel.id}`)
  }

  return (
    <div 
      onClick={handleChannelClick} 
      className="channel-preview__item single"
      style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}
    >
      <h4>{channelName}</h4>
      <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>{latestMessageText}</p>
    </div>
  )
} */

const ChannelListContent = () => {
    const { client } = useChatContext();

    // 1. Stream's ChannelList handles query and display automatically. 
    // Just ensure the filter object is memoized or defined correctly.
    const filters = { members: { $in: [client.userID] } };

    return (
        <div className="channel-list__list__wrapper">
            {/* ChannelList automatically handles watch() and state management for you */}
           
                <ChannelList
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilter}
            />
        </div>
    )
}

const ChannelListContainer = () => {
    const [toggleContainer, setToggleContainer] = useState(false)
    
    return (
        <div className="channel-list__container">
            <ChannelListContent />
  
        </div>
    )
}

export default ChannelListContainer;
