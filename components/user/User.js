import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { API } from "../api"
import { config } from "../config"
import Modal from "../modal/Modal"
import styles from "./user.module.sass"
import Action from "../actions/Action"
import { useAuthState } from "../../context/auth"

const User = ({ userData }) => {
  const [open, setOpen] = useState(false)
  const [enableOpen, setEnableOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [role, setRole] = useState("")
  const { roles, user } = useAuthState()
  const [userRole, setUserRole] = useState("")
  const [userpassword, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const updateUserRole = () => {
    let superuser = userData?.userRoles.find((el) => el.name === "SUPER USER")
    let admin = userData?.userRoles.find((el) => el.name === "ADMIN")
    if (superuser?.name === "SUPER USER") {
      setUserRole("Super User")
      return
    }
    if (admin?.name === "ADMIN") {
      setUserRole("Admin")
      return
    }
  }

  const toggleEnabled = () => {
    if (
      user?.identity?.value === "SUPER USER" ||
      user?.identity?.value === "ADMIN"
    ) {
      setLoading(true)
      axios
        .put(
          `${API}/users/${userData.id}`,
          {
            enabled: !userData?.enabled,
            userpassword,
          },
          config
        )
        .then((res) => {
          console.log(res?.data)
          setLoading(false)
          setEnableOpen(false)
        })
        .catch((err) => {
          console.log(err?.response)
          setLoading(false)
          setEnableOpen(false)
        })
    }
  }

  const addRole = () => {
    if (user?.identity?.value === "SUPER USER") {
      setLoading(true)
      axios
        .put(
          `${API}/users/${userData.id}`,
          { userRoles: [{ id: role }], userpassword },
          config
        )
        .then((res) => {
          console.log(res?.data)
          setLoading(false)
          setOpen(false)
        })
        .catch((err) => {
          console.log(err?.response)
          setLoading(false)
          setOpen(false)
        })
    }
  }
  const remove = () => {
    setCompanyOpen(false)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) updateUserRole()
    return () => {
      isMounted = false
    }
  }, [userData])

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
        {user?.role == "admin" &&
          (user?.identity?.value === "ADMIN" ||
            user?.identity?.value === "SUPER USER") && (
            <div className={styles.user__role}>
              {userData?.userRoles?.length > 0 && <>{userRole}</>}
            </div>
          )}
      </div>
      <div className={styles.role}>
        {user?.identity?.name == "admin" &&
          user?.id != userData.id &&
          !(userRole === "Admin" || userRole === "Super user") && (
            <button
              onClick={() => setEnableOpen(true)}
              className="btn btn-secondary"
            >
              {userData?.enabled ? `Disable` : `Enable`}
            </button>
          )}
        {user?.identity?.value == "SUPER USER" && user?.id != userData.id && (
          <button onClick={() => setOpen(true)}>Add Role</button>
        )}
        {/* {user?.identity?.name == "company" && user?.id != userData?.id && (
          <button onClick={() => setCompanyOpen(true)}>Remove member</button>
        )} */}
        {user?.id == userData.id && <p>You</p>}
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            title={`Add role to ${userData?.firstname}`}
            role={role}
            setRole={setRole}
            setPassword={setPassword}
            setOpen={setOpen}
            action={addRole}
            btnText="Add"
            roles={roles}
            loading={loading}
          />
        </Modal>
      )}
      {enableOpen && (
        <Modal setOpen={setEnableOpen}>
          <Action
            title={
              userData?.enabled
                ? `Disable ${userData?.firstname}`
                : `Enable ${userData?.firstname}`
            }
            setPassword={setPassword}
            setOpen={setEnableOpen}
            action={toggleEnabled}
            btnText={userData?.enabled ? "Disable" : "Enable"}
            loading={loading}
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
            loading={loading}
          />
        </Modal>
      )}
    </article>
  )
}

export default User
