/* "use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamChat } from "stream-chat"

export const useClientAdmin = () => {
  // 1. Clerk provides everything we need right here in useUser
  const { isSignedIn, user, isLoaded } = useUser()
  
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Only proceed if Clerk is fully loaded, and a user is actively signed in
    if (!isLoaded || !isSignedIn || !user || chatClient || isConnecting) return

    let activeClient: StreamChat | null = null
    setIsConnecting(true)

    const initStream = async () => {
      try {
        // 2. Fetch the token from your secure Next.js API route
        const response = await fetch("/api/stream-token")
        
        if (!response.ok) {
          if (response.status === 403) {
            setError("Forbidden: You do not have admin permissions.")
          } else {
            setError("Failed to authenticate with chat server.")
          }
          return
        }

        const { token, apiKey } = await response.json()

        // 3. Initialize the Stream Instance
        const client = StreamChat.getInstance(apiKey)
        activeClient = client

        // 4. Connect the user (opens the WebSocket connection)
        await client.connectUser(
          {
            id: user.id,
            name: user.fullName || user.username || "Admin User",
            image: user.imageUrl,
            role: "admin", 
          },
          token
        )

        


        setChatClient(client)
        setError(null)
      } catch (err) {
        console.error("Error setting up Stream WebSocket:", err)
        setError("An error occurred while establishing the live connection.")
      } finally {
        setIsConnecting(false)
      }
    }

    initStream()

    // CLEANUP: Automatically tear down the WebSocket connection if the user logs out or leaves
    return () => {
      if (activeClient) {
        activeClient.disconnectUser()
        setChatClient(null)
        console.log("Stream WebSocket connection closed cleanly.")
      }
    }
  }, [user, isLoaded, isSignedIn])

  // Return everything your components might need
  return {
    currentUser: user,
    chatClient,
    error,
    // Combined loading state for convenience
    isLoading: !isLoaded || (isSignedIn && !chatClient && !error)
  }
} */



"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { StreamChat } from "stream-chat"

export const useClientAdmin = () => {
  const { isSignedIn, user, isLoaded } = useUser()
  
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Use user.id for the dependency array to avoid object reference re-runs
  const userId = user?.id

  useEffect(() => {
    // Only proceed if Clerk is loaded, user is signed in, and we aren't already connected/connecting
    if (!isLoaded || !isSignedIn || !userId || chatClient || isConnecting) return

    let isSubscribed = true
    let activeClient: StreamChat | null = null

    const initStream = async () => {
      setIsConnecting(true)
      try {
        const response = await fetch("/api/stream-token")
        
        // If the component unmounted while fetching, abort early
        if (!isSubscribed) return

        if (!response.ok) {
          if (response.status === 403) {
            setError("Forbidden: You do not have admin permissions.")
          } else {
            setError("Failed to authenticate with chat server.")
          }
          setIsConnecting(false) // Fix: Manual reset since we are returning early
          return
        }

        const { token, apiKey } = await response.json()
        if (!isSubscribed) return

        // Initialize instance
        const client = StreamChat.getInstance(apiKey)
        activeClient = client

        await client.connectUser(
          {
            id: userId,
            name: user.fullName || user.username || "Admin User",
            image: user.imageUrl,
            role: "admin", 
          },
          token
        )

        if (isSubscribed) {
          setChatClient(client)
          setError(null)
        } else {
          // If it unmounted while connecting, clean it up immediately
          client.disconnectUser()
        }
      } catch (err) {
        console.error("Error setting up Stream WebSocket:", err)
        if (isSubscribed) {
          setError("An error occurred while establishing the live connection.")
        }
      } finally {
        if (isSubscribed) {
          setIsConnecting(false)
        }
      }
    }

    initStream()

    // CLEANUP
    return () => {
      isSubscribed = false
      
      // If the client completed connection, disconnect it
      if (activeClient) {
        activeClient.disconnectUser()
        setChatClient(null)
        console.log("Stream WebSocket connection closed cleanly.")
      }
    }
  // Track userId instead of the whole user object
  }, [userId, isLoaded, isSignedIn]) 

  return {
    currentUser: user,
    chatClient,
    error,
    isLoading: !isLoaded || (isSignedIn && !chatClient && !error)
  }
}