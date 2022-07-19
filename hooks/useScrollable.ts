import { MutableRefObject, useCallback, useEffect, useRef } from "react"

const useScrollable = (ref?: MutableRefObject<HTMLElement>) => {
  const bodyRef = useRef<HTMLHtmlElement | null>(null)
  useEffect(() => {
    bodyRef.current = document.querySelector("html")
  }, [])

  const setScrollable = useCallback((scrollable: boolean) => {
    if (bodyRef.current) {
      bodyRef.current.style.overflow = scrollable ? "initial" : "hidden"
    }
  }, [])

  return setScrollable
}

export default useScrollable
