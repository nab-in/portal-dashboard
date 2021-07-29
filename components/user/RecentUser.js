import Link from "next/link"
import styles from "./recent.module.sass"

const RecentUser = ({ user }) => {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.dp}>
        <img src={user.dp} alt={`${user.firstname} dp`} />
      </div>
      <div className={styles.name}>
        <Link href={`/profiles/${user.id}`}>
          <a>
            {user.firstname} {user.lastname}
          </a>
        </Link>
      </div>
    </article>
  )
}

export default RecentUser
