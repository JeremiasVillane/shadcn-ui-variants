import React from "react"

import { getFileContent } from "@/lib/file-utils"
import { List, ListItem } from "@/components/ui/list"
import { H2, H3, H4, InlineCode, Muted, P, Strong } from "@/components/ui/prose"
import { Separator } from "@/components/ui/separator"
import { CopyToClipboardButton } from "@/components/common"
import { ComponentTabs } from "@/components/component-view/component-tabs"
import { CodeBlock } from "@/components/local/ui/code-block"

import {
  ColorPickerExample1,
  ColorPickerExample2,
  ColorPickerExample3,
  ColorPickerExample4,
  ColorPickerExample5,
  ColorPickerExample6,
  ColorPickerExample7,
  ColorPickerExample8
} from "./examples"

const importCode = `import { ColorPicker } from "@/components/ui/color-picker";`
const implementationCode = `<ColorPicker />`

export async function ColorPickerExtras() {
  const [
    example1Code,
    example2Code,
    example3Code,
    example4Code,
    example5Code,
    example6Code,
    example7Code,
    example8Code
  ] = await Promise.all(
    [1, 2, 3, 4, 5, 6, 7, 8].map((num) =>
      getFileContent(
        `data/components-index/color-picker/examples/color-picker-example-${num}.tsx`
      )
    )
  )

  return (
    <>
      <H2 id="overview">Overview</H2>
      <P>
        <Strong>Color Picker</Strong> is a versatile color picker component
        built upon the lightweight library{" "}
        <InlineCode>react-colorful</InlineCode>. It allows users to select
        colors visually or by entering values in <InlineCode>HEX</InlineCode>,{" "}
        <InlineCode>RGB</InlineCode>, or <InlineCode>HSL</InlineCode> formats.
        It supports alpha channel selection, preset color palettes, and
        customizable input formats. Built as a popover for easy integration.
      </P>

      <H2 id="usage">Basic Usage</H2>

      <div className="space-y-6 pb-1 pt-4">
        {[importCode, implementationCode].map((code, index) => (
          <article key={index} className="relative">
            <CodeBlock className="border pb-3" language="tsx" code={code} />
            <div className="absolute right-2 top-2 flex">
              <CopyToClipboardButton content={code} />
            </div>
          </article>
        ))}
      </div>

      <H2 id="examples">Examples</H2>

      {[
        {
          id: "example1",
          title: "Controlled Component",
          description: "Manage the color state outside the component.",
          code: example1Code,
          name: "color-picker-example-1",
          Component: ColorPickerExample1
        },
        {
          id: "example2",
          title: "Uncontrolled Component with Default Color",
          description:
            "Set an initial color without controlling its state externally.",
          code: example2Code,
          name: "color-picker-example-2",
          Component: ColorPickerExample2
        },
        {
          id: "example3",
          title: "Alpha Channel",
          description: "Enable the alpha channel for transparency selection.",
          footer: (
            <>
              When <InlineCode>withAlpha</InlineCode> is true, HEX values will
              include the alpha component (e.g.,{" "}
              <InlineCode>#RRGGBBAA</InlineCode>). RGB and HSL inputs will also
              show an "Alpha" field.
            </>
          ),
          code: example3Code,
          name: "color-picker-example-3",
          Component: ColorPickerExample3
        },
        {
          id: "example4",
          title: (
            <>
              Customizing Input Formats (
              <InlineCode scale="lg" className="text-xl">
                showFormat
              </InlineCode>
              )
            </>
          ),
          description:
            "Control which color model input fields (HEX, RGB, HSL) are available.",
          footer: (
            <>
              If only one format is enabled (e.g.,{" "}
              <InlineCode>{"showFormat={{ hex: true }}"}</InlineCode>), the
              toggle group for format selection will be hidden. If{" "}
              <InlineCode>showFormat</InlineCode> results in no formats being
              explicitly enabled, "HEX" will be shown as a fallback.
            </>
          ),
          code: example4Code,
          name: "color-picker-example-4",
          Component: ColorPickerExample4
        },
        {
          id: "example5",
          title: (
            <>
              Preset Colors (
              <InlineCode scale="lg" className="text-xl">
                presetColors
              </InlineCode>
              )
            </>
          ),
          description:
            "Provide an array of HEX strings for quick color selection.",
          code: example5Code,
          name: "color-picker-example-5",
          Component: ColorPickerExample5
        },
        {
          id: "example6",
          title: "Custom Trigger",
          description:
            "Replace the default button trigger with a custom element.",
          code: example6Code,
          name: "color-picker-example-6",
          Component: ColorPickerExample6
        },
        {
          id: "example7",
          title: (
            <>
              "Add New Color" Action (
              <InlineCode scale="lg" className="text-xl">
                onAddColor
              </InlineCode>
              )
            </>
          ),
          description: (
            <>
              Utilize the <InlineCode>onAddColor</InlineCode> callback for
              custom actions.
            </>
          ),
          footer: (
            <>
              The "Add New Color" button appears at the bottom of the popover if{" "}
              <InlineCode>onAddColor</InlineCode> is provided.
            </>
          ),
          code: example7Code,
          name: "color-picker-example-7",
          Component: ColorPickerExample7
        },
        {
          id: "example8",
          title: "Form Integration",
          code: example8Code,
          name: "color-picker-example-8",
          Component: ColorPickerExample8
        }
      ].map((example) => (
        <React.Fragment key={example.id}>
          <H3 id={example.id}>{example.title}</H3>
          {!!example.description && (
            <P className="leading-3">{example.description}</P>
          )}
          <ComponentTabs
            code={example.code}
            name={example.name}
            Component={example.Component}
          />
          {!!example.footer && (
            <Muted className="ml-4 mt-0">{example.footer}</Muted>
          )}
        </React.Fragment>
      ))}

      <H2 id="color-utilities">Color Utilities</H2>

      <P>
        Alongside the <Strong>ColorPicker</Strong> component, several utility
        functions for color conversion are also exported. These can be useful
        for manual color manipulations elsewhere in your application.
      </P>

      <Separator variant="double" className="my-8" />

      <H3 id="rgbaToHex">
        <InlineCode scale="lg" className="text-lg">
          rgbaToHex()
        </InlineCode>
      </H3>

      <P>
        Converts RGBA (Red, Green, Blue, Alpha) color values to a HEX string.
      </P>

      <H4>Signature:</H4>

      <CodeBlock
        className="pb-4"
        language="ts"
        code={`function rgbaToHex(r: number, g: number, b: number, a?: number): string;`}
      />

      <H4>Parameters:</H4>

      <List>
        <ListItem>
          <InlineCode>r: number</InlineCode> The red color component (0-255).
        </ListItem>
        <ListItem>
          <InlineCode>g: number</InlineCode> The green color component (0-255).
        </ListItem>
        <ListItem>
          <InlineCode>b: number</InlineCode> The blue color component (0-255).
        </ListItem>
        <ListItem>
          <InlineCode>a?: number</InlineCode> (optional) The alpha (opacity)
          component (0-1). Defaults to <InlineCode>1</InlineCode> (fully
          opaque).
        </ListItem>
      </List>

      <H4>Returns:</H4>

      <List>
        <ListItem>
          <InlineCode>(string)</InlineCode>: An uppercase HEX color string with
          a leading <InlineCode>#</InlineCode>.
        </ListItem>
        <ListItem>
          If alpha is <InlineCode>1</InlineCode> or undefined, a 6-digit HEX
          string is returned (e.g.,
          <InlineCode>"#RRGGBB"</InlineCode>).
        </ListItem>
        <ListItem>
          If alpha is less than <InlineCode>1</InlineCode>, an 8-digit HEX
          string is returned (e.g.,
          <InlineCode>"#RRGGBBAA"</InlineCode>).
        </ListItem>
      </List>

      <H4>Example:</H4>

      <CodeBlock
        className="pb-4"
        language="tsx"
        code={`import { rgbaToHex } from "@/components/ui/color-picker";

const hexColorOpaque = rgbaToHex(255, 165, 0); // Returns "#FFA500"
const hexColorTransparent = rgbaToHex(75, 0, 130, 0.5); // Returns "#4B008280" (Indigo with 50% alpha)`}
      />

      <Separator variant="double" className="my-8" />

      <H3 id="hexToRgba">
        <InlineCode scale="lg" className="text-lg">
          hexToRgba()
        </InlineCode>
      </H3>

      <P>Converts a HEX color string to an RGBA object.</P>

      <H4>Signature:</H4>

      <CodeBlock
        className="pb-4"
        language="ts"
        code={`function hexToRgba(hex: string | null | undefined): RgbaColor | null;`}
      />

      <H4>Parameters:</H4>

      <List>
        <ListItem>
          <InlineCode>hex: string | null | undefined</InlineCode> The HEX color
          string. It can be 3-digit (<InlineCode>#RGB</InlineCode>), 4-digit (
          <InlineCode>#RGBA</InlineCode>), 6-digit (
          <InlineCode>#RRGGBB</InlineCode>), or 8-digit (
          <InlineCode>#RRGGBBAA</InlineCode>). The leading{" "}
          <InlineCode>#</InlineCode> is optional. The function is
          case-insensitive.
        </ListItem>
      </List>

      <H4>Returns:</H4>

      <List>
        <ListItem className="space-y-2">
          <span>
            <InlineCode>(RgbaColor | null)</InlineCode>: An object representing
            the RGBA color, or
            <InlineCode>null</InlineCode> if the input HEX string is invalid.
            The <InlineCode>RgbaColor</InlineCode> object has the following
            structure:
          </span>
          <CodeBlock
            className="pb-4"
            language="ts"
            code={`interface RgbaColor {
      r: number; // 0-255
      g: number; // 0-255
      b: number; // 0-255
      a: number; // 0-1
    }`}
          />
        </ListItem>
      </List>

      <H4>Example:</H4>

      <CodeBlock
        className="pb-4"
        language="tsx"
        code={`import { hexToRgba } from "@/components/ui/color-picker";

const rgbaColor1 = hexToRgba("#FF0000");    // Returns { r: 255, g: 0, b: 0, a: 1 }
const rgbaColor2 = hexToRgba("00FF0080"); // Returns { r: 0, g: 255, b: 0, a: 0.5 } (approx)
const rgbaColor3 = hexToRgba("#F0A");      // Returns { r: 255, g: 0, b: 170, a: 1 }
const invalidColor = hexToRgba("#12345"); // Returns null

`}
      />

      <Separator variant="double" className="my-8" />

      <H3 id="hexToHsla">
        <InlineCode scale="lg" className="text-lg">
          hexToHsla()
        </InlineCode>
      </H3>

      <P>
        Converts a HEX color string to an HSLA (Hue, Saturation, Lightness,
        Alpha) object.
      </P>

      <H4>Signature:</H4>

      <CodeBlock
        className="pb-4"
        language="ts"
        code={`function hexToHsla(hex: string | null | undefined): HslaColor | null;`}
      />

      <H4>Parameters:</H4>

      <List>
        <ListItem>
          <InlineCode>hex: string | null | undefined</InlineCode> The HEX color
          string. It can be 3, 4, 6, or 8 digits, with or without a leading{" "}
          <InlineCode>#</InlineCode>. Case-insensitive.
        </ListItem>
      </List>

      <H4>Returns:</H4>

      <List>
        <ListItem>
          <InlineCode>(HslaColor | null)</InlineCode>: An object representing
          the HSLA color, or <InlineCode>null</InlineCode>
          if the input HEX string is invalid. The{" "}
          <InlineCode>HslaColor</InlineCode> object has the following structure:
          <CodeBlock
            className="pb-4"
            language="ts"
            code={`interface HslaColor {
      h: number; // 0-360 (degrees)
      s: number; // 0-100 (percentage)
      l: number; // 0-100 (percentage)
      a: number; // 0-1 (alpha)
    }`}
          />
        </ListItem>
      </List>

      <H4>Example:</H4>

      <CodeBlock
        className="pb-4"
        language="tsx"
        code={`import { hexToHsla } from "@/components/ui/color-picker";

const hslaColor1 = hexToHsla("#00FF00");    // Returns approx. { h: 120, s: 100, l: 50, a: 1 }
const hslaColor2 = hexToHsla("#4B008280"); // Returns approx. { h: 275, s: 100, l: 25, a: 0.5 }
`}
      />

      <Separator variant="double" className="my-8" />

      <H3 id="hslaToHex">
        <InlineCode scale="lg" className="text-lg">
          hslaToHex()
        </InlineCode>
      </H3>

      <P>
        Converts HSLA (Hue, Saturation, Lightness, Alpha) color values to a HEX
        string.
      </P>

      <H4>Signature:</H4>

      <CodeBlock
        className="pb-4"
        language="ts"
        code={`function hslaToHex(h: number, s: number, l: number, a?: number): string;`}
      />

      <H4>Parameters:</H4>

      <List>
        <ListItem>
          <InlineCode>h: number</InlineCode> The hue component (0-360 degrees).
        </ListItem>
        <ListItem>
          <InlineCode>s: number</InlineCode> The saturation component (0-100, as
          a percentage).
        </ListItem>
        <ListItem>
          <InlineCode>l: number</InlineCode> The lightness component (0-100, as
          a percentage).
        </ListItem>
        <ListItem>
          <InlineCode>a?: number</InlineCode> (optional) The alpha (opacity)
          component (0-1). Defaults to <InlineCode>1</InlineCode> (fully
          opaque).
        </ListItem>
      </List>

      <H4>Returns:</H4>

      <List>
        <ListItem>
          <InlineCode>(string)</InlineCode>: An uppercase HEX color string with
          a leading <InlineCode>#</InlineCode>.
        </ListItem>
        <ListItem>
          If alpha is <InlineCode>1</InlineCode> or undefined, a 6-digit HEX
          string is returned (e.g.,
          <InlineCode>"#RRGGBB"</InlineCode>).
        </ListItem>
        <ListItem>
          If alpha is less than <InlineCode>1</InlineCode>, an 8-digit HEX
          string is returned (e.g.,
          <InlineCode>"#RRGGBBAA"</InlineCode>).
        </ListItem>
      </List>

      <H4>Example:</H4>

      <CodeBlock
        className="pb-4"
        language="tsx"
        code={`import { hslaToHex } from "@/components/ui/color-picker";

const hexFromHsl1 = hslaToHex(240, 100, 50);       // Returns "#0000FF" (Blue)
const hexFromHsl2 = hslaToHex(0, 100, 50, 0.75); // Returns "#FF0000BF" (Red with 75% alpha)
`}
      />

      <H2 id="accessibility">Accessibility</H2>

      <List>
        <ListItem>
          <Strong>Label Association:</Strong> Use the{" "}
          <InlineCode>id</InlineCode> prop in conjunction with a{" "}
          <InlineCode>{"<Label htmlFor={id}>"}</InlineCode> to ensure proper
          accessibility for screen readers and keyboard navigation in forms.
        </ListItem>
        <ListItem>
          <Strong>Keyboard Navigation:</Strong>
          <List variant="bullet-outline">
            <ListItem>
              The <InlineCode>PopoverTrigger</InlineCode> (default button or
              custom trigger) is focusable and can be activated using{" "}
              <InlineCode>Space</InlineCode> or <InlineCode>Enter</InlineCode>.
            </ListItem>
            <ListItem>
              Once the popover is open, focus is managed within it. Navigation
              between the color selection canvas, input fields, toggle group,
              and buttons follows standard keyboard patterns, largely inherited
              from the underlying components (<InlineCode>Popover</InlineCode>,{" "}
              <InlineCode>Input</InlineCode>, <InlineCode>Button</InlineCode>,
              <InlineCode>ToggleGroup</InlineCode>).
            </ListItem>
            <ListItem>
              Color swatches from <InlineCode>defaultColors</InlineCode> are
              implemented as <InlineCode>button</InlineCode>
              elements, making them focusable and activatable with{" "}
              <InlineCode>Enter</InlineCode> or
              <InlineCode>Space</InlineCode>.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Strong>ARIA Attributes:</Strong> Default ARIA attributes are applied
          by the underlying components to enhance accessibility. The
          <InlineCode>aria-label</InlineCode> on format toggle buttons and{" "}
          <InlineCode>defaultColor</InlineCode> swatch buttons provide
          descriptive names for assistive technologies.
        </ListItem>
      </List>
    </>
  )
}
