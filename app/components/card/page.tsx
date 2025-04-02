"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
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

export default function CardPage() {
  // State for playground
  const [variant, setVariant] = React.useState("default")
  const [showHeader, setShowHeader] = React.useState(true)
  const [showFooter, setShowFooter] = React.useState(true)
  const [title, setTitle] = React.useState("Card Title")
  const [description, setDescription] = React.useState("Card Description")
  const [content, setContent] = React.useState("Card Content")

  // Generate code based on current state
  const generateCode = () => {
    let code = "<Card"
    if (variant !== "default")
      code += ` className="${getVariantClass(variant)}"`
    code += ">\n"
    if (showHeader) {
      code += "  <CardHeader>\n"
      code += `    <CardTitle>${title}</CardTitle>\n`
      code += `    <CardDescription>${description}</CardDescription>\n`
      code += "  </CardHeader>\n"
    }
    code += "  <CardContent>\n"
    code += `    <p>${content}</p>\n`
    code += "  </CardContent>\n"
    if (showFooter) {
      code += "  <CardFooter>\n"
      code += "    <Button>Action</Button>\n"
      code += "  </CardFooter>\n"
    }
    code += "</Card>"
    return code
  }

  const getVariantClass = (variant: string) => {
    switch (variant) {
      case "hover-effect":
        return "transition-all hover:shadow-lg hover:-translate-y-1"
      case "border-gradient":
        return "relative before:absolute before:inset-0 before:p-[2px] before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-violet-500 before:-z-10 before:content-['']"
      case "glass":
        return "bg-white/10 backdrop-blur-lg border-white/20 dark:bg-black/10 dark:border-black/20"
      default:
        return ""
    }
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Card</h1>
          <p className="text-muted-foreground">
            Enhanced card components with hover effects and animations.
          </p>
        </div>

        <Separator />

        <section className="space-y-8">
          <h2 className="text-2xl font-semibold tracking-tight">Playground</h2>
          <ComponentPlayground
            title="Card Playground"
            description="Customize the card properties to see different variations."
            component={
              <Card className={getVariantClass(variant)}>
                {showHeader && (
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                )}
                <CardContent>
                  <p>{content}</p>
                </CardContent>
                {showFooter && (
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                )}
              </Card>
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
                      <SelectItem value="hover-effect">Hover Effect</SelectItem>
                      <SelectItem value="border-gradient">
                        Border Gradient
                      </SelectItem>
                      <SelectItem value="glass">Glass Effect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Card Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Card Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Card Content</Label>
                  <Input
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-header"
                    checked={showHeader}
                    onCheckedChange={setShowHeader}
                  />
                  <Label htmlFor="show-header">Show Header</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-footer"
                    checked={showFooter}
                    onCheckedChange={setShowFooter}
                  />
                  <Label htmlFor="show-footer">Show Footer</Label>
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
            {/* Hover Effect Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Hover Effect Card</h3>
              <div className="flex flex-wrap gap-4">
                <Card className="max-w-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Hover Effect</CardTitle>
                    <CardDescription>Card with hover animation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This card has a subtle lift and shadow effect on hover.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
              </div>
              <CodeBlock
                code={`<Card className="transition-all hover:shadow-lg hover:-translate-y-1">
  <CardHeader>
    <CardTitle>Hover Effect</CardTitle>
    <CardDescription>Card with hover animation</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a subtle lift and shadow effect on hover.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
              />
            </div>

            {/* Border Gradient Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Border Gradient Card</h3>
              <div className="flex flex-wrap gap-4">
                <Card className="relative max-w-sm before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-violet-500 before:p-[2px] before:content-['']">
                  <CardHeader>
                    <CardTitle>Border Gradient</CardTitle>
                    <CardDescription>Card with gradient border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This card has a beautiful gradient border effect.</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
              </div>
              <CodeBlock
                code={`<Card className="relative before:absolute before:inset-0 before:p-[2px] before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-violet-500 before:-z-10 before:content-['']">
  <CardHeader>
    <CardTitle>Border Gradient</CardTitle>
    <CardDescription>Card with gradient border</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a beautiful gradient border effect.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
              />
            </div>

            {/* Glass Effect Card */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">Glass Effect Card</h3>
              <div className="flex flex-wrap gap-4 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 p-8">
                <Card className="max-w-sm border-white/20 bg-white/10 backdrop-blur-lg dark:border-black/20 dark:bg-black/10">
                  <CardHeader>
                    <CardTitle>Glass Effect</CardTitle>
                    <CardDescription>Card with glassmorphism</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      This card has a modern glass effect with backdrop blur.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
              </div>
              <CodeBlock
                code={`<Card className="bg-white/10 backdrop-blur-lg border-white/20 dark:bg-black/10 dark:border-black/20">
  <CardHeader>
    <CardTitle>Glass Effect</CardTitle>
    <CardDescription>Card with glassmorphism</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a modern glass effect with backdrop blur.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
              />
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
          <p>
            To use these custom card variants, simply add the appropriate
            className to your Card component.
          </p>

          <CodeBlock
            code={`// Example usage
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Hover Effect Card
<Card className="transition-all hover:shadow-lg hover:-translate-y-1">
  <CardHeader>
    <CardTitle>Hover Effect</CardTitle>
    <CardDescription>Card with hover animation</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a subtle lift and shadow effect on hover.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Border Gradient Card
<Card className="relative before:absolute before:inset-0 before:p-[2px] before:rounded-lg before:bg-gradient-to-r before:from-pink-500 before:to-violet-500 before:-z-10 before:content-['']">
  <CardHeader>
    <CardTitle>Border Gradient</CardTitle>
    <CardDescription>Card with gradient border</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a beautiful gradient border effect.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Glass Effect Card
<Card className="bg-white/10 backdrop-blur-lg border-white/20 dark:bg-black/10 dark:border-black/20">
  <CardHeader>
    <CardTitle>Glass Effect</CardTitle>
    <CardDescription>Card with glassmorphism</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This card has a modern glass effect with backdrop blur.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
          />
        </section>
      </div>
    </div>
  )
}
