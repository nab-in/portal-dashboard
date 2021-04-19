import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaAngleDown, FaBell } from "react-icons/fa"
import styles from "./header.module.sass"

// detect outside click hook
let useClickOutside = (handler) => {
  let node = useRef()
  useEffect(() => {
    let handle = (e) => {
      if (!node.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
    }
  })
  return node
}

const Header = ({ navOpen }) => {
  const [open, setOpen] = useState(false)
  const [notify, setNotify] = useState(false)
  let number = 5

  // check if outside is clicked
  let node = useClickOutside(() => {
    setOpen(false)
  })

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
          <div
            className={styles.profile__container}
            ref={node}
          >
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
              <span>John Doe</span>
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
                John Doe
                </div>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <a>Dashboard</a>
                    </Link>
                  </li>
                  <ul>
                    <li>
                      <Link href="/jobs">
                        <a>Jobs</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/drafts">
                        <a>Drafts</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile">
                        <a>Profile</a>
                      </Link>
                    </li>
                  </ul>
                  <li>
                    <a href="#!">Logout</a>
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
