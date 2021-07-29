import { useState } from "react"
import Link from "next/link"
import styles from "./application.module.sass"
import Modal from "../modal/Modal"

const Application = ({ app }) => {
  const [interview, setInterview] = useState(false)
  const [reject, setReject] = useState(false)
  const [accept, setAccept] = useState(false)

  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.user}>
        <div className={styles.dp}>
          <img src={app.user.dp} />
        </div>
        <div className={styles.name}>
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
        <button onClick={() => setInterview(true)}>
          Call for the Interview
        </button>
        <button onClick={() => setReject(true)}>Reject</button>
        <button className={styles.accept} onClick={() => setAccept(true)}>
          Accept
        </button>
      </div>
      {interview && <Modal setOpen={setInterview}>InterView</Modal>}
      {accept && <Modal setOpen={setAccept}>Accept</Modal>}
      {reject && <Modal setOpen={setReject}>Reject</Modal>}
    </article>
  )
}

export default Application
