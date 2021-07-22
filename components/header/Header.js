import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuthDispatch, useAuthState } from "../../context/auth"
import { FaAngleDown, FaBell } from "react-icons/fa"
import styles from "./header.module.sass"
import UseClickOutside from "../UseClickOutside"

const Header = ({ navOpen }) => {
  const [open, setOpen] = useState(false)
  const [notify, setNotify] = useState(false)
  let number = 5

  const dispatch = useAuthDispatch()

  const { user } = useAuthState()
  // check if outside is clicked
  let node = UseClickOutside(() => setOpen(false))

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
  }

  let data

  if (user?.identity?.name == "company") {
    data = user.company
  } else {
    data = user
  }

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
            <Image
              src={`/assets/images/logo.png`}
              alt={`logo`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className={styles.right__nav}>
          <div className={styles.notify} onClick={() => setNotify(true)}>
            <Link href="/notifications">
              <a>
                <FaBell className={styles.icon} />
                {0 < number && number <= 99 && <span>{number}</span>}
                {number > 99 && <span>99+</span>}
              </a>
            </Link>
          </div>
          <div className={styles.profile__container} ref={node}>
            <div onClick={() => setOpen(!open)} className={styles.profile}>
              <div className={styles.dp__container}>
                <Image
                  src={`/assets/images/dp.jpeg`}
                  alt={`dp`}
                  height={40}
                  width={40}
                  objectFit="cover"
                />
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
                  <Image
                    src={`/assets/images/dp.jpeg`}
                    alt={`dp`}
                    height={40}
                    width={40}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.name}>
                  {data?.name ? data.name : data?.username}
                </div>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <a onClick={() => setOpen(false)}>Dashboard</a>
                    </Link>
                  </li>
                  <ul>
                    <li>
                      <Link href="/jobs">
                        <a onClick={() => setOpen(false)}>Jobs</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/drafts">
                        <a onClick={() => setOpen(false)}>Drafts</a>
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
