"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const featuredVideos = [
    {
      id: "video1",
      title: "Master Web Development",
      description: "Learn modern web development with React, Next.js, and more",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoUrl: "#",
    },
    {
      id: "video2",
      title: "Data Science Fundamentals",
      description: "Explore data analysis, visualization, and machine learning",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoUrl: "#",
    },
    {
      id: "video3",
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      videoUrl: "#",
    },
  ]

  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % featuredVideos.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, featuredVideos.length])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background z-0" />
      <div className="container relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Unlock Your Learning Potential with Medhasuu
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Interactive courses, personalized learning paths, and a supportive community to help you achieve your
                educational goals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/learning-paths">View Learning Paths</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
            {featuredVideos.map((video, index) => (
              <div
                key={video.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  index === currentVideo ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/30"
                    onClick={() => setIsPlaying(true)}
                  >
                    <PlayCircle className="h-10 w-10" />
                    <span className="sr-only">Play {video.title}</span>
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{video.title}</h3>
                  <p className="text-white/80">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
