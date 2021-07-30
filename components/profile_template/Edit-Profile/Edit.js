import { useState, useEffect } from "react"
import styles from "./edit.module.sass"
import EditUser from "./user/EditUser"
import EditCompany from "./company/EditCompany"

const Edit = ({ details, page }) => {
  const [isUser, setUser] = useState(false)
  const [isCompany, setCompany] = useState(false)

  useEffect(() => {
    if (page == "auth-user") setUser(true)
    if (page == "company") setCompany(true)
  }, [])
  return (
    <div className={styles.profile}>
      {isCompany && <EditCompany details={details} page={page} />}
      {isUser && <EditUser details={details} page={page} />}
    </div>
  )
}

export default Edit
