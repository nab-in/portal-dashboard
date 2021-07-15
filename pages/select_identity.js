import { useEffect } from "react"
import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../context/auth"

const select_identity = () => {
  let { user, isAuthenticated } = useAuthState()
  let dispatch = useAuthDispatch()
  let router = useRouter()
  const select = () => {
    dispatch({
      type: "SELECT",
      payload: "Company",
    })
    router.push("/")
  }
  useEffect(() => {
    if (!isAuthenticated) router.push("/login")
  }, [])
  return (
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
            <div className={`card ${styles.card}`} onClick={select}>
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
            <div className={`card ${styles.card}`} onClick={select}>
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
            <div className={`card ${styles.card}`} onClick={select}>
              <div className={styles.name}>Super User</div>
              <div className={styles.details}>
                <button>Select</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default select_identity
