import { useState } from "react"
import Link from "next/link"
import Modal from "../modal/Modal"
import styles from "./user.module.sass"
import Action from "../actions/Action"
import { useAuthState } from "../../context/auth"

const User = ({ userData }) => {
  const [open, setOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [role, setRole] = useState("")
  const { roles, user } = useAuthState()

  const addRole = () => {
    setOpen(false)
  }
  const remove = () => {
    setCompanyOpen(false)
  }
  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.dp}>
        <img src={userData?.dp} alt={`${userData?.username} dp`} />
      </div>
      <div className={styles.name}>
        <Link href={`/profiles/${userData?.id}`}>
          <a>
            {userData?.firstname} {userData?.lastname}
          </a>
        </Link>
      </div>
      <div className={styles.role}>
        {user?.role == "admin" &&
          user?.identity?.name == "admin" &&
          user?.id != userData.id && (
            <button onClick={() => setOpen(true)}>Add Role</button>
          )}
        {user?.role == "admin" &&
          user?.identity?.name == "admin" &&
          user?.id == userData.id && <p>You</p>}
        {user?.identity?.name == "company" && user?.id != userData.id && (
          <button onClick={() => setCompanyOpen(true)}>Remove member</button>
        )}
        {user?.identity?.name == "company" && user?.id == userData.id && (
          <p>You</p>
        )}
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            title={`Add role to ${userData?.firstname}`}
            role={role}
            setRole={setRole}
            setOpen={setOpen}
            action={addRole}
            btnText="Add"
            roles={roles}
          />
        </Modal>
      )}
      {companyOpen && (
        <Modal setOpen={setCompanyOpen}>
          <Action
            title={`Are you sure you want to remove ${userData?.firstname} from your company?`}
            setOpen={setCompanyOpen}
            action={remove}
            btnText="Remove"
          />
        </Modal>
      )}
    </article>
  )
}

export default User
