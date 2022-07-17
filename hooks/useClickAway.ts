import { MutableRefObject, useEffect } from "react"

const useClickAway = <T extends HTMLElement | null>(
  callback: (...args: any[]) => void,
  ref: MutableRefObject<T>
) => {
  useEffect(() => {
    function handleClickOutside(event: DocumentEventMap["mousedown"]) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
}

export default useClickAway
