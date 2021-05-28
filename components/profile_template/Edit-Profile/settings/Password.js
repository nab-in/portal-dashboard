import React from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import styles from "./settings.module.sass"

const Password = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault(e)
  }
  return (
    <Accordion title="Change Password">
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          title="Enter your current email/username"
          handleChange={handleChange}
        />
        <Input
          type="password"
          title="Enter your current password"
          handleChange={handleChange}
        />
        <Input
          type="password"
          title="Enter New Password"
          handleChange={handleChange}
        />
        <Button text="Update" btnClass="btn-primary" />
      </form>
    </Accordion>
  )
}

export default Password
