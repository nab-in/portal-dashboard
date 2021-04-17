import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaAngleDown } from "react-icons/fa"
import { BsBell } from "react-icons/bs"
import styles from "./header.module.sass"

const Header = ({ navOpen }) => {
  const [open, setOpen] = useState(false)
  return (
    <header
      className={navOpen ? "dashboard-header" : "dashboard-header full-width"}
    >
      <div className="container">
        <div className="logo-container">
          <div className="logo">
            {/* <Link href="/">
              {/* <img src={logo} alt="Kodemunit logo" className="logo" /> */}
            {/* </Link> */}
          </div>
        </div>
        <nav>
          <span className="role nav-link">
            <Link href="/dashboard/notifications" className="alerts">
              <BsBell className="icon" />
              {/* {number && <span>{number}</span>} */}
            </Link>
          </span>{" "}
          &nbsp;
          <a
            href="#!"
            className="user-name nav-link"
            // onTap={() => setOpen(!open)}
          >
            <span className="nav-link">John Doe</span>
            <FaAngleDown className="icon" />
          </a>
          <ul className={open ? "dropdown show" : "dropdown"}>
            <li>
              <a href="#!" onClick={() => setOpen(false)}>
                Name
              </a>
            </li>
            <li>
              <span>admin</span>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <a
                href="#!"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                Logout
              </a>
            </li>
          </ul>
          <div className="profile-image">
            {/* {user && user.data && (
          <img
            src={user.data.dp_path ? user.data.dp_path : dp_img}
            alt="profile/dp"
            loading="lazy"
            style={{
              objectFit: "cover",
            }}
          />
        )} */}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
