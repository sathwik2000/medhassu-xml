"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for courses
const allCourses = Array.from({ length: 50 }).map((_, i) => ({
  id: `course${i + 1}`,
  title: [
    "Complete Web Development Bootcamp",
    "Data Science and Machine Learning",
    "Mobile App Development with React Native",
    "UI/UX Design Fundamentals",
    "Advanced JavaScript Concepts",
    "Cloud Computing with AWS",
    "Python for Data Analysis",
    "Blockchain Development",
    "Artificial Intelligence Basics",
    "Cybersecurity Fundamentals",
  ][i % 10],
  description: "Comprehensive course covering all aspects of this subject with practical examples and projects.",
  instructor: ["Jane Smith", "John Doe", "Alex Johnson", "Sarah Williams", "Michael Brown"][i % 5],
  thumbnail: `/placeholder.svg?height=400&width=600&text=Course ${i + 1}`,
  rating: 3.5 + Math.random() * 1.5,
  reviewCount: Math.floor(Math.random() * 1500) + 100,
  category: [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Design",
    "Cloud Computing",
    "Programming",
    "Artificial Intelligence",
    "Cybersecurity",
  ][i % 8],
  level: ["Beginner", "Intermediate", "Advanced", "All Levels"][i % 4],
  duration: `${Math.floor(Math.random() * 20) + 5} hours`,
  updatedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
}))

const categories = [...new Set(allCourses.map((course) => course.category))]
const levels = [...new Set(allCourses.map((course) => course.level))]

export default function CoursesPage() {
  const [courses, setCourses] = useState<typeof allCourses>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastCourseElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  // Filter and sort courses
  useEffect(() => {
    setLoading(true)

    // Simulate API call with delay
    const timer = setTimeout(() => {
      let filteredCourses = [...allCourses]

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        filteredCourses = filteredCourses.filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query),
        )
      }

      // Apply category filter
      if (selectedCategory) {
        filteredCourses = filteredCourses.filter((course) => course.category === selectedCategory)
      }

      // Apply level filter
      if (selectedLevel) {
        filteredCourses = filteredCourses.filter((course) => course.level === selectedLevel)
      }

      // Apply sorting
      switch (sortBy) {
        case "popular":
          filteredCourses.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        case "rating":
          filteredCourses.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
          filteredCourses.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          break
        default:
          break
      }

      // Paginate results
      const coursesPerPage = 12
      const paginatedCourses = filteredCourses.slice(0, page * coursesPerPage)

      setCourses(paginatedCourses)
      setHasMore(paginatedCourses.length < filteredCourses.length)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [searchQuery, selectedCategory, selectedLevel, sortBy, page])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setSelectedLevel("")
    setSortBy("popular")
    setPage(1)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedLevel || sortBy !== "popular"

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Browse our comprehensive collection of courses</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={cn("space-y-6 md:block", showFilters ? "block" : "hidden")}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Category</h3>
              {selectedCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory("")}
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start px-2 w-full font-normal",
                      selectedCategory === category && "bg-muted font-medium",
                    )}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Level</h3>
              {selectedLevel && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLevel("")}
                  className="h-auto p-0 text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "justify-start px-2 w-full font-normal",
                      selectedLevel === level && "bg-muted font-medium",
                    )}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader className="p-4">
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Skeleton className="h-4 w-1/2" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => {
                  if (courses.length === index + 1) {
                    return (
                      <div ref={lastCourseElementRef} key={course.id}>
                        <CourseCard course={course} />
                      </div>
                    )
                  } else {
                    return <CourseCard key={course.id} course={course} />
                  }
                })}
              </div>
              {loading && (
                <div className="mt-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground mt-1 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CourseCardProps {
  course: (typeof allCourses)[0]
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {course.level}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <Badge>{course.category}</Badge>
            <div className="flex items-center">
              <StarRating rating={course.rating} />
              <span className="text-xs text-muted-foreground ml-1">({course.reviewCount})</span>
            </div>
          </div>
          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="text-sm">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </div>
          <div className="text-sm text-muted-foreground">{course.duration}</div>
        </CardFooter>
      </Card>
    </Link>
  )
}
