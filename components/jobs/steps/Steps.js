import styles from "./steps.module.sass"

const Steps = ({ id, selected, setSelected }) => {
  const select = (value) => {
    setSelected(value)
  }

  return (
    <div className={styles.steps}>
      <ul>
        <li>
          <button
            className={
              selected == null || selected == "basic" ? `${styles.done}` : ""
            }
            onClick={() => select("basic")}
          >
            <span className={styles.icon}>1</span>
            <span className={styles.text}>Basic Informations</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => select("desc")}
            disabled={id ? false : true}
            className={selected == "desc" ? `${styles.done}` : ""}
          >
            <span className={styles.icon}>2</span>
            <span className={styles.text}>Job Description</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => select("att")}
            disabled={id ? false : true}
            className={selected == "att" ? `${styles.done}` : ""}
          >
            <span className={styles.icon}>3</span>
            <span className={styles.text}>Attachment</span>
          </button>
        </li>
        <li className={styles.mobile_step}>
          <button
            onClick={() => select("cat")}
            disabled={id ? false : true}
            className={selected == "cat" ? `${styles.done}` : ""}
          >
            <span className={styles.icon}>4</span>
            <span className={styles.text}>Categories</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Steps
