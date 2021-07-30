import { useState } from "react"
import Link from "next/link"
import Modal from "../modal/Modal"
import styles from "./user.module.sass"

const User = ({ user }) => {
  const [open, setOpen] = useState(false)
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.dp}>
        <img src={user.dp} alt={`${user.username} dp`} />
      </div>
      <div className={styles.name}>
        <Link href={`/profiles/${user.id}`}>
          <a>
            {user.firstname} {user.lastname}
          </a>
        </Link>
      </div>
      <div className={styles.role}>
        <button onClick={() => setOpen(true)}>Add Role</button>
      </div>
      {open && <Modal setOpen={setOpen}></Modal>}
    </article>
  )
}

export default User
