import React, { useEffect, useState } from "react"
import useReactRouter from "use-react-router"

export function useHash() {
  const [hash, setHash] = useState("")

  useEffect(() => {
    setHash(window.location.hash)
  }, [])

  const validHash = hash !== ""

  return { hash, setHash, validHash }
}

export default function HashUpdater(props) {
  const { setHash } = props
  const { location } = useReactRouter()
  useEffect(() => setHash(location.hash), [location, setHash])
  return <></>
}
