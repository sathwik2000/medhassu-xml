import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, BookOpen, Award, BarChart4, CheckCircle2 } from "lucide-react"

const learningPaths = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Become a full-stack web developer with this comprehensive learning path.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 8,
    duration: "6 months",
    level: "Beginner to Advanced",
    skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Databases", "DevOps"],
    popular: true,
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Master data analysis, visualization, and machine learning.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 6,
    duration: "5 months",
    level: "Intermediate",
    skills: ["Python", "Statistics", "Data Analysis", "Machine Learning", "Data Visualization"],
    popular: true,
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Learn to build cross-platform mobile applications.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 5,
    duration: "4 months",
    level: "Intermediate",
    skills: ["React Native", "Flutter", "iOS", "Android", "UI/UX for Mobile"],
    popular: false,
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Develop skills in user interface and user experience design.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 4,
    duration: "3 months",
    level: "Beginner to Intermediate",
    skills: ["Design Principles", "Wireframing", "Prototyping", "User Research", "Figma"],
    popular: false,
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Master cloud platforms and infrastructure as code.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 7,
    duration: "5 months",
    level: "Intermediate to Advanced",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    popular: true,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn to protect systems, networks, and data from digital attacks.",
    image: "/placeholder.svg?height=400&width=600",
    courses: 6,
    duration: "5 months",
    level: "Intermediate to Advanced",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Security Auditing"],
    popular: false,
  },
]

export default function LearningPathsPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learning Paths</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Structured curriculum paths designed to take you from beginner to professional in your chosen field.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Popular Learning Paths</h2>
            <Button variant="ghost" asChild>
              <Link href="#all-paths">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths
              .filter((path) => path.popular)
              .map((path) => (
                <Link href={`/learning-paths/${path.id}`} key={path.id} className="group">
                  <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={path.image || "/placeholder.svg"}
                        alt={path.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                          {path.level}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="line-clamp-2">{path.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{path.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                        {path.skills.length > 3 && <Badge variant="outline">+{path.skills.length - 3} more</Badge>}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {path.courses} courses
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {path.duration}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        View Path
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="all-paths">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">All Learning Paths</h2>
              <p className="max-w-[700px] text-muted-foreground">
                Explore our complete collection of structured learning paths designed to help you achieve your career
                goals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Card key={path.id} className="h-full">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge>{path.level}</Badge>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{path.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{path.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-4">{path.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{path.courses} Courses</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Certificate</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Skills you'll gain:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">Path Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "0%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/learning-paths/${path.id}`}>Start Learning Path</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Personalized Learning</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Not sure which path to choose?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Take our skills assessment to get personalized recommendations based on your goals, experience level,
                and interests.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/assessment">Take Skills Assessment</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/advisor">Speak to Learning Advisor</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose a Learning Path?</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <BarChart4 className="h-5 w-5 text-primary" />,
                      title: "Structured Progression",
                      description: "Follow a carefully designed curriculum that builds skills in the right order",
                    },
                    {
                      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
                      title: "Industry-Relevant Skills",
                      description: "Learn exactly what employers are looking for in your chosen field",
                    },
                    {
                      icon: <Award className="h-5 w-5 text-primary" />,
                      title: "Path Certification",
                      description: "Earn a comprehensive certificate that validates your expertise",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">{item.icon}</div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
