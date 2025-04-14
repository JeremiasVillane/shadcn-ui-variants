import { List, ListItem } from "@/components/ui/list"
import { H2, H3, InlineCode, P } from "@/components/ui/prose"
import { ApiReferenceTable } from "@/components/common"

const toasterApiProps = [
  {
    name: "defaultDuration",
    type: "number",
    default: "5000",
    description: "Default duration in ms (`Infinity` disables auto-close)."
  },
  {
    name: "defaultPosition",
    type: `"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"`,
    default: '"bottom-right"',
    description: "Default position on screen."
  },
  {
    name: "defaultEnterAnimationType",
    type: `"fade-in" | "slide-down" | "slide-up" | "slide-left" | "slide-right" | "zoom-in"`,
    default: '"fade-in"',
    description: "Default enter animation."
  },
  {
    name: "defaultExitAnimationType",
    type: `"fade-out" | "slide-out-up" | "slide-out-down" | "slide-out-right" | "slide-out-left" | "zoom-out"`,
    default: '"fade-out"',
    description: "Default exit animation (used if not inferred or specified)."
  },
  {
    name: "defaultShowCloseButton",
    type: "boolean",
    default: "false",
    description: "Show close button 'X' by default."
  },
  {
    name: "defaultShowProgressBar",
    type: "boolean",
    default: "false",
    description: "Show progress bar by default."
  },
  {
    name: "gap",
    type: "number",
    default: "16",
    description: "Pixel spacing between toasts in the same position."
  },
  {
    name: "className",
    type: "string",
    description: "CSS classes to apply to position containers."
  },
  {
    name: "...rest",
    type: "HTMLAttributes<HTMLDivElement>",
    default: "N/A",
    description: "Other standard HTML props for `div` position containers."
  }
]

const toastOptionsApi = [
  {
    name: "type",
    type: `"info" | "success" | "warning" | "error"`,
    default: '"info"',
    description: "Type of toast (`success`, `error`, `warning`, `info`)."
  },
  {
    name: "title",
    type: "React.ReactNode",
    default: "Required",
    description: "Main title (string or JSX)."
  },
  {
    name: "description",
    type: "React.ReactNode",
    description: "Additional description (string or JSX)."
  },
  {
    name: "duration",
    type: "number | Infinity",
    default: "Global `defaultDuration`",
    description: "Duration in ms. `Infinity` or `0` to disable auto-closing."
  },
  {
    name: "position",
    type: `"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"`,
    default: "Global `defaultPosition`",
    description: "Position on screen."
  },
  {
    name: "enterAnimationType",
    type: `"fade-in" | "slide-down" | "slide-up" | "slide-left" | "slide-right" | "zoom-in"`,
    default: "Global `defaultEnterAnimationType`",
    description: "Specific enter animation."
  },
  {
    name: "exitAnimationType",
    type: `"fade-out" | "slide-out-up" | "slide-out-down" | "slide-out-right" | "slide-out-left" | "zoom-out"`,
    default:
      "Inferred from `enterAnimationType` / Global `defaultExitAnimationType`",
    description: "Specific exit animation. If not given, it is inferred."
  },
  {
    name: "customIcon",
    type: "React.ReactNode",
    description: "Replaces default icon."
  },
  {
    name: "primaryAction",
    type: "ToastAction (`{ label: ReactNode, onClick: func }`)",
    description: "Primary action button."
  },
  {
    name: "secondaryAction",
    type: "ToastAction (`{ label: ReactNode, onClick: func }`)",
    description: "Secondary action button."
  },
  {
    name: "showCloseButton",
    type: "boolean",
    default: "Global `defaultShowCloseButton`",
    description: "Show 'X' button."
  },
  {
    name: "showProgressBar",
    type: "boolean",
    default: "Global `defaultShowProgressBar`",
    description: "Show progress bar."
  },
  {
    name: "onDismiss",
    type: "(toast: ToastProps) => void",
    description: "Callback when toast starts to discard."
  },
  {
    name: "onAutoClose",
    type: "(toast: ToastProps) => void",
    description: "Specific callback when toast closes automatically."
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the `ToastPrimitive`."
  },
  {
    name: "style",
    type: "React.CSSProperties",
    description: "Inline styles for the `ToastPrimitive`."
  },
  {
    name: "...rest",
    type: "HTMLAttributes<HTMLDivElement>",
    default: "N/A",
    description:
      "Other standard HTML props for the root `div` of the `ToastPrimitive`."
  }
]

export function SimpleToastApiReference() {
  return (
    <>
      <H2 id="api-reference">API Reference</H2>

      <H3 id="api-toaster">
        <InlineCode className="text-xl">{"<Toaster />"}</InlineCode> Component
      </H3>
      <P>Renders the toasts and allows you to set global defaults.</P>

      <ApiReferenceTable data={toasterApiProps} />

      <H3 id="api-toast">
        <InlineCode className="text-xl">toast()</InlineCode> Function
      </H3>

      <P>
        Displays a toast notification. Accepts a{" "}
        <InlineCode>ToastOptions</InlineCode> object.
      </P>

      <P>
        <InlineCode>ToastOptions</InlineCode> (inherits from{" "}
        <InlineCode>ToastProps</InlineCode> excluding{" "}
        <InlineCode>id</InlineCode> and <InlineCode>isExiting</InlineCode>):
      </P>

      <ApiReferenceTable data={toastOptionsApi} />

      <H3 id="other-exports">Other Exports</H3>

      <List variant="square" spacing="loose">
        <ListItem>
          <InlineCode>dismiss(id: string)</InlineCode>: Function to dismiss a
          toast manually using its ID (returned by{" "}
          <InlineCode>toast()</InlineCode>).
        </ListItem>
        <ListItem>
          <InlineCode>useToast()</InlineCode>: Hook that returns the current
          state (
          <InlineCode>{"{ toasts: ToastProps[], toast, dismiss }"}</InlineCode>
          ). Useful for advanced cases.
        </ListItem>
        <ListItem>
          <InlineCode>ToastPrimitive</InlineCode>: The React component that
          renders the UI of a single toast. You can import it if you need even
          more granular control.
        </ListItem>
        <ListItem>
          Types: <InlineCode>ToastType</InlineCode>,{" "}
          <InlineCode>ToastPosition</InlineCode>,{" "}
          <InlineCode>ToastEnterAnimationType</InlineCode>,{" "}
          <InlineCode>ToastExitAnimationType</InlineCode>,{" "}
          <InlineCode>ToastProps</InlineCode>,{" "}
          <InlineCode>ToasterProps</InlineCode>,{" "}
          <InlineCode>ToastOptions</InlineCode>,{" "}
          <InlineCode>ToastAction</InlineCode>.
        </ListItem>
      </List>
    </>
  )
}
