import { useEffect, useState, useRef } from "react"
import { BiPlus, BiMinus } from "react-icons/bi"
import styles from "./accordion.module.sass"

const Accordion = ({ title, categories, children }) => {
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState("0px")

  const content = useRef(null)

  const toggleAccordion = () => {
    setActive(active ? false : true)
    setHeight(
      active ? "0px" : `calc( ${content.current.scrollHeight}px + 1rem )`
    )
  }
  useEffect(() => {
    let isMounted
    if (isMounted)
      if (categories)
        setHeight(
          !active ? "0px" : `calc( ${content.current.scrollHeight}px + 1rem )`
        )
    return () => {
      isMounted = false
    }
  }, [categories, content])

  return (
    <div className={styles.accordion}>
      <p onClick={() => toggleAccordion()}>
        {title}{" "}
        <span>
          {active ? <BiMinus className="icon" /> : <BiPlus className="icon" />}
        </span>
      </p>
      <div
        ref={content}
        style={{
          minHeight: `100%`,
          maxHeight: height,
        }}
        className={styles.accordion__content}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordion
