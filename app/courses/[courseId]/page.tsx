"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/star-rating"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { parseCourseXML, type Course, type Lesson } from "@/lib/xml-parser"
import {
  BookOpen,
  Clock,
  Award,
  Users,
  BarChart,
  PlayCircle,
  Share2,
  Bookmark,
  MessageSquare,
  ExternalLink,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    async function loadCourseData() {
      try {
        const courseData = await parseCourseXML(params.courseId)
        setCourse(courseData)

        // Set the first lesson as active by default
        if (courseData.topics.length > 0 && courseData.topics[0].lessons.length > 0) {
          setActiveLesson(courseData.topics[0].lessons[0])
          setExpandedTopic(courseData.topics[0].id)
        }
      } catch (error) {
        console.error("Failed to load course data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCourseData()
  }, [params.courseId])

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson)
    // Scroll to video player
    document.getElementById("video-player")?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex flex-col space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-64 bg-muted rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="mb-6">The course you're looking for doesn't exist or couldn't be loaded.</p>
        <Button asChild>
          <Link href="/courses">Browse All Courses</Link>
        </Button>
      </div>
    )
  }

  const totalLessons = course.topics.reduce((acc, topic) => acc + topic.lessons.length, 0)

  return (
    <main className="pb-16">
      {/* Video Player Section */}
      <section className="bg-muted/50 pt-8" id="video-player">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeLesson?.youtubeId ? (
                <YouTubeEmbed
                  videoId={activeLesson.youtubeId}
                  title={activeLesson.title}
                  className="rounded-lg shadow-lg"
                />
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center rounded-lg shadow-lg">
                  <div className="text-center p-4">
                    <PlayCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium">No video selected</h3>
                    <p className="text-muted-foreground">Select a lesson from the curriculum to start learning</p>
                  </div>
                </div>
              )}

              {activeLesson && (
                <div className="mt-4 space-y-2">
                  <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{activeLesson.duration}</span>
                    {activeLesson.youtubeId && (
                      <Button variant="ghost" size="sm" className="ml-auto" asChild>
                        <a
                          href={`https://www.youtube.com/watch?v=${activeLesson.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Watch on YouTube
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Course Content</h3>
                    <div className="text-sm text-muted-foreground">{totalLessons} lessons</div>
                  </div>

                  <Accordion type="multiple" defaultValue={expandedTopic ? [expandedTopic] : []} className="w-full">
                    {course.topics.map((topic) => (
                      <AccordionItem key={topic.id} value={topic.id} className="border rounded-md mb-2 overflow-hidden">
                        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-muted/50 text-sm">
                          <div className="flex flex-col items-start text-left">
                            <div className="font-medium">{topic.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {topic.lessons.length} lessons • {topic.duration}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-0 pb-0">
                          <div className="divide-y">
                            {topic.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`flex items-center p-3 hover:bg-muted/50 cursor-pointer ${
                                  activeLesson?.id === lesson.id ? "bg-muted" : ""
                                }`}
                                onClick={() => handleLessonClick(lesson)}
                              >
                                <PlayCircle
                                  className={`h-4 w-4 mr-2 flex-shrink-0 ${
                                    activeLesson?.id === lesson.id ? "text-primary" : "text-muted-foreground"
                                  }`}
                                />
                                <div className="text-sm">
                                  <div
                                    className={`font-medium ${activeLesson?.id === lesson.id ? "text-primary" : ""}`}
                                  >
                                    {lesson.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Info Section */}
      <section className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="overview"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="instructor"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Instructor
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge>{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                    <div className="text-sm text-muted-foreground ml-auto">{course.updatedAt}</div>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
                  <p className="text-muted-foreground">{course.description}</p>

                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.longDescription }} />

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarRating rating={4.8} size="md" />
                      <span className="ml-2 text-sm">4.8 (1,245 reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">12,345 students</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/courses/${course.id}#video-player`}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start Learning
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <Clock className="h-6 w-6 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{course.duration}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <BookOpen className="h-6 w-6 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Lessons</div>
                      <div className="text-sm text-muted-foreground">{totalLessons} lessons</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <BarChart className="h-6 w-6 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Level</div>
                      <div className="text-sm text-muted-foreground">{course.level}</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                      <Award className="h-6 w-6 mb-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Certificate</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                      <p className="text-muted-foreground">{course.instructor.title}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <StarRating rating={4.9} />
                          <span className="ml-2 text-sm">4.9 Instructor Rating</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">1,245</span> Reviews
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">12</span> Courses
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <p>{course.instructor.bio}</p>
                    <p>
                      {course.instructor.name} specializes in {course.category} and has created courses that have helped
                      thousands of students advance their careers. Their teaching style focuses on practical,
                      project-based learning that gives you real-world experience.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="text-center md:w-64 p-6 border rounded-lg">
                      <div className="text-5xl font-bold">4.8</div>
                      <div className="mt-2">
                        <StarRating rating={4.8} size="lg" />
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">Course Rating</div>
                    </div>

                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const percentage = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1
                        return (
                          <div key={star} className="flex items-center">
                            <div className="w-12 text-sm text-right mr-2">{star} stars</div>
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <div className="w-12 text-sm text-left ml-2">{percentage}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">Student Reviews</h3>
                      <Select defaultValue="recent">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="highest">Highest Rated</SelectItem>
                          <SelectItem value="lowest">Lowest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          name: "Alex Johnson",
                          avatar: "/placeholder.svg?height=100&width=100",
                          rating: 5,
                          date: "2 weeks ago",
                          comment:
                            "This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand, and the projects are practical and relevant to real-world scenarios.",
                        },
                        {
                          name: "Sarah Williams",
                          avatar: "/placeholder.svg?height=100&width=100",
                          rating: 4,
                          date: "1 month ago",
                          comment:
                            "Great course overall. The content is comprehensive and well-structured. I would have liked more advanced exercises, but it's perfect for beginners.",
                        },
                        {
                          name: "Michael Brown",
                          avatar: "/placeholder.svg?height=100&width=100",
                          rating: 5,
                          date: "2 months ago",
                          comment:
                            "I started with zero knowledge and now I feel confident in my skills. The instructor is engaging and the community support is fantastic.",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-medium">{review.name}</div>
                                  <div className="flex items-center mt-1">
                                    <StarRating rating={review.rating} />
                                    <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Reply
                                </Button>
                              </div>
                              <p className="mt-2 text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Related Courses</h3>
                <div className="space-y-4">
                  {course.relatedCourses.map((relatedCourse) => (
                    <Link href={`/courses/${relatedCourse.id}`} key={relatedCourse.id} className="group block">
                      <div className="flex items-start space-x-3">
                        <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={relatedCourse.thumbnail || "/placeholder.svg"}
                            alt={relatedCourse.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium group-hover:text-primary truncate">
                            {relatedCourse.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">{relatedCourse.instructor}</p>
                          <div className="flex items-center mt-1">
                            <StarRating rating={relatedCourse.rating} size="sm" />
                            <span className="text-xs text-muted-foreground ml-1">({relatedCourse.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Course Certificate</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">Certificate of Completion</p>
                    <p className="text-sm text-muted-foreground">Earn after finishing all course content</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Sample Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
