"use client"

import Link from "next/link"
import { RegistryItem } from "@/types"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface MobileNavProps {
  registryItems: RegistryItem[]
}

export default function MobileNav({ registryItems }: MobileNavProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <Link href="/" className="text-foreground">
          Home
        </Link>
        <Separator />
        <div className="flex flex-col space-y-2 text-foreground/60">
          <h4 className="font-medium">Components</h4>
          <ScrollArea className="h-[300px]">
            <div className="flex flex-col space-y-2">
              {registryItems?.map(
                (component) =>
                  component && (
                    <Link
                      key={component.name}
                      href={`/components/${component.name}`}
                      className="text-sm hover:text-foreground"
                    >
                      {component.title}
                    </Link>
                  )
              )}
            </div>
          </ScrollArea>
        </div>
        <Separator />
        <Link href="/docs" className="text-foreground">
          Documentation
        </Link>
        <Separator />
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://github.com/JeremiasVillane/shadcn-ui-variants"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </Button>
      </div>
    </div>
  )
}
