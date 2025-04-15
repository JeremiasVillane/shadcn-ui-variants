"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/local/ui/card"
import { RatingStarsInput } from "@/components/ui/rating-stars-input"

export function RatingStarsInputDemo() {
  const [rating, setRating] = React.useState(0)
  const [submitted, setSubmitted] = React.useState(false)

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
    setSubmitted(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleReset = () => {
    setRating(0)
    setSubmitted(false)
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Rate Your Experience
          </CardTitle>
          <CardDescription className="text-balance">
            Select a star rating to provide your feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center">
              <RatingStarsInput value={rating} onChange={handleRatingChange} />
            </div>

            <div className="flex h-16 items-center justify-center">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-pretty text-lg font-medium leading-tight text-primary">
                    Thank you for your {rating}-star rating!
                  </p>
                  <p className="mt-1 text-pretty text-sm text-muted-foreground">
                    Your feedback has been submitted
                  </p>
                </motion.div>
              ) : rating > 0 ? (
                <motion.div
                  key={rating}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="text-lg font-medium">
                    {rating === 5
                      ? "Excellent!"
                      : rating === 4
                        ? "Very Good!"
                        : rating === 3
                          ? "Good"
                          : rating === 2
                            ? "Fair"
                            : "Poor"}
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <p className="mr-2 text-sm text-muted-foreground">
                      You selected:
                    </p>
                    <div className="flex">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click on a star to rate
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 pt-3 md:flex-row">
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={rating === 0 || submitted}
              className="w-full px-6 md:w-auto"
            >
              Submit Rating
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReset}
              disabled={rating === 0 && !submitted}
              className="w-full md:w-auto"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
