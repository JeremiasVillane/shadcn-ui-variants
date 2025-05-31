"use client"

import * as React from "react"
import { CornerDownLeft, Send } from "lucide-react" // Custom iconos

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/simple-toast"

export function SimpleToastExample5() {
  const handleInitialToast = () => {
    // Trigger first toast (confirmation request)
    toast({
      type: "info",
      title: "Confirm Submission",
      description: "Are you sure you want to submit the final report?",
      position: "top-center", // Initial position
      duration: Infinity, // Does not close by itself, waits for action
      showCloseButton: true, // Allow manual closing
      enterAnimationType: "slide-down", // Specific enter animation
      exitAnimationType: "zoom-out", // Specific exit animation

      // Primary Action: Confirm and trigger second toast
      primaryAction: {
        label: (
          <span className="flex items-center gap-1.5">
            <Send size={14} /> Yes, Submit
          </span>
        ),
        onClick: () => {
          // --- This is where the second toast is triggered! ---
          console.log("Confirmed, submitting...")
          toast({
            type: "success",
            title: "Report Sent",
            description: "The report has been successfully submitted.",
            position: "bottom-right", // Different position
            duration: 2000,
            showProgressBar: true,
            enterAnimationType: "slide-up", // Different enter animation
            exitAnimationType: "slide-out-right" // Different exit animation
            // No action needed
          })
          // Dismiss of initial toast already happens automatically when clicking
        }
      },

      // Secondary Action: Cancel (only closes this toast)
      secondaryAction: {
        label: (
          <span className="flex items-center gap-1.5">
            <CornerDownLeft size={14} /> No, Cancel
          </span>
        ),
        onClick: () => {
          console.log("Submission cancelled.")
          // Dismiss of initial toast already happens automatically when clicking
        }
      },
      onDismiss: () => console.log("Confirmation tost dismissed.")
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        Click to start a toast sequence.
      </p>
      <Button onClick={handleInitialToast}>Start Report Submission</Button>
    </div>
  )
}
