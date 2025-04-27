"use client"

import Link from "next/link"
import { Folder, Home, Mail, Settings, User } from "lucide-react"

import { BubbleMenu } from "@/components/ui/bubble-menu"

export function BubbleMenuExample3() {
  return (
    <div className="h-full">
      <BubbleMenu
        radius={85}
        buttonSize={60}
        subButtonSize={50}
        className="[&>*_svg]:size-6"
      >
        <Link
          href="#example3"
          className="flex size-full items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Home className="size-5" />
        </Link>
        <Link
          href="#example3"
          className="flex size-full items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Folder className="size-5" />
        </Link>
        <Link
          href="#example3"
          className="flex size-full items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/80"
        >
          <Mail className="size-5" />
        </Link>
        <Link
          href="#example3"
          className="flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
        >
          <Settings className="size-5" />
        </Link>
        <Link
          href="#example3"
          className="flex size-full items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
        >
          <User className="size-5" />
        </Link>
      </BubbleMenu>
    </div>
  )
}
