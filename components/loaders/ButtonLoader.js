import { RiLoader5Line } from "react-icons/ri"
import styles from "./btn.module.sass"

const ButtonLoader = ({ bg }) => {
  return (
    <span
      className={
        bg === "light"
          ? `${styles.spinner} ${styles.light}`
          : `${styles.spinner}`
      }
    >
      <RiLoader5Line className={styles.icon} />
    </span>
  )
}

export default ButtonLoader
