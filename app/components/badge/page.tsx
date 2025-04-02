"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CodeBlock } from "@/components/code-block"
import { ComponentPlayground } from "@/components/component-playground"

export default function BadgePage() {
  // State for playground
  const [variant, setVariant] = React.useState("default")
  const [text, setText] = React.useState("Badge")

  // Generate code based on current state
  const generateCode = () => {
    let code = "<Badge"
    if (variant !== "default") code += ` variant="${variant}"`
    code += `>${text}</Badge>`
    return code
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
          <p className="text-muted-foreground">
            Custom badge variants with different shapes and animations.
          </p>
        </div>

        <Separator />

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Playground</h2>
          <ComponentPlayground
            title="Badge Playground"
            description="Customize the badge properties to see different variations."
            component={<Badge variant={variant as any}>{text}</Badge>}
            code={generateCode()}
            controls={
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="variant">Variant</Label>
                  <Select value={variant} onValueChange={setVariant}>
                    <SelectTrigger id="variant">
                      <SelectValue placeholder="Select variant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="destructive">Destructive</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Badge Text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
              </div>
            }
          />
        </section>

        <Separator />

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Custom Variants
          </h2>

          <div className="space-y-10">
            {/* Rounded Badge */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Rounded Badge</h3>
              <div className="flex flex-wrap gap-4">
                <Badge className="rounded-full px-4">Rounded</Badge>
              </div>
              <CodeBlock
                code={`// Add this to your badge.tsx variants
{
  rounded: "rounded-full px-4",
}

// Or use it directly with className
<Badge className="rounded-full px-4">Rounded</Badge>`}
              />
            </div>

            {/* Gradient Badge */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Gradient Badge</h3>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Gradient
                </Badge>
              </div>
              <CodeBlock
                code={`// Add this to your badge.tsx variants
{
  gradient: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
}

// Or use it directly with className
<Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
  Gradient
</Badge>`}
              />
            </div>

            {/* Bordered Badge */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Bordered Badge</h3>
              <div className="flex flex-wrap gap-4">
                <Badge className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
                  Bordered
                </Badge>
              </div>
              <CodeBlock
                code={`// Add this to your badge.tsx variants
{
  bordered: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
}

// Or use it directly with className
<Badge className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground">
  Bordered
</Badge>`}
              />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <p>
            To use these custom badge variants, you'll need to modify your
            existing badge.tsx file or create a new one.
          </p>

          <CodeBlock
            code={`// badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants
        rounded: "rounded-full px-4",
        gradient: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
        bordered: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`}
          />
        </section>
      </div>
    </div>
  )
}
