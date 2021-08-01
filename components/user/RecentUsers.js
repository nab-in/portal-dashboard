import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Cookies from "js-cookie"
import { API } from "../api"
import styles from "./recent.module.sass"
import RecentUser from "./RecentUser"
import CardLoader from "../loaders/cardLoader"

const RecentUsers = ({ size }) => {
  let [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
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
  }, [])
  return (
    <>
      {users.length > 0 && (
        <section className={styles.recent}>
          <h2>Newly Joined Users</h2>
          {loading ? (
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          ) : (
            <>
              {users.map((user) => (
                <RecentUser user={user} key={user.id} />
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
