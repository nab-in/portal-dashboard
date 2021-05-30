import styles from "./profile.module.sass"

const ProfileLoader = () => {
  return (
    <div className={styles.card}>
      <h3>
        <span className="loader" />
      </h3>
      <p>
        <span className="loader" />
      </p>
    </div>
  )
}

export default ProfileLoader
