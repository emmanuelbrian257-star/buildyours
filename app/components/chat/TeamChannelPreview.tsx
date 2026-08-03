import React,{useEffect,useState} from 'react'
import {Avatar, useChatContext, useChannelStateContext} from "stream-chat-react"

const TeamChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, type}) => {
    const {client}=useChatContext()
    const {channel}=useChannelStateContext()
    const [members, setMembers]=useState([])

    useEffect(()=>{
            if(channel?.state?.members){
                const memberList=Object.values(channel.state.members).filter(({user})=> user.id!==client.userID);
                setMembers(memberList)
            }
        },[channel])


    const ChannelPreview=()=>{
        console.log(channel.state.members,"members-team")
        return(
        <p className="channel-preview__item">{channel?.data?.name || channel?.data?.id}</p>
    )
    };

    const DirectPreview=()=>{
        
        
        return(
            <div className="channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user?.id}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>
        )
    }
  return (
    <div className={channel?.id===channel?.id?"channel-preview__wrapper__selected":"channel-preview__wrapper"} onClick={()=>{
        setIsCreating(false);
        setIsEditing(false)
        setActiveChannel(channel)
        if(setToggleContainer){
            setToggleContainer((prevState)=>!prevState)
        }
    }}>
        {type==='team'?<ChannelPreview/>:<DirectPreview/>}
    </div>
  )
}

export default TeamChannelPreview