"use client"

import { camelToNormalCase } from "@/lib/utils"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"

interface PlaygroundControlsProps {
  playground: Record<string, string | number | boolean | (string | number)[]>
  playgroundState: {
    [x: string]: string | number | boolean | (string | number)[]
  }
  updatePlaygroundState: React.ActionDispatch<
    [next: Record<string, string | number | boolean | (string | number)[]>]
  >
}

export function PlaygroundControls({
  playground,
  playgroundState,
  updatePlaygroundState
}: PlaygroundControlsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Object.entries(playground).map(([control, value], index) => {
        if (Array.isArray(value)) {
          return (
            <div key={index} className="space-y-2">
              <Label htmlFor={control}>{camelToNormalCase(control)}</Label>
              <Select
                defaultValue={value.at(-1)}
                value={playgroundState[control]}
                onValueChange={(val) =>
                  updatePlaygroundState({ [control]: val })
                }
              >
                <SelectTrigger id={control}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {value.map((val, index) => (
                    <SelectItem key={index} value={val}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }

        return (
          <div key={index} className="space-y-2">
            <Label htmlFor={control}>{camelToNormalCase(control)}</Label>
            <Input
              id={control}
              value={playgroundState[control]}
              onChange={(e) =>
                updatePlaygroundState({ [control]: e.target.value })
              }
            />
          </div>
        )
      })}
    </div>
  )
}
