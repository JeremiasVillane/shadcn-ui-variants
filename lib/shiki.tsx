import { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import {
  transformerNotationDiff,
  transformerNotationHighlight
} from "@shikijs/transformers"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import {
  BundledLanguage,
  BundledTheme,
  codeToHast,
  CodeToHastOptions
} from "shiki/bundle/web"

import { cn } from "./utils"

export async function highlight(
  code: string,
  options: CodeToHastOptions<BundledLanguage, BundledTheme>
) {
  const out = await codeToHast(code, options)

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (props) => (
        <pre
          {...props}
          className={cn(
            props.className,
            "h-full overflow-auto px-3 py-4 text-sm leading-none dark:!bg-foreground/5"
          )}
          style={{ ...props.style, backgroundColor: undefined }}
        />
      )
    }
  })
}

export async function getHighlightedCodeNodes(code: string) {
  return await highlight(code, {
    lang: "tsx",
    themes: {
      light: "vitesse-dark",
      dark: "vitesse-dark"
    },
    transformers: [transformerNotationDiff(), transformerNotationHighlight()]
  })
}
