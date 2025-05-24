"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ColorPicker, hexToHsla, hexToRgba } from "@/components/ui/color-picker"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/simple-toast"

function getContrastingTextColor(
  backgroundHex: string | undefined | null
): string {
  if (!backgroundHex) {
    return "#000000"
  }
  const rgba = hexToRgba(backgroundHex)
  if (rgba) {
    const luminance = 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b
    return luminance > 140 ? "#000000" : "#FFFFFF"
  }
  return "#000000"
}

export function ColorPickerExample8() {
  const [textColor, setTextColor] = React.useState<string>("#E2E8F0") // light gray
  const [backgroundColor, setBackgroundColor] =
    React.useState<string>("#1E293B") // dark blue
  const [accentColor, setAccentColor] = React.useState<string>("#F59E0B") // amber

  const commonPresetColors = [
    "#FFFFFF",
    "#000000",
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#0EA5E9",
    "#6366F1",
    "#EC4899"
  ]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const submittedTextColor = formData.get("textColor") as string
    const submittedBackgroundColor = formData.get("backgroundColor") as string
    const submittedAccentColor = formData.get("accentColor") as string

    console.log("Form Submitted Data:", {
      textColor: submittedTextColor,
      backgroundColor: submittedBackgroundColor,
      accentColor: submittedAccentColor
    })

    toast({
      title: "Theme Saved",
      description: (
        <div className="space-y-2.5">
          <p>
            Text Color:{" "}
            <span
              style={{ color: submittedTextColor }}
              className="rounded border px-1.5 py-0.5"
            >
              {submittedTextColor}
            </span>
          </p>
          <p>
            Background Color:{" "}
            <span
              style={{ color: submittedBackgroundColor }}
              className="rounded border px-1.5 py-0.5"
            >
              {submittedBackgroundColor}
            </span>
          </p>
          <p>
            Accent Color:{" "}
            <span
              style={{ color: submittedAccentColor }}
              className="rounded border px-1.5 py-0.5"
            >
              {submittedAccentColor}
            </span>
          </p>
        </div>
      ),
      position: "top-center",
      duration: 7000,
      enterAnimationType: "zoom-in",
      showCloseButton: true
    })
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 rounded-xl bg-card p-6 text-card-foreground shadow-2xl">
      <h1 className="text-center text-3xl font-bold text-primary">
        Theme customization
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text-color-input" className="text-sm font-medium">
            Text Color
          </Label>
          <ColorPicker
            id="text-color-input"
            name="textColor"
            value={textColor}
            onChange={setTextColor}
            withAlpha
            className="h-11 w-full rounded-md border-input transition-colors hover:border-primary"
            selectorTitle="Select Text Color"
            presetColors={commonPresetColors}
          />
          <p className="text-xs text-muted-foreground">Current: {textColor}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bg-color-input" className="text-sm font-medium">
            Background Color
          </Label>
          <ColorPicker
            id="bg-color-input"
            name="backgroundColor"
            value={backgroundColor}
            onChange={setBackgroundColor}
            withAlpha
            className="h-11 w-full rounded-md border-input transition-colors hover:border-primary"
            selectorTitle="Select Background Color"
            popoverSide="top"
            presetColors={[
              "#0F172A",
              "#1E293B",
              "#334155",
              "#F8FAFC",
              "#E2E8F0",
              "#CBD5E1"
            ]}
          />
          <p className="text-xs text-muted-foreground">
            Current: {backgroundColor}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accent-color-input" className="text-sm font-medium">
            Accent Color
          </Label>
          <ColorPicker
            id="accent-color-input"
            name="accentColor"
            value={accentColor}
            onChange={setAccentColor}
            className="h-11 w-full rounded-md border-input transition-colors hover:border-primary"
            selectorTitle="Select Accent Color"
            showFormat={{ hex: true, rgb: true, hsl: false }}
            presetColors={[
              "#F59E0B",
              "#10B981",
              "#3B82F6",
              "#EC4899",
              "#8B5CF6"
            ]}
          />
          <p className="text-xs text-muted-foreground">
            Current: {accentColor}
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="text-center text-lg font-semibold">Preview</h3>
          <div
            className="rounded-lg border p-6 text-center shadow-inner transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
              borderColor: accentColor
            }}
          >
            <h4 className="mb-2 text-xl font-semibold">Example Title</h4>
            <p className="mb-4 text-sm">
              This is an example text to preview the selected colors. The accent
              color is used in the border.
            </p>
            <Button
              type="button"
              style={{
                backgroundColor: accentColor,
                color: getContrastingTextColor(accentColor)
              }}
              variant="outline"
              className="border-none font-semibold"
            >
              Example Button
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="!mt-8 h-10 w-full text-base font-semibold"
        >
          Save Theme
        </Button>
      </form>
    </div>
  )
}
