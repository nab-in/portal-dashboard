import React, { useState, useEffect } from "react"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import Link from "next/link"
import { useAuthDispatch, useAuthState } from "../../context/auth"
import { useAlertsDispatch } from "../../context/alerts"
import { FaAngleDown, FaBell } from "react-icons/fa"
import styles from "./header.module.sass"
import UseClickOutside from "../UseClickOutside"

const Header = ({ navOpen }) => {
  const [open, setOpen] = useState(false)
  let [img, setImg] = useState(null)
  const [data, setData] = useState({})
  // const [notify, setNotify] = useState(false)
  // let number = 5

  const dispatch = useAuthDispatch()
  const alertsDispatch = useAlertsDispatch()

  const { user } = useAuthState()
  // check if outside is clicked
  let node = UseClickOutside(() => setOpen(false))

  const logout = () => {
    const token = Cookies.get("token")
    const config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
    axios(`${API}/logout`, config)
      .then((res) => {
        dispatch({
          type: "LOGOUT",
        })
      })
      .catch((err) => {
        if (err?.response) {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: err?.response?.data?.message,
            },
          })
        } else if (err?.message == "Network Error") {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: "Network Error",
            },
          })
        } else {
          alertsDispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: "Internal server error, please try again",
            },
          })
        }
      })
  }

  // let n

  useEffect(() => {
    if (user?.identity?.name == "company") {
      setData(user?.company)
      setImg(data?.logo)
    } else {
      setData(user)
      setImg(data?.dp)
    }
  }, [user])

  return (
    <header
      className={
        navOpen
          ? `${styles.dashboard__header}`
          : `${styles.dashboard__header} ${styles.full__width}`
      }
    >
      <div className={styles.container}>
        <div className={styles.logo__container}>
          <div className={styles.logo}>
            <img src={`/assets/images/logo.png`} alt={`logo`} />
          </div>
        </div>
        <div className={styles.right__nav}>
          {/* <div className={styles.notify} onClick={() => setNotify(true)}>
            <Link href="/notifications">
              <a>
                <FaBell className={styles.icon} />
                {0 < number && number <= 99 && <span>{number}</span>}
                {number > 99 && <span>99+</span>}
              </a>
            </Link>
          </div> */}
          <div className={styles.profile__container} ref={node}>
            <div onClick={() => setOpen(!open)} className={styles.profile}>
              <div className={styles.dp__container}>
                {img && <img src={img} alt={`logo`} />}{" "}
              </div>
              <div className={styles.name}>
                <span>{data?.name ? data.name : data?.username}</span>
                <FaAngleDown className={styles.icon} />
              </div>
            </div>
            <div
              className={
                open
                  ? `${styles.dropdown} ${styles.open}`
                  : `${styles.dropdown}`
              }
            >
              <div className={styles.profile}>
                <div className={styles.dp__container}>
                  {img && <img src={user.dp} alt={`dp`} />}
                </div>
                <div className={styles.name}>
                  {user.firstname} {user.lastname}
                </div>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <a onClick={() => setOpen(false)}>Home</a>
                    </Link>
                  </li>
                  <ul>
                    <li>
                      <Link href="/jobs">
                        <a onClick={() => setOpen(false)}>Jobs</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile">
                        <a onClick={() => setOpen(false)}>Profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/select_identity">
                        <a onClick={() => setOpen(false)}>Change Identity</a>
                      </Link>
                    </li>
                  </ul>
                  <li>
                    <a href="#!" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
