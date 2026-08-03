import React, { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { useRouter } from "next/navigation";

// Filters out non-messaging channels based on your criteria
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
};

const CustomChannelListWithPreviews = () => {
  const { client } = useChatContext();
  const router = useRouter();
  
  // Track only the unread channels and their respective latest message previews
  const [unreadChannels, setUnreadChannels] = useState([]);
  const [latestMessages, setLatestMessages] = useState({});

  // 1. Fetch channels initially and filter for UNREAD messaging channels
  useEffect(() => {
    const fetchUnreadChannels = async () => {
      if (!client.userID) return;
      
      try {
        const filters = { members: { $in: [client.userID] } };
        const sort = [{ last_message_at: -1 }];
        
        const channels = await client.queryChannels(filters, sort, {
          watch: true, 
          state: true,
        });

        const messagingChannels = customChannelMessagingFilter(channels);

        // Filter: Keep only channels where the current user has unread messages
        const filteredUnread = messagingChannels.filter(
          (ch) => ch.countUnread() > 0
        );

        setUnreadChannels(filteredUnread);

        // Map the initial latest messages for the unread channels
        const initialPreviews = {};
        filteredUnread.forEach((ch) => {
          const messages = ch.state.messages;
          if (messages.length > 0) {
            initialPreviews[ch.id] = messages[messages.length - 1].text;
          }
        });
        setLatestMessages(initialPreviews);
      } catch (error) {
        console.error("Error querying unread channels:", error);
      }
    };

    fetchUnreadChannels();
  }, [client]);

  // 2. Listen for global incoming messages to dynamically pull unread channels into view
  useEffect(() => {
    const handleNewMessage = (event) => {
      const { channel_id, message, channel_type } = event;
      
      // We only care about messaging channels and messages not sent by the current user
      if (channel_type === 'messaging' && channel_id && message && message.user.id !== client.userID) {
        console.log("New unread message caught:", message);

        // Update the latest message preview string
        setLatestMessages((prev) => ({
          ...prev,
          [channel_id]: message.text || "Sent an attachment/media",
        }));

        // Dynamically pull the channel into the unread list if it isn't already there
        setUnreadChannels((prevChannels) => {
          const channelExists = prevChannels.some((ch) => ch.id === channel_id);
          
          if (channelExists) {
            // Re-order to top since it just received a new message
            const targetChannel = prevChannels.find((ch) => ch.id === channel_id);
            const remaining = prevChannels.filter((ch) => ch.id !== channel_id);
            return [targetChannel, ...remaining];
          } else {
            // Find the underlying channel instance from the client active state and prepend it
            const fullChannelInstance = client.channel(channel_type, channel_id);
            return [fullChannelInstance, ...prevChannels];
          }
        });
      }
    };

    client.on("message.new", handleNewMessage);

    return () => {
      client.off("message.new", handleNewMessage);
    };
  }, [client]);

  const handleChannelClick = async (channel) => {
    // 1. Mark the channel as read instantly so it clears out of this view
    try {
      await channel.markRead();
    } catch (err) {
      console.error("Failed to mark channel as read:", err);
    }

    // 2. Filter it out of the current local unread UI array
    setUnreadChannels((prev) => prev.filter((ch) => ch.id !== channel.id));

    // 3. Route to your standard chat view page
    router.push(`/chat?channelId=${channel.id}`);
  };

  return (
    <div className="channel-list__list__wrapper">
      {unreadChannels.length === 0 ? (
        <p style={{ padding: "16px", color: "#888", textAlign: "center", fontSize: "14px" }}>
          You're all caught up! No unread messages.
        </p>
      ) : (
        unreadChannels.map((channel) => {
          const channelName = channel.data?.name || channel.data?.id || "Chat Room";
          const latestMessageText = latestMessages[channel.id] || "No messages yet";
          const unreadCount = channel.countUnread();

          return (
            <div
              key={channel.id}
              onClick={() => handleChannelClick(channel)}
              className="channel-preview__item single unread"
              style={{
                padding: "14px 12px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
                backgroundColor: "#f9fbfd" // Subtle background to signify unread status
              }}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: "600" }}>
                  {channelName}
                </h4>
                <p style={{ fontSize: "13px", color: "#444", margin: 0, fontWeight: "500" }}>
                  {latestMessageText}
                </p>
              </div>
              
              {unreadCount > 0 && (
                <span style={{
                  backgroundColor: "#005fff",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "2px 8px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginLeft: "8px"
                }}>
                  {unreadCount}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const LatestChatContainer = () => {
  return (
    <div className="channel-list__container">
      <CustomChannelListWithPreviews />
    </div>
  );
};

export default LatestChatContainer;