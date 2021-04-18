import React from "react"
import Image from "next/image"
import {
  RiHome2Line,
  RiBriefcase2Line,
  RiDraftLine,
  RiProfileLine,
  RiUser3Line,
} from "react-icons/ri"
import { GrOrganization } from "react-icons/gr"
import { FiUsers } from "react-icons/fi"
// import { SiPuppet } from "react-icons/si"
import { CgListTree } from "react-icons/cg"
import { AiOutlineArrowRight } from "react-icons/ai"
import ActiveLink from "../ActiveLink"
import styles from "./aside.module.sass"

let urls = [
  {
    id: 1,
    path: "",
    name: "Home",
    type: "",
    icon: <RiHome2Line className={styles.icon} />,
  },
  {
    id: 2,
    path: "jobs",
    name: "Jobs",
    type: "",
    icon: <RiBriefcase2Line className={styles.icon} />,
  },
  {
    id: 3,
    path: "drafts",
    name: "Drafts",
    type: "company",
    icon: <RiDraftLine className={styles.icon} />,
  },
  {
    id: 4,
    path: "companies",
    name: "Companies",
    type: "admin",
    icon: <GrOrganization className={styles.icon} />,
  },
  {
    id: 5,
    path: "applications",
    name: "Applications",
    type: "company",
    icon: <RiProfileLine className={styles.icon} />,
  },
  {
    id: 6,
    path: "users",
    name: "Users",
    type: "admin",
    icon: <FiUsers className={styles.icon} />,
  },
  {
    id: 7,
    path: "profile",
    name: "Profile",
    type: "",
    icon: <RiUser3Line className={styles.icon} />,
  },
  {
    id: 8,
    path: "categories",
    name: "Categories",
    type: "admin",
    icon: <CgListTree className={styles.icon} />,
  },
]

// let isCompany = "company"
// let isAdmin = "admin"
const Aside = ({ navOpen, handleNav, isMobile, setnavOpen }) => {
  console.log(isMobile)
  urls = urls.filter((el) => el.type == "company" || el.type == "")
  return (
    <aside
      className={navOpen ? `${styles.aside}` : `${styles.aside} ${styles.open}`}
    >
      <div className={styles.wrapper}>
        <div onClick={handleNav} className={styles.burger}>
          <AiOutlineArrowRight className={styles.icon} />
        </div>
        <div className={styles.logo__container}>
          <div className={styles.logo}>
            {isMobile ? (
              <Image
                src={`/assets/images/logo_bg.png`}
                alt={`logo`}
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <Image
                src={
                  navOpen && !isMobile
                    ? `/assets/images/logo_bg.png`
                    : `/assets/images/logo.png`
                }
                alt={`logo`}
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <nav>
          <ul>
            {urls.length > 0 &&
              urls.map(({ id, path, name, icon, type }) => (
                <li
                  key={id}
                  onClick={() => {
                    isMobile && setnavOpen(true)
                  }}
                >
                  <ActiveLink href={`/${path}`}>
                    <a>
                      {icon}
                      <span>{name}</span>
                    </a>
                  </ActiveLink>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Aside
