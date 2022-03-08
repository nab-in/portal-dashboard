import styles from "./template.module.sass"

const MainContents = ({ children }) => {
  return <div className={styles.main__content}>{children}</div>
}

export default MainContents
