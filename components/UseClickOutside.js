import React, { useEffect, useRef } from "react"

// detect outside click hook
let UseClickOutside = (handler) => {
  let node = useRef()
  useEffect(() => {
    let handle = (e) => {
      if (!node?.current?.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
    }
  })
  return node
}

export default UseClickOutside
