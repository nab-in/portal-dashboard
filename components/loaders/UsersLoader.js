import styles from "./users.module.sass"

const ProfileLoader = () => {
  return (
    <div className={styles.card}>
      <div className={styles.dp}>
        <span className="loader" />
      </div>
      <p>
        <span className="loader" />
      </p>
      <p>
        <span className="loader" />
      </p>
    </div>
  )
}

export default ProfileLoader
