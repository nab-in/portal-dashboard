import React from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import styles from "./settings.module.sass"

const Email = ({ email }) => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault(e)
  }
  let title = (
    <span>
      Change email <strong> ({email})*</strong>
    </span>
  )
  return (
    <Accordion title={title}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          title="Enter your current email/username"
          handleChange={handleChange}
        />
        <Input
          type="email"
          title="Enter your new email"
          handleChange={handleChange}
        />
        <Input
          type="password"
          title="Enter Password"
          handleChange={handleChange}
        />
        <Button text="Update" btnClass="btn-primary" />
      </form>
    </Accordion>
  )
}

export default Email
