import { XMLParser } from "fast-xml-parser"

// Configure XML parser options
const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
  parseAttributeValue: true,
  trimValues: true,
}

const parser = new XMLParser(parserOptions)

export interface Course {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  level: string
  thumbnail: string
  duration: string
  updatedAt: string
  instructor: {
    name: string
    title: string
    bio: string
    avatar: string
  }
  topics: Topic[]
  relatedCourses: RelatedCourse[]
}

export interface Topic {
  id: string
  title: string
  description: string
  duration: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  duration: string
  videoUrl: string
  youtubeId?: string
}

export interface RelatedCourse {
  id: string
  title: string
  thumbnail: string
  instructor: string
  rating: number
  reviewCount: number
}

// Parse course XML data
export async function parseCourseXML(courseId: string): Promise<Course> {
  try {
    // In a real app, this would fetch from an API or file system
    // For now, we'll simulate fetching XML data
    const xmlData = await fetchCourseXML(courseId)
    const parsedData = parser.parse(xmlData)

    return transformCourseData(parsedData, courseId)
  } catch (error) {
    console.error("Error parsing course XML:", error)
    throw new Error("Failed to parse course data")
  }
}

// Simulate fetching XML data
async function fetchCourseXML(courseId: string): Promise<string> {
  // This would normally fetch from an API or file system
  // For demo purposes, we'll return a sample XML structure
  return `
    <course>
      <id>${courseId}</id>
      <title>Complete ${getCourseTitle(courseId)} Course</title>
      <description>Learn everything about ${getCourseTitle(courseId)} from basics to advanced concepts.</description>
      <longDescription>
        <![CDATA[
          <p>This comprehensive ${getCourseTitle(courseId)} course takes you from beginner to advanced. You'll learn through practical examples and real-world projects.</p>
          <p>By the end of the course, you'll have the skills to build professional ${getCourseTitle(courseId)} applications and advance your career.</p>
          <h3>What you'll learn:</h3>
          <ul>
            <li>Master the fundamentals of ${getCourseTitle(courseId)}</li>
            <li>Build real-world projects</li>
            <li>Understand best practices and patterns</li>
            <li>Deploy your applications to production</li>
          </ul>
        ]]>
      </longDescription>
      <category>${getCourseCategory(courseId)}</category>
      <level>${getCourseLevel(courseId)}</level>
      <thumbnail>/placeholder.svg?height=720&amp;width=1280&amp;text=${encodeURIComponent(getCourseTitle(courseId))}</thumbnail>
      <duration>${getCourseDuration(courseId)}</duration>
      <updatedAt>Last updated ${getUpdateDate()}</updatedAt>
      <instructor>
        <name>${getInstructorName(courseId)}</name>
        <title>${getInstructorTitle(courseId)}</title>
        <bio>${getInstructorName(courseId)} is an experienced ${getCourseTitle(courseId)} professional with over 8 years of industry experience.</bio>
        <avatar>/placeholder.svg?height=200&amp;width=200</avatar>
      </instructor>
      <topics>
        ${generateTopics(courseId)}
      </topics>
      <relatedCourses>
        ${generateRelatedCourses(courseId)}
      </relatedCourses>
    </course>
  `
}

// Transform parsed XML data into our Course interface
function transformCourseData(parsedData: any, courseId: string): Course {
  const courseData = parsedData.course

  return {
    id: courseData.id,
    title: courseData.title,
    description: courseData.description,
    longDescription: courseData.longDescription,
    category: courseData.category,
    level: courseData.level,
    thumbnail: courseData.thumbnail,
    duration: courseData.duration,
    updatedAt: courseData.updatedAt,
    instructor: {
      name: courseData.instructor.name,
      title: courseData.instructor.title,
      bio: courseData.instructor.bio,
      avatar: courseData.instructor.avatar,
    },
    topics: Array.isArray(courseData.topics.topic)
      ? courseData.topics.topic.map((topic: any) => ({
          id: topic.id,
          title: topic.title,
          description: topic.description,
          duration: topic.duration,
          lessons: Array.isArray(topic.lessons.lesson)
            ? topic.lessons.lesson.map((lesson: any) => ({
                id: lesson.id,
                title: lesson.title,
                duration: lesson.duration,
                videoUrl: lesson.videoUrl,
                youtubeId: extractYouTubeId(lesson.videoUrl),
              }))
            : [
                {
                  id: topic.lessons.lesson.id,
                  title: topic.lessons.lesson.title,
                  duration: topic.lessons.lesson.duration,
                  videoUrl: topic.lessons.lesson.videoUrl,
                  youtubeId: extractYouTubeId(topic.lessons.lesson.videoUrl),
                },
              ],
        }))
      : [
          {
            id: courseData.topics.topic.id,
            title: courseData.topics.topic.title,
            description: courseData.topics.topic.description,
            duration: courseData.topics.topic.duration,
            lessons: Array.isArray(courseData.topics.topic.lessons.lesson)
              ? courseData.topics.topic.lessons.lesson.map((lesson: any) => ({
                  id: lesson.id,
                  title: lesson.title,
                  duration: lesson.duration,
                  videoUrl: lesson.videoUrl,
                  youtubeId: extractYouTubeId(lesson.videoUrl),
                }))
              : [
                  {
                    id: courseData.topics.topic.lessons.lesson.id,
                    title: courseData.topics.topic.lessons.lesson.title,
                    duration: courseData.topics.topic.lessons.lesson.duration,
                    videoUrl: courseData.topics.topic.lessons.lesson.videoUrl,
                    youtubeId: extractYouTubeId(courseData.topics.topic.lessons.lesson.videoUrl),
                  },
                ],
          },
        ],
    relatedCourses: Array.isArray(courseData.relatedCourses.course)
      ? courseData.relatedCourses.course.map((course: any) => ({
          id: course.id,
          title: course.title,
          thumbnail: course.thumbnail,
          instructor: course.instructor,
          rating: course.rating,
          reviewCount: course.reviewCount,
        }))
      : [
          {
            id: courseData.relatedCourses.course.id,
            title: courseData.relatedCourses.course.title,
            thumbnail: courseData.relatedCourses.course.thumbnail,
            instructor: courseData.relatedCourses.course.instructor,
            rating: courseData.relatedCourses.course.rating,
            reviewCount: courseData.relatedCourses.course.reviewCount,
          },
        ],
  }
}

// Helper functions to generate sample data
function getCourseTitle(courseId: string): string {
  const courseTypes = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "UI/UX Design",
    "Cloud Computing",
    "Machine Learning",
    "DevOps",
    "Blockchain",
    "Cybersecurity",
    "Game Development",
  ]
  const id = Number.parseInt(courseId.replace("course", "")) || 1
  return courseTypes[(id - 1) % courseTypes.length]
}

function getCourseCategory(courseId: string): string {
  return getCourseTitle(courseId)
}

function getCourseLevel(courseId: string): string {
  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const id = Number.parseInt(courseId.replace("course", "")) || 1
  return levels[(id - 1) % levels.length]
}

function getCourseDuration(courseId: string): string {
  const id = Number.parseInt(courseId.replace("course", "")) || 1
  return `${10 + (id % 40)} hours`
}

function getUpdateDate(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[Math.floor(Math.random() * months.length)]
  const year = 2023
  return `${month} ${year}`
}

function getInstructorName(courseId: string): string {
  const instructors = [
    "Jane Smith",
    "John Doe",
    "Alex Johnson",
    "Sarah Williams",
    "Michael Brown",
    "Emily Chen",
    "David Wilson",
    "Sophia Garcia",
    "Robert Taylor",
    "Olivia Martinez",
  ]
  const id = Number.parseInt(courseId.replace("course", "")) || 1
  return instructors[(id - 1) % instructors.length]
}

function getInstructorTitle(courseId: string): string {
  return `Senior ${getCourseTitle(courseId)} Specialist`
}

function generateTopics(courseId: string): string {
  const courseType = getCourseTitle(courseId)
  let topics = ""

  const topicCount = 3 + (Number.parseInt(courseId.replace("course", "")) % 3)

  for (let i = 1; i <= topicCount; i++) {
    const lessonCount = 3 + (i % 3)
    let lessons = ""

    for (let j = 1; j <= lessonCount; j++) {
      const youtubeIds = [
        "dQw4w9WgXcQ", // Rick Astley - Never Gonna Give You Up
        "jNQXAC9IVRw", // Me at the zoo
        "hY7m5jjJ9mM", // CATS will make you LAUGH YOUR HEAD OFF
        "QH2-TGUlwu4", // Nyan Cat
        "J---aiyznGQ", // Keyboard Cat
        "ZpOLkXWGYl8", // Charlie bit my finger
        "RP4abiHdQpc", // The Sneezing Baby Panda
        "lrzKT-dFUjE", // The Duck Song
        "EwTZ2xpQwpA", // Chocolate Rain
        "KmtzQCSh6xk", // Numa Numa
      ]
      const youtubeId = youtubeIds[(i + j) % youtubeIds.length]

      lessons += `
        <lesson>
          <id>lesson${i}${j}</id>
          <title>Topic ${i} Lesson ${j}: ${getTopicName(courseType, i)} Fundamentals</title>
          <duration>${10 + j * 5} min</duration>
          <videoUrl>https://www.youtube.com/watch?v=${youtubeId}</videoUrl>
        </lesson>
      `
    }

    topics += `
      <topic>
        <id>topic${i}</id>
        <title>${getTopicName(courseType, i)}</title>
        <description>Learn all about ${getTopicName(courseType, i)} in ${courseType}.</description>
        <duration>${lessonCount * 30} min</duration>
        <lessons>
          ${lessons}
        </lessons>
      </topic>
    `
  }

  return topics
}

function getTopicName(courseType: string, topicIndex: number): string {
  const webDevTopics = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Database"]
  const dataTopics = ["Python", "Statistics", "Data Visualization", "Machine Learning", "Big Data", "SQL"]
  const mobileTopics = ["React Native", "Flutter", "iOS", "Android", "UI Design", "API Integration"]
  const designTopics = ["UI Principles", "Color Theory", "Typography", "Wireframing", "Prototyping", "User Testing"]
  const cloudTopics = ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Serverless"]

  let topics

  if (courseType.includes("Web")) {
    topics = webDevTopics
  } else if (courseType.includes("Data")) {
    topics = dataTopics
  } else if (courseType.includes("Mobile")) {
    topics = mobileTopics
  } else if (courseType.includes("Design") || courseType.includes("UI/UX")) {
    topics = designTopics
  } else if (courseType.includes("Cloud")) {
    topics = cloudTopics
  } else {
    topics = webDevTopics
  }

  return topics[(topicIndex - 1) % topics.length]
}

function generateRelatedCourses(courseId: string): string {
  const id = Number.parseInt(courseId.replace("course", "")) || 1
  let relatedCourses = ""

  for (let i = 1; i <= 3; i++) {
    const relatedId = (id + i) % 50 || 1
    const relatedCourseId = `course${relatedId}`
    const title = `${getCourseTitle(relatedCourseId)} Masterclass`
    const instructor = getInstructorName(relatedCourseId)
    const rating = (4 + Math.random() * 1).toFixed(1)
    const reviewCount = Math.floor(Math.random() * 1000) + 100

    relatedCourses += `
      <course>
        <id>${relatedCourseId}</id>
        <title>${title}</title>
        <thumbnail>/placeholder.svg?height=400&amp;width=600&amp;text=${encodeURIComponent(title)}</thumbnail>
        <instructor>${instructor}</instructor>
        <rating>${rating}</rating>
        <reviewCount>${reviewCount}</reviewCount>
      </course>
    `
  }

  return relatedCourses
}

// Extract YouTube ID from URL
function extractYouTubeId(url: string): string | undefined {
  if (!url) return undefined

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : undefined
}
