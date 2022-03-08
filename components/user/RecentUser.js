import Link from "next/link"
import styles from "./recent.module.sass"

const RecentUser = ({ userData }) => {
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.dp}>
        <img src={userData.dp} alt={`${userData.firstname} dp`} />
      </div>
      <div className={styles.name}>
        <Link href={`/profiles/${userData.id}`}>
          <a>
            {userData.firstname} {userData.lastname}
          </a>
        </Link>
      </div>
    </article>
  )
}

export default RecentUser
