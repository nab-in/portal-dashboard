import { useEffect, useState } from "react"
import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../context/auth"
import { API } from "../components/api"
import axios from "axios"
import Cookies from "js-cookie"

const select_identity = () => {
  let { user, isAuthenticated, loading } = useAuthState()
  let [companies, setCompanies] = useState([])
  let [companyLoading, setLoading] = useState(false)
  let dispatch = useAuthDispatch()
  let router = useRouter()
  const select = (id, name) => {
    dispatch({
      type: "SELECT",
      payload: {
        id,
        name,
      },
    })
    if (id && name) router.push("/")
  }
  useEffect(() => {
    if (!isAuthenticated && !loading) router.push("/login")
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .get(`${API}/me?fields=companies,userRoles`, config)
      .then((res) => {
        setLoading(false)
        setCompanies(res.data.companies)
        console.log(res.data)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div className={styles.select}>
            <section>
              <div className={styles.dp}>
                <img src={user?.dp} alt="" />
              </div>
              <p>Welcome {user?.username}</p>
              <h1>Please select dashboard to view</h1>
              {companies.length > 0 && (
                <>
                  <h2>Your Companies</h2>
                  {companyLoading}
                  <div className={styles.showcase}>
                    {companies.map(({ id, name }) => (
                      <div
                        key={id}
                        className={`card ${styles.card}`}
                        onClick={() => select(id, "company")}
                      >
                        <div className={styles.company}>
                          <div className={styles.logo}>
                            <img
                              src={`/assets/companies/logo1.png`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.details}>
                          <button>Select</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

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
