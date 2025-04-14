"use client"

import { Wifi } from "lucide-react" // Custom icon

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/simple-toast"

export function SimpleToastExample4() {
  return (
    <Button
      onClick={() =>
        toast({
          title: (
            <span className="font-bold text-indigo-600">
              Connection Established
            </span>
          ),
          description: (
            <p>
              Connected to the network{" "}
              <code className="rounded bg-muted px-1">Fibertel-2.4GHz</code>{" "}
              successfully.
            </p>
          ),
          customIcon: (
            <Wifi className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
          ),
          type: "info", // Type still applies base styles if you do not overwrite them
          className: "border-indigo-500 shadow-md", // Additional classes
          duration: 6000
        })
      }
    >
      Simulate WiFi Connection
    </Button>
  )
}
