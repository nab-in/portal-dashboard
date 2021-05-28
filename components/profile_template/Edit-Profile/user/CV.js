import React from "react"
// import { AiOutlineCloudUpload } from "react-icons/ai"
import Section from "../../Section"
import Button from "../../../buttons/FormButton"
import styles from "./cv.module.sass"

const CV = () => {
  const handleFileChange = (e) => {}
  const handleFileSubmit = (e) => {
    e.preventDefault(e)
  }
  return (
    <Section title="Upload CV">
      <article className={styles.cv}>
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <label htmlFor="cv">
            <input
              type="file"
              name="cv"
              id="cv"
              handleChange={(e) => handleFileChange(e)}
            />
          </label>
          <Button text="Upload" btnClass="btn-primary" />
        </form>
      </article>
    </Section>
  )
}

export default CV
