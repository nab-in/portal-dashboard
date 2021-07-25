import styles from "./steps.module.sass"

const Steps = ({ id }) => {
  return (
    <div className={styles.steps}>
      <ul>
        <li>
          <button className={styles.done}>
            <span className={styles.icon}>1</span>
            <span className={styles.text}>Basic Informations</span>
          </button>
        </li>
        <li>
          <button>
            <span className={styles.icon}>2</span>
            <span className={styles.text}>Job Description</span>
          </button>
        </li>
        <li>
          <button>
            <span className={styles.icon}>3</span>
            <span className={styles.text}>Attachment</span>
          </button>
        </li>
        {/* <li>
          <button>
            <span className={styles.icon}></span>
            <span className={styles.text}>Categories</span>
          </button>
        </li> */}
      </ul>
    </div>
  )
}

export default Steps
