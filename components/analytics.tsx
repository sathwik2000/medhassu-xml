"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This is where you would typically initialize and track page views
    // with your analytics provider (e.g., Google Analytics, Plausible, etc.)
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example tracking call (replace with your actual analytics implementation)
    console.log(`Page view tracked: ${url}`)

    // In a real implementation, you might do something like:
    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'GA-MEASUREMENT-ID', {
    //     page_path: url,
    //   })
    // }
  }, [pathname, searchParams])

  return null
}
