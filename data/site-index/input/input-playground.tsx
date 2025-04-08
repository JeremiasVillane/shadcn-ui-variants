"use client"

import { ArrowRightIcon, AtSignIcon, MailIcon, SearchIcon } from "lucide-react"

import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface InputPlaygroundProps {
  startIcon: string
  endIcon: string
  startInline: string
  endInline: string
  startAddon: string
  endAddon: string
  maxLength: number
  showMaxLength: InputProps["showMaxLength"]
}

export function InputPlayground({
  startIcon,
  endIcon,
  startInline,
  endInline,
  startAddon,
  endAddon,
  maxLength,
  showMaxLength
}: InputPlaygroundProps) {
  const startIcons: Record<string, React.ReactElement> = {
    "<SearchIcon />": <SearchIcon />,
    "<AtSignIcon />": <AtSignIcon />
  }

  const endIcons: Record<string, React.ReactElement> = {
    "<ArrowRightIcon />": <ArrowRightIcon />,
  }

  return (
    <div className="*:not-first:mt-2 space-y-1.5">
      <Label htmlFor="inputId">Advanced input:</Label>
      <Input
        id="inputId"
        placeholder="Enter your information..."
        {...(startIcon !== "none" ? { startIcon: startIcons[startIcon] } : {})}
        {...(endIcon !== "none" ? { endIcon: endIcons[endIcon] } : {})}
        startInline={startInline}
        endInline={endInline}
        {...(startAddon !== "none" ? { startAddon } : {})}
        {...(endAddon === "<MailIcon />"
          ? { endAddon: <MailIcon size={18} /> }
          : endAddon === "none"
            ? {}
            : { endAddon })}
        showMaxLength={showMaxLength}
        maxLength={maxLength}
        autoComplete="off"
      />
    </div>
  )
}
