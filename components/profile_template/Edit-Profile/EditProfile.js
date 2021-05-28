import EditUser from "./user/EditUser"
import EditCompany from "./company/EditCompany"
import styles from "./edit_profile.module.sass"

const EditProfile = ({ details, isUser, isCompany }) => {
  return (
    <div className={styles.profile}>
      {isUser && <EditUser details={details} />}
      {isCompany && <EditCompany details={details} />}
    </div>
  )
}

export default EditProfile
