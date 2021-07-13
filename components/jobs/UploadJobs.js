import React from "react"
import styles from "./upload.module.sass"
import Card from "../cards/Card"
import Input from "../inputs/Input"
import Button from "../buttons/FormButton"

const UploadJobs = ({ handleSubmit, handleChange }) => {
  return (
    <div className={styles.upload}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Card title="Job Information">
          <Input
            title="Job Title"
            handleChange={handleChange}
            name=""
            id="jobs"
          />
          <Input title="Email" handleChange={handleChange} name="" id="email" />
          <Input
            title="Close Date"
            type="datetime"
            handleChange={handleChange}
            name=""
            id="email"
          />
        </Card>
        <Card title="Job Document">
          <input type="file" />
        </Card>
        <Card title="Job Descriptions">
          <Input
            title="Descriptions"
            handleChange={handleChange}
            name=""
            id="descriptions"
            textarea={true}
          />
          <Button text="Publish" btnClass="btn-primary" />
        </Card>
      </form>
    </div>
  )
}

export default UploadJobs
