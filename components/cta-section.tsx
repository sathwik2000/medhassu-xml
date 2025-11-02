import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of students who are already transforming their skills and careers with Medhasuu.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 bg-primary-foreground text-foreground"
              />
              <Button type="submit" variant="secondary">
                Get Started
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/80">
              Sign up to get notified about new courses and features.{" "}
              <Link href="/terms" className="underline underline-offset-2">
                Terms & Conditions
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Button asChild variant="secondary" size="lg">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
