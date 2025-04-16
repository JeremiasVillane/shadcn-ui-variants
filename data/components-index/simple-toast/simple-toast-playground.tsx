"use client"

import { Button } from "@/components/ui/button"
import { toast, type ToastProps } from "@/components/ui/simple-toast"

export function SimpleToastPlayground({
  type,
  duration,
  position,
  enterAnimationType,
  exitAnimationType,
  showCloseButton,
  showProgressBar
}: ToastProps) {
  const handleShowToast = () => {
    toast({
      title: "Something just happened",
      description:
        "Your full attention is required to resolve or address a situation.",
      type,
      duration,
      position,
      enterAnimationType,
      exitAnimationType,
      showCloseButton,
      showProgressBar
    })
  }

  return (
    <div>
      <Button onClick={handleShowToast}>Show toast</Button>
    </div>
  )
}
