"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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
import { Switch } from "@/components/ui/switch"
import { CodeBlock } from "@/components/code-block"
import { ComponentPlayground } from "@/components/component-playground"

export default function ButtonPage() {
  // State for playground
  const [variant, setVariant] = React.useState("default")
  const [size, setSize] = React.useState("default")
  const [disabled, setDisabled] = React.useState(false)
  const [text, setText] = React.useState("Button")

  // Generate code based on current state
  const generateCode = () => {
    let code = "<Button"
    if (variant !== "default") code += ` variant="${variant}"`
    if (size !== "default") code += ` size="${size}"`
    if (disabled) code += ` disabled`
    code += `>${text}</Button>`
    return code
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Button</h1>
          <p className="text-muted-foreground">
            Custom button variants with different styles and animations.
          </p>
        </div>

        <Separator />

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Playground</h2>
          <ComponentPlayground
            title="Button Playground"
            description="Customize the button properties to see different variations."
            component={
              <Button
                variant={variant as any}
                size={size as any}
                disabled={disabled}
              >
                {text}
              </Button>
            }
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
                      <SelectItem value="destructive">Destructive</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="icon">Icon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Button Text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="disabled"
                    checked={disabled}
                    onCheckedChange={setDisabled}
                  />
                  <Label htmlFor="disabled">Disabled</Label>
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
            {/* Gradient Button */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Gradient Button</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
                  Gradient Button
                </Button>
              </div>
              <CodeBlock
                code={`// Add this to your button.tsx variants
{
  gradient: "bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0",
}

// Or use it directly with className
<Button className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600">
  Gradient Button
</Button>`}
              />
            </div>

            {/* Animated Button */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Animated Button</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="relative overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[-100%] before:bg-gradient-to-r before:from-teal-500 before:to-teal-400 before:transition-transform before:duration-500 hover:text-white hover:before:translate-x-0">
                  Slide Effect
                </Button>
              </div>
              <CodeBlock
                code={`// Add this to your button.tsx variants
{
  slide: "relative overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[-100%] before:bg-gradient-to-r before:from-teal-500 before:to-teal-400 before:transition-transform before:duration-500 hover:text-white hover:before:translate-x-0",
}

// Or use it directly with className
<Button className="relative overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[-100%] before:bg-gradient-to-r before:from-teal-500 before:to-teal-400 before:transition-transform before:duration-500 hover:text-white hover:before:translate-x-0">
  Slide Effect
</Button>`}
              />
            </div>

            {/* 3D Button */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">3D Button</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="border-b-4 border-emerald-700 bg-emerald-500 text-white transition-all hover:-translate-y-[2px] hover:translate-x-[1px] hover:border-b-2 active:translate-x-[3px] active:translate-y-[2px] active:border-b-0">
                  3D Button
                </Button>
              </div>
              <CodeBlock
                code={`// Add this to your button.tsx variants
{
  "3d": "border-b-4 border-emerald-700 bg-emerald-500 text-white transition-all hover:-translate-y-[2px] hover:border-b-2 hover:translate-x-[1px] active:translate-y-[2px] active:border-b-0 active:translate-x-[3px]",
}

// Or use it directly with className
<Button className="border-b-4 border-emerald-700 bg-emerald-500 text-white transition-all hover:-translate-y-[2px] hover:border-b-2 hover:translate-x-[1px] active:translate-y-[2px] active:border-b-0 active:translate-x-[3px]">
  3D Button
</Button>`}
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
            To use these custom button variants, you'll need to modify your
            existing button.tsx file or create a new one.
          </p>

          <CodeBlock
            code={`// button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom variants
        gradient: "bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0",
        slide: "relative overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[-100%] before:bg-gradient-to-r before:from-teal-500 before:to-teal-400 before:transition-transform before:duration-500 hover:text-white hover:before:translate-x-0",
        "3d": "border-b-4 border-emerald-700 bg-emerald-500 text-white transition-all hover:-translate-y-[2px] hover:border-b-2 hover:translate-x-[1px] active:translate-y-[2px] active:border-b-0 active:translate-x-[3px]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`}
          />
        </section>
      </div>
    </div>
  )
}
