"use client"

import { useState, useEffect } from "react"

interface SearchResult {
  id: string
  title: string
  type: "course" | "topic"
  path: string
  excerpt?: string
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API call with timeout
    const timer = setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: "course1",
          title: "Complete Web Development Bootcamp",
          type: "course",
          path: "/courses/course1",
          excerpt: "Learn HTML, CSS, JavaScript, React, Node.js and more",
        },
        {
          id: "topic1",
          title: "Introduction to Web Development",
          type: "topic",
          path: "/courses/course1#topic1",
          excerpt: "Learn the basics of how the web works",
        },
        {
          id: "course2",
          title: "Data Science and Machine Learning",
          type: "course",
          path: "/courses/course2",
          excerpt: "Master data analysis, visualization, and machine learning",
        },
        {
          id: "topic2",
          title: "HTML Fundamentals",
          type: "topic",
          path: "/courses/course1#topic2",
          excerpt: "Master the building blocks of web pages with HTML5",
        },
      ].filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.excerpt && item.excerpt.toLowerCase().includes(query.toLowerCase())),
      )

      setResults(mockResults)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return { results, isLoading }
}
