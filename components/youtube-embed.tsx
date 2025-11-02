"use client"

import { useState, useEffect } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title?: string
  autoplay?: boolean
  className?: string
}

export function YouTubeEmbed({ videoId, title, autoplay = false, className = "" }: YouTubeEmbedProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    // Server-side or initial render
    return (
      <div
        className={`aspect-video bg-muted flex items-center justify-center ${className}`}
        aria-label={title || "YouTube video loading"}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-muted-foreground/20 h-12 w-12 mb-2"></div>
          <div className="h-4 bg-muted-foreground/20 rounded w-24"></div>
        </div>
      </div>
    )
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? "&autoplay=1" : ""}`

  return (
    <div className={`aspect-video ${className}`}>
      <iframe
        src={embedUrl}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-md"
      ></iframe>
    </div>
  )
}
