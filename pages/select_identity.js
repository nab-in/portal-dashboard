import { useEffect, useState } from "react"
import Link from "next/link"
import { GrRefresh } from "react-icons/gr"
import styles from "../styles/select.module.sass"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../context/auth"
import { API } from "../components/api"
import { config } from "../components/config"
import axios from "axios"

const Loader = () => (
  <div className={styles.select}>
    <section>
      <div
        style={{
          height: "70px",
          width: "100%",
          background: "rgba(226, 232, 236, .7)",
        }}
      >
        <span className="loader" />
      </div>
      <h1
        style={{
          margin: "1rem auto",
          width: "60%",
          background: "rgba(226, 232, 236, .7)",
          height: "20px",
        }}
      >
        <span className="loader" />
      </h1>
      <div
        style={{
          padding: ".5rem 1rem",
          display: "flex",
          width: "100%",
          margin: "1rem 0",
          alignItems: "center",
        }}
        className="card"
      >
        <div
          style={{
            height: "40px",
            width: "40px",
            background: "rgba(226, 232, 236, .7)",
          }}
        >
          <span className="loader" />
        </div>
        <p
          style={{
            width: "200px",
            margin: 0,
            marginLeft: "1.5rem",
            background: "rgba(226, 232, 236, .7)",
            height: "18px",
          }}
        >
          <span className="loader" />
        </p>
      </div>
      <div
        style={{
          padding: ".5rem 1rem",
          display: "flex",
          width: "100%",
          margin: "1rem 0",
          alignItems: "center",
        }}
        className="card"
      >
        <div
          style={{
            height: "40px",
            width: "40px",
            background: "rgba(226, 232, 236, .7)",
          }}
        >
          <span className="loader" />
        </div>
        <p
          style={{
            width: "200px",
            margin: 0,
            marginLeft: "1.5rem",
            background: "rgba(226, 232, 236, .7)",
            height: "18px",
          }}
        >
          <span className="loader" />
        </p>
      </div>
    </section>
  </div>
)

const CardLoader = () => (
  <div
    style={{
      padding: ".5rem 1rem",
      display: "flex",
      width: "100%",
      margin: "1rem 0",
      alignItems: "center",
    }}
    className="card"
  >
    <div
      style={{
        height: "40px",
        width: "40px",
        background: "rgba(226, 232, 236, .7)",
      }}
    >
      <span className="loader" />
    </div>
    <p
      style={{
        width: "200px",
        margin: 0,
        marginLeft: "1.5rem",
        background: "rgba(226, 232, 236, .7)",
        height: "18px",
      }}
    >
      <span className="loader" />
    </p>
  </div>
)

const select_identity = () => {
  let { user, isAuthenticated, loading } = useAuthState()
  let [companies, setCompanies] = useState([])
  let [identityLoading, setLoading] = useState(false)
  let [roles, setRoles] = useState([])
  let dispatch = useAuthDispatch()
  let router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

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
      refresh()
    }
    return () => {
      isMounted = false
    }
  }, [])

  const refresh = () => {
    setLoading(true)
    axios
      .get(`${API}/me?fields=userRoles,companies`, config)
      .then((res) => {
        setLoading(false)
        setCompanies(res.data?.companies)
        setRoles(res.data?.userRoles)
        if (
          res?.data?.companies?.length === 0 &&
          res?.data?.userRoles?.length === 0
        )
          setMessage("We could't find any company which you belong")
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
        } else if (err?.message) {
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated && user && (
            <div className={styles.select}>
              <section>
                <div className={styles.dp}>
                  <img src={user?.dp} alt="" />
                </div>
                <p>Welcome {user?.username}</p>
                {identityLoading ? (
                  <>
                    <div
                      style={{
                        padding: ".5rem 1rem",
                        display: "flex",
                        width: "100%",
                        margin: "1rem 0",
                        alignItems: "center",
                      }}
                      className="card"
                    >
                      <div
                        style={{
                          height: "40px",
                          width: "40px",
                          background: "rgba(226, 232, 236, .7)",
                        }}
                      >
                        <span className="loader" />
                      </div>
                      <p
                        style={{
                          width: "200px",
                          margin: 0,
                          marginLeft: "1.5rem",
                          background: "rgba(226, 232, 236, .7)",
                          height: "18px",
                        }}
                      >
                        <span className="loader" />
                      </p>
                    </div>
                    <div
                      style={{
                        padding: ".5rem 1rem",
                        display: "flex",
                        width: "100%",
                        margin: "1rem 0",
                        alignItems: "center",
                      }}
                      className="card"
                    >
                      <div
                        style={{
                          height: "40px",
                          width: "40px",
                          background: "rgba(226, 232, 236, .7)",
                        }}
                      >
                        <span className="loader" />
                      </div>
                      <p
                        style={{
                          width: "200px",
                          margin: 0,
                          marginLeft: "1.5rem",
                          background: "rgba(226, 232, 236, .7)",
                          height: "18px",
                        }}
                      >
                        <span className="loader" />
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {companies?.length > 0 || roles?.length > 0 ? (
                      <>
                        <h1>Please select dashboard to view</h1>
                        {companies?.length > 0 && (
                          <>
                            <h2>Your Companies</h2>
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
                      </>
                    ) : (
                      <>
                        {errors?.msg && (
                          <p className={`${styles.alert} alerts danger`}>
                            {errors.msg}
                          </p>
                        )}
                        {message && <h2>{message}</h2>}

                        <div
                          className={styles.refresh}
                          style={{
                            textAlign: "center",
                            margin: "1rem",
                          }}
                        >
                          <button
                            onClick={refresh}
                            style={{
                              fontSize: "1.5rem",
                            }}
                          >
                            <GrRefresh className="icon" />
                          </button>
                        </div>

                        <p>
                          <a href="http://localhost:3000">Visit home</a> OR
                          &nbsp;
                          <Link href="/login">
                            Login with Different account
                          </Link>
                        </p>
                      </>
                    )}
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
