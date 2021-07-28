import { useState } from "react"
import styles from "./modal.module.sass"

const Modal = ({ children }) => {
  const [close, setClose] = useState(false)

  return (
    <div
      className={close ? `${styles.modal} ${styles.close}` : `${styles.modal}`}
    >
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <button className={styles.close} onClick={() => setClose(true)}>
          Close
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
