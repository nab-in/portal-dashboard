import styles from "./user.module.sass"

const ProfileLoader = () => {
  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <p>
          <span className="loader" />
        </p>
      </div>
      <div className={styles.dp}>
        <div>
          <span className="loader" />
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className="loader" />
        </div>
        <p>
          <span className="loader" />
        </p>
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className="loader" />
        </div>
        <p>
          <span className="loader" />
        </p>
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className="loader" />
        </div>
        <p>
          <span className="loader" />
        </p>
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className="loader" />
        </div>
        <p>
          <span className="loader" />
        </p>
      </div>
    </div>
  )
}

export default ProfileLoader
