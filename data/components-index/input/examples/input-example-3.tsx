"use client"

import * as React from "react"
import { CircleXIcon, LoaderCircleIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

export function InputExample3() {
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClearInput = () => {
    setInputValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  React.useEffect(() => {
    if (inputValue) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
    setIsLoading(false)
  }, [inputValue])

  return (
    <div className={cn("container max-w-md", !inputValue && "pb-5")}>
      <Input
        ref={inputRef}
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        startIcon={
          isLoading ? (
            <LoaderCircleIcon
              size={16}
              role="status"
              aria-label="Loading..."
              className="animate-spin"
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )
        }
        endIcon={
          inputValue ? (
            <CircleXIcon
              size={16}
              role="button"
              aria-label="Clear input"
              onClick={handleClearInput}
              className="transition-colors hover:text-foreground"
            />
          ) : undefined
        }
        maxLength={12}
        showMaxLength={inputValue ? "outside" : "false"}
      />
    </div>
  )
}
