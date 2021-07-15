import { useEffect, useState } from "react"
import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../context/auth"

const select_identity = () => {
  let { user, isAuthenticated, loading } = useAuthState()
  const [selected, setSelected] = useState("")
  let dispatch = useAuthDispatch()
  let router = useRouter()
  const select = (id, name) => {
    setSelected({
      id,
      name,
    })
    dispatch({
      type: "SELECT",
      payload: selected,
    })
    console.log(selected)
    if (selected) router.push("/")
  }
  useEffect(() => {
    if (!isAuthenticated && !loading) router.push("/login")
  }, [])
  console.log(user)
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div className={styles.select}>
            <section>
              <div className={styles.dp}>
                <img src="/assets/images/dp.jpeg" alt="" />
              </div>
              <p>Welcome {user?.username}</p>
              <h1>Please select dashboard to view</h1>
              <h2>Your Companies</h2>
              <div className={styles.showcase}>
                <div
                  className={`card ${styles.card}`}
                  onClick={() => select(1, "company")}
                >
                  <div className={styles.company}>
                    <div className={styles.logo}>
                      <img src={`/assets/companies/logo1.png`} loading="lazy" />
                    </div>
                  </div>
                  <div className={styles.name}>Company</div>
                  <div className={styles.details}>
                    <button>Select</button>
                  </div>
                </div>
                <div
                  className={`card ${styles.card}`}
                  onClick={() => select(1, "company")}
                >
                  <div className={styles.company}>
                    <div className={styles.logo}>
                      <img src={`/assets/companies/logo1.png`} loading="lazy" />
                    </div>
                  </div>
                  <div className={styles.name}>Company</div>
                  <div className={styles.details}>
                    <button>Select</button>
                  </div>
                </div>
              </div>
              <h2>An Admin?</h2>
              <div className={styles.showcase}>
                <div
                  className={`card ${styles.card}`}
                  onClick={() => select(1, "admin")}
                >
                  <div className={styles.name}>Super User</div>
                  <div className={styles.details}>
                    <button>Select</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  )
}

export default select_identity
