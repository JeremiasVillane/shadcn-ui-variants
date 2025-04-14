"use client"

import { ToastProps } from "@/components/ui/simple-toast"

export const simpleToastPlaygroundCode = ({
  type,
  duration,
  position,
  enterAnimationType,
  exitAnimationType,
  showCloseButton,
  showProgressBar
}: ToastProps) => {
  const code = `import { toast } from "@/lib/simple-toast/toast"
import { Button } from "@/components/ui/button"

export function SimpleToastPlayground() {
  const handleShowToast = () => {
     toast({
      title: "Something just happened",
      description:
        "Your full attention is required to resolve or address a situation.",${type !== "info" ? `
      type: "${type}",` : ""}${duration !== 5000 ? `
      duration: ${duration},` : ""}${position !== "bottom-right" ? `
      position: "${position}",` : ""}${enterAnimationType !== "fade-in" ? `
      enterAnimationType: "${enterAnimationType},` : ""}${exitAnimationType !== "fade-out" ? `
      exitAnimationType: "${exitAnimationType},` : ""}${showCloseButton ? `
      showCloseButton` : ""}${showProgressBar ? `
      showProgressBar` : ""}
    })
  }

  return (
    <div>
      <Button onClick={handleShowToast}>Show toast</Button>
    </div>
  )
}
`

  return code
}
