import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import Login from "../components/login/Login"
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
  console.log("====================================")
  console.log(user)
  console.log("====================================")
  return (
    <>
      {!isAuthenticated ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <div className={styles.select}>
            <section>
              <div className={styles.dp}>
                <img src="/assets/images/dp.jpeg" alt="" />
              </div>
              <p>Welcome {user?.username}</p>
              <h1>Please select dashboard to view</h1>
              <h2>Companies</h2>
              <div className={styles.showcase}>
                <div className={`card ${styles.card}`} onClick={select}>
                  <div className={styles.company}>
                    <div className={styles.logo}>
                      <img src={`/assets/companies/logo1.png`} loading="lazy" />
                    </div>
                  </div>
                  <div className={styles.name}>Company</div>
                  <div className={styles.details}>Select</div>
                </div>
                <div className={`card ${styles.card}`} onClick={select}>
                  <div className={styles.company}>
                    <div className={styles.logo}>
                      <img src={`/assets/companies/logo1.png`} loading="lazy" />
                    </div>
                  </div>
                  <div className={styles.name}>Company</div>
                  <div className={styles.details}>Select</div>
                </div>
              </div>
              <h2>Admin?</h2>
              <div className={styles.showcase}>
                <div className={`card ${styles.card}`} onClick={select}>
                  <div className={styles.company}>
                    <div className={styles.name}>Super User</div>
                  </div>
                  <div className={styles.details}>Select</div>
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
