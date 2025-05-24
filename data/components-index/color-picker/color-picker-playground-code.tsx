"use client"

import { ColorPickerProps } from "@/components/ui/color-picker"

export const colorPickerPlaygroundCode = ({
  popoverSide,
  popoverAlign,
  withAlpha,
  selectorTitle
}: ColorPickerProps): string => {
  const code = `import { ColorPicker } from "@/components/ui/color-picker"

export function ColorPickerPlayground() {
  return (
    <ColorPicker
      defaultColor="#335599"
      className="border-2 border-muted-foreground shadow"${
        popoverSide !== "bottom"
          ? `
      popoverSide="${popoverSide}"`
          : ""
      }${
        popoverAlign !== "center"
          ? `
      popoverAlign="${popoverAlign}"`
          : ""
      }${
        withAlpha
          ? `
      withAlpha`
          : ""
      }${
        (selectorTitle as string).length > 0
          ? `
      selectorTitle="${selectorTitle}"`
          : ""
      }
    />
  )
}
`

  return code
}
