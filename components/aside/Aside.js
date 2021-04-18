import React from "react"
import styles from "./aside.module.sass"

const Aside = ({ navOpen, handleNav }) => {
  return (
    <aside
      className={navOpen ? `${styles.aside}` : `${styles.aside} ${styles.open}`}
    >
      <div onClick={handleNav} className={styles.burger}>
        Click me
      </div>
    </aside>
  )
}

export default Aside
