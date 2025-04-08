"use client"

import type React from "react"
import { ComponentDocResult } from "@/types"
import { AlertCircle, Info, InfoIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Tooltiper } from "./tooltiper"
import { SubHeading } from "./typography"

interface ComponentAPIProps {
  docs: ComponentDocResult
}

export default function ComponentAPI({ docs }: ComponentAPIProps) {
  let pageContent: React.ReactNode = null

  if (docs.error) {
    pageContent = (
      <Card className="w-full border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Failed to load component documentation: {docs.error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!docs.data) {
    pageContent = (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Info className="h-5 w-5" />
            <p>No documentation available for this component.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (docs.data) {
    pageContent =
      docs.data.props?.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/30 text-sm">
              <TableRow>
                <TableHead className="w-[180px]">Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[150px]">Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {docs.data.props.map((prop) => (
                <TableRow key={prop.name}>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>
                        {prop.name}
                        {prop.required && (
                          <Tooltiper content="Required">
                            <span className="cursor-default text-red-600">
                              *
                            </span>
                          </Tooltiper>
                        )}
                      </span>
                      {!!prop.description && (
                        <Popover>
                          <PopoverTrigger>
                            <InfoIcon className="size-3 text-blue-700 dark:text-blue-500" />
                          </PopoverTrigger>
                          <PopoverContent side="top" className="text-sm">
                            {prop.description}
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="leading-7">
                    <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                      {formatType(prop.type)}
                    </code>
                  </TableCell>
                  <TableCell>
                    {prop.defaultValue ? (
                      <code className="relative rounded-sm bg-muted px-[0.3rem] py-[0.2rem] font-mono">
                        {prop.defaultValue}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center gap-2 py-4 text-muted-foreground">
          <Info className="h-5 w-5" />
          <p>This component does not have any documented props.</p>
        </div>
      )
  }

  return (
    <section>
      <SubHeading id="api-reference" className="mb-6">
        API Reference
      </SubHeading>

      {pageContent}
    </section>
  )
}

// Helper function to format complex types for better readability
function formatType(type: string): React.ReactNode {
  // Handle union types
  if (type.includes(" | ")) {
    return type.split(" | ").map((t, i, arr) => (
      <span key={i}>
        {formatSimpleType(t)}
        {i < arr.length - 1 && (
          <span className="text-muted-foreground"> | </span>
        )}
      </span>
    ))
  }

  return formatSimpleType(type)
}

function formatSimpleType(type: string): React.ReactNode {
  // Handle common types
  const commonTypes = [
    "string",
    "number",
    "boolean",
    "object",
    "array",
    "function"
  ]

  if (commonTypes.includes(type)) {
    return <span className="text-green-600 dark:text-green-400">{type}</span>
  }

  // Handle common react types
  const baseReactTypes = ["React.ReactNode", "React.ReactElement"]

  const matchedBaseType = baseReactTypes.find((baseType) =>
    type.startsWith(baseType)
  )

  if (matchedBaseType) {
    const nextCharIndex = matchedBaseType.length
    if (type.length === nextCharIndex || type[nextCharIndex] === "<") {
      const highlightedPart = type.substring(0, nextCharIndex)
      const remainingPart = type.substring(nextCharIndex)

      return (
        <>
          <span className="text-blue-400">{highlightedPart}</span>
          {remainingPart}
        </>
      )
    }
  }

  // Handle array types
  if (type.endsWith("[]")) {
    const baseType = type.slice(0, -2)
    return (
      <>
        <span>{formatSimpleType(baseType)}</span>
        <span className="text-yellow-600 dark:text-yellow-400">[]</span>
      </>
    )
  }

  // Handle generic types
  if (type.includes("<") && type.includes(">")) {
    const baseType = type.slice(0, type.indexOf("<"))
    const genericType = type.slice(type.indexOf("<") + 1, type.lastIndexOf(">"))

    return (
      <>
        <span className="text-blue-600 dark:text-blue-400">{baseType}</span>
        <span>{"<"}</span>
        {formatType(genericType)}
        <span>{">"}</span>
      </>
    )
  }

  return type
}
