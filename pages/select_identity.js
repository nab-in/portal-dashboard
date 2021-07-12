import styles from "../styles/select.module.sass"
import { useAuthState } from "../context/auth"

const select_identity = () => {
  let { user } = useAuthState()
  return (
    <div className={styles.select}>
      <section>
        <p>Welcome {user?.username}</p>
        <h1>Please select dashboard to view</h1>
        <h2>Companies</h2>
        <div className={styles.showcase}>
          <div className={`card ${styles.card}`}></div>
        </div>
      </section>
    </div>
  )
}

export default select_identity
