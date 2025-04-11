"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator, type SeparatorProps } from "@/components/ui/separator"

export interface SeparatorPlaygroundProps {
  variant: SeparatorProps["variant"]
  label: string
  chip: boolean
  orientation: SeparatorProps["orientation"]
}

export function SeparatorPlayground({
  variant,
  label,
  chip,
  orientation
}: SeparatorPlaygroundProps) {
  const isVertical = orientation === "vertical"

  return (
    <div>
      <Card
        className={
          isVertical ? "w-full md:w-auto md:max-w-2xl" : "w-full md:w-[350px]"
        }
      >
        <CardHeader>
          <CardTitle>Enter your personal data</CardTitle>
          <CardDescription>
            I swear we will not sell your information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <article
            className={cn(
              "flex gap-6",
              isVertical ? "flex-row items-stretch" : "flex-col"
            )}
          >
            <div
              className={cn("flex flex-col gap-4", isVertical ? "flex-1" : "")}
            >
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button size="sm" className={cn(!isVertical && "w-full")}>
                Login
              </Button>
            </div>

            <Separator {...{ variant, label, chip, orientation }} />

            <div
              className={cn(
                "flex",
                isVertical
                  ? "flex-1 items-center justify-center"
                  : "items-center justify-center"
              )}
            >
              <Button
                variant="outline"
                className="flex w-full items-center gap-2"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 488 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Continue with Google
              </Button>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  )
}
