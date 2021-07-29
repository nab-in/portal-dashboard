import { useState } from "react"
import styles from "./modal.module.sass"

const Modal = ({ setOpen, children }) => {
  return (
    <div
      className={styles.modal}
    >
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <button className={styles.close} onClick={() => setOpen(false)}>
          Close
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
