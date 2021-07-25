import React from "react"
import styles from "./upload.module.sass"
import Card from "../cards/Card"
import Input from "../inputs/Input"
import Button from "../buttons/FormButton"

const UploadJobs = ({
  handleSubmit,
  handleChange,
  handleFileChange,
  formData,
  loading,
}) => {
  const { name, location, title, email, website, closeDate, bio, description } =
    formData
  return (
    <div className={styles.upload}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Card title="Job Information">
          <Input
            title="Job Name"
            handleChange={handleChange}
            name="name"
            id="name"
            value={name}
          />
          <Input
            type="email"
            title="Email"
            handleChange={handleChange}
            name="email"
            id="email"
            value={email}
          />

          <Input
            title="Website"
            handleChange={handleChange}
            name="website"
            id="website"
            value={website}
          />
          <Input
            title="Location"
            handleChange={handleChange}
            name="location"
            id="location"
            value={location}
          />
          <Input
            title="Close Date"
            type="datetime-local"
            handleChange={handleChange}
            name="closeDate"
            id="closedate"
            value={closeDate}
          />
        </Card>
        <Card title="Job Document">
          <input type="file" onChange={(e) => handleFileChange(e)} />
        </Card>
        <Card title="Job Descriptions">
          <Input
            title="Descriptions"
            handleChange={handleChange}
            name=""
            id="descriptions"
            textarea={true}
          />
          <Button text="Publish" btnClass="btn-primary" loading={loading} />
        </Card>
      </form>
    </div>
  )
}

export default UploadJobs
