import React from "react"
import styles from "./aside.module.sass"

const Aside = ({ navOpen, handleNav }) => {
  return (
    <aside className={styles.aside}>
      <div onClick={handleNav}>Click me</div>
    </aside>
  )
}

export default Aside
