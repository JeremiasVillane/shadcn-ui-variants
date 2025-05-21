"use client"

import * as React from "react"
import { formatType } from "@/helpers/parse-prop-types"
import { ComponentDocResult } from "@/types"
import { AlertCircle, InfoIcon } from "lucide-react"

import { toPascalCase } from "@/lib/string-utils"
import { Card, CardContent } from "@/components/local/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/local/ui/popover"
import { H2, InlineCode } from "@/components/ui/prose"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/local/ui/table"

import { Tooltiper } from "../tooltiper"

interface ComponentAPIProps {
  docs: ComponentDocResult
  name: string
}

export default function ComponentAPI({ docs, name }: ComponentAPIProps) {
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

  if (docs.data) {
    pageContent =
      docs.data.props?.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/30 text-xs md:text-sm">
              <TableRow>
                <TableHead className="w-[180px]">Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[150px]">Default</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs md:text-sm">
              {docs.data.props.map((prop) => (
                <TableRow key={prop.name}>
                  <TableCell className="font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>
                        {prop.name}
                        {prop.required && (
                          <Tooltiper
                            content="Required"
                            className="border bg-background text-xs text-foreground md:text-sm"
                          >
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
                          <PopoverContent
                            side="top"
                            className="text-xs md:text-sm"
                          >
                            {prop.description}
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="leading-7">
                    <InlineCode>{formatType(prop.type)}</InlineCode>
                  </TableCell>
                  <TableCell>
                    {prop.defaultValue ? (
                      <InlineCode>{prop.defaultValue}</InlineCode>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null
  }

  return (
    !!pageContent && (
      <>
        <H2 id="api-reference" className="mb-6">
          {toPascalCase(name)} Props
        </H2>

        {pageContent}
      </>
    )
  )
}
