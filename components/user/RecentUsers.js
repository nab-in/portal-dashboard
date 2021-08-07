import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Cookies from "js-cookie"
import { API } from "../api"
import styles from "./recent.module.sass"
import RecentUser from "./RecentUser"
import CardLoader from "../loaders/cardLoader"
import { useAuthState } from "../../context/auth"

const RecentUsers = ({ size }) => {
  let [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthState()
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    if (user?.identity?.name == "admin") {
      axios
        .get(
          `${API}/users?pageSize=${size}&fields=id,dp,firstname,lastname,username`,
          config
        )
        .then((res) => {
          setUsers(res.data.users)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
    if (user?.identity?.name == "company") {
      axios
        .get(`${API}/companies/${user?.identity?.id}?fields=users`, config)
        .then((res) => {
          setUsers(res.data.users)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.response)
          setError(err?.response?.data?.message)
          setLoading(false)
        })
    }
  }, [])
  return (
    <>
      {users.length > 0 && (
        <section className={styles.recent}>
          {user?.identity?.name == "company" && <h2>Members</h2>}
          {user?.identity?.name == "admin" && <h2>Newly Joined Users</h2>}
          {loading ? (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          ) : (
            <>
              {users.map((userData) => (
                <RecentUser userData={userData} key={userData.id} />
              ))}
            </>
          )}
          <div className={styles.more__link}>
            <Link href="/profiles">More Users</Link>
          </div>
        </section>
      )}
    </>
  )
}

export default RecentUsers
