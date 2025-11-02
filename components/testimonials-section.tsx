import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Web Developer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "Medhasuu completely transformed my career. The web development bootcamp gave me the skills and confidence to land my dream job. The instructors are top-notch and the community support is incredible.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "The data science course on Medhasuu was exactly what I needed to transition into tech. The curriculum is comprehensive and up-to-date with industry standards. I particularly appreciated the hands-on projects.",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "As someone with no prior design experience, I was amazed at how quickly I was able to grasp UI/UX concepts through Medhasuu's courses. The platform's intuitive interface made learning enjoyable.",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=100&width=100",
      content:
        "The personalized learning path feature helped me focus on exactly what I needed to learn. Medhasuu's approach to teaching programming concepts is clear and effective. Highly recommended!",
      rating: 4.5,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Students Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our community of learners who have transformed their skills and careers with Medhasuu.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <StarRating rating={testimonial.rating} />
                </div>
                <div className="mt-4 relative">
                  <Quote className="h-8 w-8 text-muted-foreground/20 absolute -top-2 -left-2" />
                  <p className="relative z-10 text-muted-foreground pl-4">{testimonial.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
