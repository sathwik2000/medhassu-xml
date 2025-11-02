"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Book, Compass, Home, Users, BookOpen } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Medhasuu</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          <span className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span className="hidden md:block">Home</span>
          </span>
        </Link>
        <Link
          href="/courses"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/courses") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <span className="flex items-center gap-1">
            <Book className="h-4 w-4" />
            <span className="hidden md:block">Courses</span>
          </span>
        </Link>
        <Link
          href="/learning-paths"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/learning-paths") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <span className="flex items-center gap-1">
            <Compass className="h-4 w-4" />
            <span className="hidden md:block">Learning Paths</span>
          </span>
        </Link>
        <Link
          href="/community"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/community") ? "text-foreground" : "text-foreground/60",
          )}
        >
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden md:block">Community</span>
          </span>
        </Link>
      </nav>
    </div>
  )
}
