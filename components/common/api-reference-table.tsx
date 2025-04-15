import { formatType } from "@/helpers/parse-prop-types"
import { InfoIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/local/ui/popover"
import { InlineCode } from "@/components/ui/prose"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/local/ui/table"

interface ApiReferenceTableProps {
  data: { name: string; type: string; default?: string; description?: string }[]
}

export function ApiReferenceTable({ data }: ApiReferenceTableProps) {
  return (
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
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono">
                <div className="flex items-center gap-1.5">
                  <span>{row.name}</span>
                  {!!row.description && (
                    <Popover>
                      <PopoverTrigger>
                        <InfoIcon className="size-3 text-blue-700 dark:text-blue-500" />
                      </PopoverTrigger>
                      <PopoverContent side="top" className="text-xs md:text-sm">
                        {row.description}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </TableCell>
              <TableCell className="leading-7">
                <InlineCode>
                  <span className="space-x-1">
                    <InlineCode>{formatType(row.type)}</InlineCode>
                  </span>
                </InlineCode>
              </TableCell>
              <TableCell>
                {!!row.default ? <InlineCode>{row.default}</InlineCode> : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
