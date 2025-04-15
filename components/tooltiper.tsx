import {
  Tooltip,
  TooltipContent,
  TooltipContentProps,
  TooltipProvider,
  TooltipTrigger
} from "@/components/local/ui/tooltip"

export function Tooltiper({
  content,
  asChild = true,
  children,
  ...props
}: Omit<TooltipContentProps, "content"> & {
  content: React.ReactNode
  children: React.ReactElement
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent {...props}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
