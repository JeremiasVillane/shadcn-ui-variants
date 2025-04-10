import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="flex h-16 grow-0 items-center border-t">
      <div className="container flex items-center justify-between gap-4">
        <p className="flex gap-1 text-left text-sm leading-loose text-muted-foreground">
          Built{" "}
          <span className="hidden gap-1 md:flex">
            with
            <Link
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Next.js
            </Link>
            and
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
          </span>
          by
          <Link
            href="https://github.com/JeremiasVillane"
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            Jeremias Villane
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
