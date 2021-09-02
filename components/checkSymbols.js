import { useEffect } from "react"

let format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/

const checkSymbols = (name, setError) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      let chars = format.exec(name)
      if (format.test(name))
        setError({
          msg: "Your username contains reserved character(s)",
          type: "danger",
        })
      if (chars)
        setError({
          msg: `${chars[0]} is reserved character`,
          type: "danger",
        })
    }, 50)
    return () => clearTimeout(timeout)
  }, [name])
  return null
}

export const checkChange = (name, setError) => {
  let chars = format.exec(name)
  if (!chars) setError(null)
  console.log(chars, name)
  return null
}

export default checkSymbols
