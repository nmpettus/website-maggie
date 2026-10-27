"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { isDevelopmentMode } from "@/utils/environmentUtils"
import { Mail, Download, Palette } from "lucide-react"

interface Subscriber {
  email: string
  date: string
}

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    const savedSubscribers = localStorage.getItem("newsletter-subscribers")
    if (savedSubscribers) {
      try {
        setSubscribers(JSON.parse(savedSubscribers))
      } catch (e) {
        console.error("Error parsing subscribers:", e)
      }
    }
  }, [])

  const clearLocalStorageSubscribers = () => {
    if (isDevelopmentMode) {
      localStorage.removeItem("newsletter-subscribers")
      setSubscribers([])
      toast.success("Local subscribers cleared")
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      console.log("Sending newsletter subscription request for:", email)

      if (isDevelopmentMode) {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const savedSubscribers = localStorage.getItem("newsletter-subscribers")
        const subscribers: Subscriber[] = savedSubscribers ? JSON.parse(savedSubscribers) : []

        if (subscribers.some((sub) => sub.email === email)) {
          toast.info("You're already on Maggie's list — enjoy your coloring pages!")
        setUnlocked(true)
          setIsSubmitting(false)
          return
        }

        const newSubscriber = {
          email,
          date: new Date().toISOString(),
        }

        localStorage.setItem("newsletter-subscribers", JSON.stringify([...subscribers, newSubscriber]))

        toast.success("Thank you! Your free coloring pages are ready.")
        setUnlocked(true)
        setEmail("")
      } else {
        const formData = new FormData()
        formData.append("email", email)
        formData.append("force_new", "true")

        const response = await fetch("https://booksbymaggie.com/api/newsletter.php", {
          method: "POST",
          body: formData,
        })

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json()

          console.log("Newsletter subscription response:", result)

          if (result.success) {
            toast.success("Thank you! Your free coloring pages are ready.")
        setUnlocked(true)
            setEmail("")
          } else if (result.message && result.message.includes("already subscribed")) {
            toast.info("You're already on Maggie's list — enjoy your coloring pages!")
        setUnlocked(true)
          } else {
            throw new Error(result.message || "Failed to process subscription")
          }
        } else {
          const textResponse = await response.text()
          console.error("Received non-JSON response:", textResponse)
          throw new Error("Received invalid response from server")
        }
      }
    } catch (error) {
      console.error("Error saving subscription:", error)
      toast.error("Unable to save your subscription. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-primary scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Palette className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Get Maggie's Free Coloring Pages
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Join Maggie's family list and download a free set of Bible story coloring pages. We'll also let you know when Maggie has a new book.
          </p>

          {unlocked ? (
            <div className="max-w-md mx-auto space-y-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg px-8">
                <a href="/activities/coloring-pages.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Download className="w-5 h-5 mr-2" />
                  Download Coloring Pages
                </a>
              </Button>
              <p className="text-sm text-primary-foreground/70">Print as many as you like. Happy coloring!</p>
            </div>
          ) : (
          <form className="max-w-md mx-auto" onSubmit={handleSubscribe}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-foreground bg-background border-0 focus:ring-2 focus:ring-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium rounded-lg px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get Free Pages"}
              </Button>
            </div>
            <p className="text-sm mt-4 text-primary-foreground/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
          )}

          {isDevelopmentMode && (
            <div className="mt-4">
              <button
                onClick={clearLocalStorageSubscribers}
                className="text-xs underline text-primary-foreground/50 hover:text-primary-foreground/70"
              >
                Clear Local Subscribers (Dev Only)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
