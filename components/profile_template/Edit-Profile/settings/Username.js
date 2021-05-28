import React from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import styles from "./settings.module.sass"

const Username = ({ username }) => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault(e)
  }
  let title = (
    <span>
      Change username <strong> ({username})*</strong>
    </span>
  )
  return (
    <Accordion title={title}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          title="Enter your current email/username"
          handleChange={handleChange}
        />
        <Input title="Enter your new username" handleChange={handleChange} />
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

export default Username
