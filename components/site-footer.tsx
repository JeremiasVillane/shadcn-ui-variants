import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui
          </Link>{" "}
          by{" "}
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
