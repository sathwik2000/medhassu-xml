"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { ChevronLeft, ChevronRight } from "lucide-react"

const courses = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer",
    instructor: "Jane Smith",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    reviewCount: 1245,
    category: "Web Development",
    level: "Beginner to Advanced",
  },
  {
    id: "course2",
    title: "Data Science and Machine Learning",
    description: "Master data analysis, visualization, and machine learning algorithms",
    instructor: "John Doe",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    reviewCount: 987,
    category: "Data Science",
    level: "Intermediate",
  },
  {
    id: "course3",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications for iOS and Android",
    instructor: "Alex Johnson",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    reviewCount: 756,
    category: "Mobile Development",
    level: "Intermediate",
  },
  {
    id: "course4",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design",
    instructor: "Sarah Williams",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.6,
    reviewCount: 543,
    category: "Design",
    level: "Beginner",
  },
  {
    id: "course5",
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript concepts and patterns",
    instructor: "Michael Brown",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.9,
    reviewCount: 432,
    category: "Web Development",
    level: "Advanced",
  },
  {
    id: "course6",
    title: "Cloud Computing with AWS",
    description: "Learn to build and deploy applications on Amazon Web Services",
    instructor: "Emily Chen",
    thumbnail: "/placeholder.svg?height=400&width=600",
    rating: 4.7,
    reviewCount: 321,
    category: "Cloud Computing",
    level: "Intermediate",
  },
]

export function FeaturedCourses() {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCourses = 3
  const maxIndex = courses.length - visibleCourses

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">Featured Courses</h2>
            <p className="text-muted-foreground">Discover our most popular and highly-rated courses</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={startIndex === 0}
              aria-label="Previous courses"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={startIndex >= maxIndex}
              aria-label="Next courses"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(startIndex, startIndex + visibleCourses).map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    View Course
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
