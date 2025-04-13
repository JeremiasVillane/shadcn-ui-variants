"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { H3 } from "@/components/ui/prose"

interface PlaygroundControlsProps {
  playground: { [x: string]: string | number | boolean | string[] }
  playgroundState: {
    [x: string]: string | number | boolean | string[]
  }
  updatePlaygroundState: React.ActionDispatch<
    [next: { [key: string]: string | number | boolean }]
  >
}

export default function PlaygroundControls({
  playground,
  playgroundState,
  updatePlaygroundState
}: PlaygroundControlsProps) {
  return (
    <>
      <H3 id="customize">Customize</H3>

      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(playground).map(([control, value], index) => {
          if (Array.isArray(value)) {
            return (
              <div key={index} className="space-y-2">
                <Label htmlFor={control}>{control}</Label>
                <Select
                  defaultValue={value.at(-1)}
                  value={String(playgroundState[control])}
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
            <React.Fragment key={index}>
              {typeof playgroundState[control] === "boolean" ? (
                <div className="flex h-10 items-center justify-between space-x-2 self-end rounded-md border px-6">
                  <Label htmlFor={control}>{control}</Label>
                  <Switch
                    checked={playgroundState[control]}
                    onCheckedChange={(val) =>
                      updatePlaygroundState({ [control]: val })
                    }
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor={control}>{control}</Label>
                  <Input
                    id={control}
                    {...(typeof playgroundState[control] === "number"
                      ? { type: "number" }
                      : {})}
                    value={playgroundState[control]}
                    onChange={(e) =>
                      updatePlaygroundState({
                        [control]:
                          typeof playgroundState[control] === "number"
                            ? Number(e.target.value)
                            : e.target.value
                      })
                    }
                    autoComplete="off"
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
