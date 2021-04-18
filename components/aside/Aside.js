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
import { SiPuppet } from "react-icons/si"
import { CgListTree } from "react-icons/cg"
import { AiOutlineArrowRight } from "react-icons/ai"
import ActiveLink from "../ActiveLink"
import styles from "./aside.module.sass"

const urls = [
  {
    id: 1,
  },
]

const Aside = ({ navOpen, handleNav, isMobile }) => {
  console.log(isMobile)
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
            <Image
              src={
                navOpen
                  ? `/assets/images/logo_bg.png`
                  : `/assets/images/logo.png`
              }
              alt={`dp`}
              layout="fill"
              objectFit="contain"
            />
            {isMobile ? (
              <Image
                src={`/assets/images/logo.png`}
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
      </div>
    </aside>
  )
}

export default Aside
