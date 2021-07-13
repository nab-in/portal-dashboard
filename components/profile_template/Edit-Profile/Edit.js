import styles from "./edit.module.sass"
import EditUser from "./user/EditUser"
import EditCompany from "./company/Edit_Company"

let isUser = false
let isCompany = true
const Edit = () => {
  return (
    <div className={styles.profile}>
      {isCompany && <EditCompany />}
      {isUser && <EditUser />}
    </div>
  )
}

export default Edit
