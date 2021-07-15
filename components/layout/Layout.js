import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAuthState, useAuthDispatch } from "../../context/auth"
import Header from "../header/Header"
import Aside from "../aside/Aside"
import styles from "./layout.module.sass"
import axios from "axios"
import { API } from "../api"

const Layout = ({ loading, children }) => {
  const [navOpen, setnavOpen] = useState(true)
  const [isMobile, setMobile] = useState(false)
  const { isAuthenticated, user } = useAuthState()
  const dispatch = useAuthDispatch()
  const router = useRouter()
  const handleNav = () => {
    setnavOpen(!navOpen)
  }
  useEffect(() => {
    if (!loading && !isAuthenticated) router.push("/login")

    if (!loading && isAuthenticated && !user?.identity)
      router.push("/select_identity")
  }, [])

  useEffect(() => {
    if (user?.identity && user?.identity.name == "company") {
      axios
        .get(`${API}/companies/${user.identity.id}`)
        .then((res) => {
          // console.log(res)
          dispatch({
            type: "COMPANY",
            payload: res.data,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    if (window.screen.width <= 768) {
      setMobile(true)
    }
  }, [setMobile])
  return (
    <div className="dashboard">
      <Header navOpen={navOpen} />
      <div className={styles.layout}>
        <Aside
          navOpen={navOpen}
          handleNav={handleNav}
          isMobile={isMobile}
          setnavOpen={setnavOpen}
        />
        {isMobile && (
          <div
            className={!navOpen ? `${styles.backdrop}` : ""}
            onClick={() => setnavOpen(true)}
          ></div>
        )}
        <main
          className={
            navOpen ? `${styles.main}` : `${styles.main} ${styles.full__width}`
          }
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
