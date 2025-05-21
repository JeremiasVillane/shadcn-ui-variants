"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Props for FlexTable
 * @template T - Row object type
 */
interface FlexTableProps<T extends Record<string, unknown> = any>
  extends VariantProps<typeof tableVariants> {
  /**
   * An array of objects representing the raw, row-oriented data for the table.
   */
  data: T[]

  /**
   * Determines how headers are rendered. Use "vertical" to display headers as the top row.
   * "vertical" renders headers as top row; "horizontal" renders headers as first column
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal"

  /** @default "default" */
  // prettier-ignore
  variant?: "default" | "minimal" | "outline" | "card" | "striped" | "modern" | "compact" | "elegant"

  /** Optional CSS class for styling the table container. */
  className?: string

  /** Optional CSS class for styling header cells. */
  headerClassName?: string

  /** Optional CSS class for styling regular cells. */
  cellClassName?: string

  /** Optional React node to display when the data array is empty.
   * @default "No data" */
  emptyMessage?: React.ReactNode

  /**
   * Optional function for custom cell formatting that accepts the cell value, the row index,
   * and the key (column name) as arguments, returning a React node.
   */
  formatter?: (
    value: T[Extract<keyof T, string>],
    rowIndex: number,
    key: Extract<keyof T, string>
  ) => React.ReactNode

  /** Optional flag to enable sorting of the table.
   * When true, clicking a header toggles sort order (asc → desc → none).
   * @default false */
  sortable?: boolean

  /** Optional function to include/exclude rows.
   * Return true to keep the row, false to omit it. */
  filterBy?: (row: T) => boolean
}

const tableVariants = cva("overflow-hidden rounded-md border text-sm", {
  variants: {
    variant: {
      default: "",
      minimal: "border-none",
      outline: "border-2",
      card: "bg-card shadow-md",
      striped: "",
      modern: "border-none shadow-lg",
      compact: "",
      elegant: "border-none"
    },
    orientation: {
      vertical: "min-w-[300px]",
      horizontal: "w-fit"
    }
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical"
  }
})

const headerVariants = cva("p-2 font-medium", {
  variants: {
    variant: {
      default: "bg-muted/50",
      minimal: "bg-transparent font-semibold",
      outline: "bg-muted/50 divide-x-0 border-0",
      card: "bg-muted/30",
      striped: "bg-primary/10",
      modern: "bg-background p-3 text-primary font-semibold",
      compact: "bg-muted/50 p-1 text-xs",
      elegant:
        "bg-transparent p-3 text-muted-foreground uppercase text-xs tracking-wider"
    },
    orientation: {
      vertical: "",
      horizontal: ""
    }
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical"
  },
  compoundVariants: [
    {
      variant: "minimal",
      orientation: "vertical",
      className: "border-b"
    },
    {
      variant: "minimal",
      orientation: "horizontal",
      className: "border-r"
    },
    {
      variant: "elegant",
      orientation: "vertical",
      className: "border-b border-primary/20"
    },
    {
      variant: "elegant",
      orientation: "horizontal",
      className: "border-r border-primary/20"
    },
    {
      variant: "modern",
      orientation: "vertical",
      className: "border-b-2"
    },
    {
      variant: "modern",
      orientation: "horizontal",
      className: "border-r-2"
    }
  ]
})

const cellVariants = cva("p-2", {
  variants: {
    variant: {
      default: "",
      minimal: "",
      outline: "divide-x-0 border-0",
      card: "",
      striped: "",
      modern: "p-3",
      compact: "p-1 text-xs",
      elegant: "p-3 border-border/40"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

/**
 * Generic type for a column structure
 */
type Column<T> = {
  header: Extract<keyof T, string>
  items: Array<T[Extract<keyof T, string>]>
  className?: string
}

type SortOrder = "asc" | "desc" | null

/**
 * Transforms an array of row objects into column-oriented data
 * @param data - Array of objects with uniform keys
 * @returns Array of Column<T> where each column has a header and its items
 */
function formatTableData<T extends Record<string, unknown>>(
  data: T[]
): Column<T>[] {
  if (data.length === 0) return []

  const keys = Object.keys(data[0]) as Array<keyof T>

  return keys.map((key) => ({
    header: key as Extract<keyof T, string>,
    items: data.map((row) => row[key] as T[Extract<keyof T, string>])
  }))
}

function FlexTable<T extends Record<string, unknown>>({
  data,
  orientation = "vertical",
  className,
  headerClassName,
  cellClassName,
  emptyMessage = "No data",
  formatter = (value) => value as React.ReactNode,
  sortable = false,
  filterBy,
  variant = "default"
}: FlexTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(null)

  const filteredData = React.useMemo(() => {
    return filterBy ? data.filter(filterBy) : data
  }, [data, filterBy])

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortOrder) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [filteredData, sortKey, sortOrder])

  const columns: Column<T>[] = formatTableData(sortedData)
  const rowCount = columns[0]?.items?.length ?? 0
  const maxItems = Math.max(...columns.map((c) => c.items.length), 0)

  const handleSort = (key: keyof T) => {
    if (!sortable) return
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc")
      } else if (sortOrder === "desc") {
        setSortKey(null)
        setSortOrder(null)
      }
    } else {
      setSortKey(key)
      setSortOrder("asc")
    }
  }

  if (columns.length === 0 || maxItems === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[64px] items-center justify-center rounded-md border p-4 text-sm text-muted-foreground",
          className
        )}
      >
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={cn(tableVariants({ variant, orientation }), className)}>
      {orientation === "vertical" ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, auto)`
          }}
        >
          {/* Header Cells */}
          {columns.map((column, colIndex) => (
            <div
              key={`header-${column.header}`}
              className={cn(
                sortable && "cursor-pointer select-none",
                colIndex < columns.length - 1 && "border-r",
                headerVariants({ variant, orientation: "vertical" }),
                headerClassName,
                column.className
              )}
              onClick={() => handleSort(column.header)}
            >
              {column.header}
              {sortable &&
                sortKey === column.header &&
                (sortOrder === "asc" ? " ↑" : " ↓")}
            </div>
          ))}

          {/* Data Cells */}
          {Array.from({ length: rowCount }).flatMap((_, rowIndex) =>
            columns.map((column, colIndex) => (
              <div
                key={`${String(column.header)}-${rowIndex}`}
                className={cn(
                  colIndex < columns.length - 1 && "border-r",
                  rowIndex < rowCount - 1 && "border-b",
                  cellVariants({ variant }),
                  variant === "striped" && rowIndex % 2 === 0 && "bg-muted/30",
                  cellClassName,
                  column.className
                )}
              >
                {formatter(column.items[rowIndex], rowIndex, column.header)}
              </div>
            ))
          )}
        </div>
      ) : (
        // Horizontal Orientation
        <div
          className="grid"
          style={{
            gridTemplateColumns: `120px repeat(${maxItems}, 1fr)`
          }}
        >
          {columns.map((column, colIndex) => (
            <React.Fragment key={String(column.header)}>
              {/* Header Cell */}
              <div
                className={cn(
                  colIndex > 0 && "border-t",
                  headerVariants({ variant, orientation: "horizontal" }),
                  sortable && "cursor-pointer select-none",
                  headerClassName,
                  column.className
                )}
                style={{
                  gridRow: colIndex + 1,
                  gridColumn: 1
                }}
                onClick={() => handleSort(column.header)}
              >
                {column.header}
                {sortable &&
                  sortKey === column.header &&
                  (sortOrder === "asc" ? " ↑" : " ↓")}
              </div>

              {/* Data Cells */}
              {column.items.map((item, itemIndex) => (
                <div
                  key={`${String(column.header)}-${itemIndex}`}
                  className={cn(
                    itemIndex + 1 < maxItems && "border-r",
                    colIndex > 0 && "border-t",
                    cellVariants({ variant }),
                    variant === "striped" &&
                      itemIndex % 2 === 0 &&
                      "bg-muted/30",
                    cellClassName
                  )}
                  style={{
                    gridRow: colIndex + 1,
                    gridColumn: itemIndex + 2
                  }}
                >
                  {formatter(item, itemIndex, column.header)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

const RowTable = <T extends Record<string, unknown>>(
  props: Omit<FlexTableProps<T>, "orientation">
) => <FlexTable {...props} orientation="vertical" />

const ColumnTable = <T extends Record<string, unknown>>(
  props: Omit<FlexTableProps<T>, "orientation">
) => <FlexTable {...props} orientation="horizontal" />

export { FlexTable, RowTable, ColumnTable, formatTableData }
export type { FlexTableProps, Column }
