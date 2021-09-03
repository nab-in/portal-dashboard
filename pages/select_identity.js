import { useEffect, useState } from "react"
import Link from "next/link"
import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../context/auth"
import { API } from "../components/api"
import { config } from "../components/config"
import axios from "axios"

const select_identity = () => {
  let { user, isAuthenticated, loading } = useAuthState()
  let [companies, setCompanies] = useState([])
  let [companyLoading, setLoading] = useState(false)
  let [roles, setRoles] = useState([])
  let dispatch = useAuthDispatch()
  let router = useRouter()
  const [errors, setErrors] = useState({})

  let role = router.query?.role
  let company = router.query?.company

  const select = (id, name, value) => {
    dispatch({
      type: "SELECT",
      payload: {
        id,
        name,
        value,
      },
    })
    if (id && name === "company") router.push("/")
    if (id && name === "admin" && value) router.push("/")
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      if (!isAuthenticated && !loading && !user) {
        router.push("/login")
      }
    return () => {
      isMounted = false
    }
  }, [loading])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setLoading(true)
      axios
        .get(`${API}/me?fields=userRoles,companies`, config)
        .then((res) => {
          setLoading(false)
          setCompanies(res.data?.companies)
          setRoles(res.data?.userRoles)
          let roleData = res.data?.userRoles.find((el) => el.id === role)
          let companyData = res.data?.companies.find((el) => el.id === company)
          if (roleData) {
            dispatch({
              type: "SELECT",
              payload: {
                id: roleData.id,
                name: "admin",
                value: roleData.name,
              },
            })
            if (roleData.id && roleData.name) router.push("/")
          }
          if (companyData) {
            dispatch({
              type: "SELECT",
              payload: {
                id: companyData.id,
                name: "company",
                value: "",
              },
            })
            if (companyData.id && companyData.name) {
              dispatch({
                type: "COMPANY",
                payload: companyData,
              })
              router.push("/")
            }
          }
        })
        .catch((err) => {
          setLoading(false)
          if (err?.response) {
            setErrors({
              type: "danger",
              msg: err?.response?.data?.message,
            })
          } else if (err?.message == "Network Error") {
            setErrors({
              type: "danger",
              msg: "Network Error",
            })
          } else {
            setErrors({
              type: "danger",
              msg: "Internal server error, please try again",
            })
          }
        })
    }
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {isAuthenticated && user && (
            <div className={styles.select}>
              <section>
                <div className={styles.dp}>
                  <img src={user?.dp} alt="" />
                </div>
                <p>Welcome {user?.username}</p>
                <h1>Please select dashboard to view</h1>
                {companies?.length > 0 && (
                  <>
                    <h2>Your Companies</h2>
                    {companyLoading}
                    <div className={styles.showcase}>
                      {companies.map(({ id, name, logo }) => (
                        <div
                          key={id}
                          className={`card ${styles.card}`}
                          onClick={() => select(id, "company", "")}
                        >
                          <div className={styles.company}>
                            <div className={styles.logo}>
                              <img src={logo} loading="lazy" />
                            </div>
                            <div className={styles.name}>{name}</div>
                          </div>
                          <div className={styles.details}>
                            <button>Select</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {roles?.length > 0 && (
                  <>
                    <h2>An Admin?</h2>
                    <div className={styles.showcase}>
                      {roles.map(({ id, name }) => (
                        <div
                          className={`card ${styles.card}`}
                          onClick={() => select(id, "admin", name)}
                          key={id}
                        >
                          <div className={styles.name}>{name}</div>
                          <div className={styles.details}>
                            <button>Select</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {roles?.length === 0 && companies?.length === 0 && (
                  <>
                    <h2>We could't find any company which you belong</h2>
                    <p>
                      <a href="http://localhost:3000">Visit home</a> OR &nbsp;
                      <Link href="/login">Login with Different account</Link>
                    </p>
                  </>
                )}
              </section>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default select_identity
