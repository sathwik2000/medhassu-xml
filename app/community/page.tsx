import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, MessageSquare, Calendar, BookOpen, Award, ThumbsUp, Search } from "lucide-react"

export default function CommunityPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Our Learning Community
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Connect with fellow learners, participate in discussions, share resources, and collaborate on projects.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/community/join">
                    Join Community
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/community/browse">
                    Browse Discussions
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="Medhasuu community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Community Features
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore the various ways to engage with our vibrant learning community.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <MessageSquare className="h-10 w-10" />,
                title: "Discussion Forums",
                description: "Engage in topic-specific discussions, ask questions, and share insights with peers and instructors.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Study Groups",
                description: "Form or join study groups to collaborate on coursework, projects, and exam preparation.",
              },
              {
                icon: <Calendar className="h-10 w-10" />,
                title: "Live Events",
                description: "Participate in webinars, workshops, and Q&A sessions with industry experts and instructors.",
              },
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Resource Sharing",
                description: "Access and contribute to a growing library of learning resources, code snippets, and study materials.",
              },
              {
                icon: <Award className="h-10 w-10" />,
                title: "Peer Reviews",
                description: "Give and receive feedback on projects and assignments to improve your skills.",
              },
              {
                icon: <ThumbsUp className="h-10 w-10" />,
                title: "Mentorship",
                description: "Connect with mentors or become one yourself to help others on their learning journey.",
              },
            ].map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-fit text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href={`/community/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Explore {feature.title}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Community Activity
              </h2>
              <p className="max-w-[700px] text-muted-foreground">
                Stay updated with the latest discussions, events, and resources from our community.
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="discussions" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full max-w-sm lg:max-w-xs ml-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search community..." className="pl-8" />
              </div>
            </div>
            
            <TabsContent value="discussions" className="space-y-4">
              {[
                {
                  title: "How to optimize React performance?",
                  author: "Alex Johnson",
                  avatar
