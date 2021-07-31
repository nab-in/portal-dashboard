import { useState } from "react"
import Link from "next/link"
import Modal from "../modal/Modal"
import styles from "./user.module.sass"
import Action from "../actions/Action"

const User = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState("")
  const [roles, setRoles] = useState([
    {
      id: 15,
      name: "Admin",
    },
    {
      id: 1,
      name: "Super User",
    },
  ])
  const addRole = () => {
    setOpen(false)
  }
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
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            title={`Add role to ${user.firstname}`}
            role={role}
            setRole={setRole}
            setOpen={setOpen}
            action={addRole}
            btnText="Add"
            roles={roles}
          />
        </Modal>
      )}
    </article>
  )
}

export default User
