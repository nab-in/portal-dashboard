import {
  RiHome2Line,
  RiBriefcase2Line,
  RiDraftLine,
  RiProfileLine,
  RiUser3Line,
} from "react-icons/ri"
import { BiBuildingHouse } from "react-icons/bi"
import { FiUsers } from "react-icons/fi"
// import { SiPuppet } from "react-icons/si"
import { CgListTree } from "react-icons/cg"
import { AiOutlineArrowRight } from "react-icons/ai"
import ActiveLink from "../ActiveLink"
import styles from "./aside.module.sass"
import { useAuthState } from "../../context/auth"

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
    id: 4,
    path: "companies",
    name: "Companies",
    type: "admin",
    icon: <BiBuildingHouse className={styles.icon} />,
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
    path: "profiles",
    name: "Users",
    type: "",
    icon: <FiUsers className={styles.icon} />,
  },
  {
    id: 7,
    path: "profile",
    name: "Profile",
    type: "admin",
    icon: <RiUser3Line className={styles.icon} />,
  },
  {
    id: 7,
    path: "company",
    name: "Profile",
    type: "company",
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

const Aside = ({ navOpen, handleNav, isMobile, setnavOpen }) => {
  const { user } = useAuthState()

  let links = []
  if (user?.identity?.name == "company") {
    links = urls.filter((el) => el.type == "company" || el.type == "")
  } else if (user?.identity?.name == "admin") {
    links = urls.filter((el) => el.type == "admin" || el.type == "")
  }

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
            <img src="/assets/images/logo.png" alt={`logo`} loading="lazy" />
          </div>
        </div>
        <nav>
          <ul>
            {links.length > 0 &&
              links.map(({ id, path, name, icon, type }) => (
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
