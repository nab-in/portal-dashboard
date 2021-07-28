import Link from "next/link"
import styles from "./application.module.sass"
const Application = ({ app }) => {
  console.log(app)
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.user}>
        <div className={styles.dp}>
          <img src={app.user.dp} />
        </div>
        <div>
          <Link href={`/applications/${app.id}`}>
            <a>
              {app.user.firstname} {app.user.lastname}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.job}>
        <Link href={`/applications/${app.id}`}>{app.name}</Link>
      </div>
      <div className={styles.actions}>
        <button>Call for the Interview</button>
        <button>Reject</button>
        <button className={styles.accept}>Accept</button>
      </div>
    </article>
  )
}

export default Application
