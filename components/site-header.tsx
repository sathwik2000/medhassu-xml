"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccountNav } from "@/components/user-account-nav"
import { SearchResults } from "@/components/search-results"
import { useDebounce } from "@/hooks/use-debounce"
import { useSearch } from "@/hooks/use-search"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 300)
  const { results, isLoading } = useSearch(debouncedQuery)
  const [showResults, setShowResults] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isHomePage && "bg-transparent border-transparent",
      )}
    >
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-full max-w-sm lg:max-w-xs">
            <Input
              type="search"
              placeholder="Search courses and topics..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (e.target.value) setShowResults(true)
              }}
              onFocus={() => debouncedQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            {showResults && debouncedQuery && (
              <SearchResults results={results} isLoading={isLoading} query={debouncedQuery} />
            )}
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <UserAccountNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
