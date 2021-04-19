import React from "react"
import styles from "./template.module.sass"

const SubContents = ({ children }) => {
  return <div className={`${styles.sub__content} sub__content`}>{children}</div>
}

export default SubContents
