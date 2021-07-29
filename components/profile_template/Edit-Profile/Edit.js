import styles from "./edit.module.sass"
import EditUser from "./user/EditUser"
import EditCompany from "./company/Edit_Company"

let isUser = true
let isCompany = false
const Edit = ({ details }) => {
  return (
    <div className={styles.profile}>
      {isCompany && <EditCompany />}
      {isUser && <EditUser />}
    </div>
  )
}

export default Edit
