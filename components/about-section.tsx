import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, Globe, CheckCircle } from "lucide-react"

export function AboutSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Medhasuu</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Transforming Education Through Technology
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Medhasuu is an innovative EdTech platform designed to make learning accessible, engaging, and effective
              for everyone. Our mission is to empower learners worldwide with high-quality educational content and
              personalized learning experiences.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <a href="/about">Learn More</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/team">Meet Our Team</a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-4">
              <div className="rounded-lg bg-muted p-6 shadow-sm">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">500+ Courses</h3>
                <p className="text-muted-foreground mt-2">Comprehensive courses across various disciplines</p>
              </div>
              <div className="rounded-lg bg-muted p-6 shadow-sm">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">50,000+ Students</h3>
                <p className="text-muted-foreground mt-2">Learners from around the world</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg bg-muted p-6 shadow-sm">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Expert Instructors</h3>
                <p className="text-muted-foreground mt-2">Industry professionals and academics</p>
              </div>
              <div className="rounded-lg bg-muted p-6 shadow-sm">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold">Global Community</h3>
                <p className="text-muted-foreground mt-2">Connect with learners worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:gap-16 lg:grid-cols-2 items-center">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
            <Image
              src="/placeholder.svg?height=720&width=1280"
              alt="Students learning on Medhasuu"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">Our Approach to Learning</h3>
            <p className="text-muted-foreground">
              At Medhasuu, we believe in a holistic approach to education that combines theoretical knowledge with
              practical application. Our platform is designed to accommodate different learning styles and paces,
              ensuring that every student can succeed.
            </p>
            <div className="space-y-4">
              {[
                "Interactive, project-based learning experiences",
                "Personalized learning paths tailored to your goals",
                "Real-time feedback and progress tracking",
                "Community support and collaborative learning",
                "Industry-relevant curriculum updated regularly",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
