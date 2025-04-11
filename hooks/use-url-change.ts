import * as React from "react"

export function useUrlChange() {
  const [url, setUrl] = React.useState("")
  const lastUrlRef = React.useRef("")

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const currentUrl = window.location.href
    lastUrlRef.current = currentUrl
    setUrl(currentUrl)

    const checkForUrlChange = () => {
      const newUrl = window.location.href
      if (newUrl !== lastUrlRef.current) {
        lastUrlRef.current = newUrl
        setUrl(newUrl)
      }
    }

    // Set up polling to check for URL changes
    const intervalId = setInterval(checkForUrlChange, 100)

    // Also check on popstate events for back/forward navigation
    const handlePopState = () => {
      checkForUrlChange()
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return url
}
