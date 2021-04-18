import React, { useState, useEffect } from "react"
import Header from "../header/Header"
import Aside from "../aside/Aside"
import styles from "./layout.module.sass"

const Layout = ({ children }) => {
  const [navOpen, setnavOpen] = useState(true)
  const [isMobile, setMobile] = useState(false)

  const handleNav = () => {
    setnavOpen(!navOpen)
  }
  useEffect(() => {
    if (window.screen.width <= 768) {
      setMobile(true)
    }
  }, [setMobile])
  return (
    <div className="dashboard">
      <Header navOpen={navOpen} />
      <div className={styles.layout}>
        <Aside navOpen={navOpen} handleNav={handleNav} />
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
