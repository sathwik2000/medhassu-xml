import { Lightbulb, Compass, Users, Award, BarChart, MessageSquare } from "lucide-react"

export function FeatureHighlights() {
  const features = [
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: "Interactive Learning",
      description: "Engage with interactive content, quizzes, and hands-on projects that reinforce learning concepts.",
    },
    {
      icon: <Compass className="h-10 w-10" />,
      title: "Personalized Paths",
      description: "Follow customized learning paths tailored to your goals, skill level, and learning pace.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Community Support",
      description: "Connect with fellow learners, participate in discussions, and collaborate on projects.",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Certificates",
      description: "Earn recognized certificates upon course completion to showcase your skills to employers.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics and performance insights.",
    },
    {
      icon: <MessageSquare className="h-10 w-10" />,
      title: "Expert Feedback",
      description: "Receive personalized feedback from instructors and peers on your assignments and projects.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Platform Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Medhasuu</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers a comprehensive set of features designed to enhance your learning experience and help
              you achieve your educational goals.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
