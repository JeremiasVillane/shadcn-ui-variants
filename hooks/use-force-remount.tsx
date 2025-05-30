import * as React from "react"

export function useForceRemount() {
  const [remountKey, setRemountKey] = React.useState(`remount-${Math.random()}`)

  const forceRemount = React.useCallback(() => {
    setRemountKey(`remount-${Math.random()}`)
  }, [setRemountKey])

  return { remountKey, forceRemount }
}
