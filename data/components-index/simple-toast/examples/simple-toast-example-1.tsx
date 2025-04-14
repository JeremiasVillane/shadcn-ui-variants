"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/simple-toast"

export function SimpleToastExample1() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: "Update Available",
          description:
            "There is a new version of the software ready to install.",
          type: "info",
          duration: 10000, // More time to decide
          showProgressBar: true,
          primaryAction: {
            label: "Install Now",
            onClick: () => console.log("Installing...")
          },
          secondaryAction: {
            label: "Later",
            onClick: () => console.log("Reminder Scheduled.")
          }
        })
      }
    >
      Check for Updates
    </Button>
  )
}
