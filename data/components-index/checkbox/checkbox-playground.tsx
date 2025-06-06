"use client"

import { Checkbox, CheckboxProps } from "@/components/ui/checkbox"

export function CheckboxPlayground({ variant }: CheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...{ variant }} />
      <label
        htmlFor="terms"
        className="select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
