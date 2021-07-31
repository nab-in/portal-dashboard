import { useState } from "react"
import Button from "../../../buttons/FormButton"
import Input from "../../../inputs/Input"
import Upload from "../Upload"
import styles from "../edit.module.sass"
import Section from "../../Section"

const EditCompany = ({ details, page }) => {
  let [formData, setFormData] = useState({
    name: details?.name ? details.name : "",
    title: details?.title ? details.title : "",
    bio: details?.bio ? details.bio : "",
    location: details?.location ? details.location : "",
    about: details?.about ? details.about : "",
    website: details?.website ? details.website : "",
  })

  let { name, title, bio, location, about, website } = formData

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)
  }

  return (
    <div className={styles.profile}>
      <Section title="Edit Informations">
        <Upload
          id={details?.id}
          img={details?.dp ? details?.dp : details?.logo}
          name={details?.username ? details?.username : details?.name}
          page={page}
        />
        <article className={styles.contents}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input
              title="Company/Organisation Name"
              name="name"
              id="name"
              value={name}
              handleChange={handleChange}
              placeholder="Name"
            />
            <Input
              title="Title"
              name="title"
              id="title"
              value={title}
              handleChange={handleChange}
              placeholder="Title..."
            />
            <Input
              title="Bio"
              name="bio"
              id="bio"
              value={bio}
              placeholder="Bio"
              handleChange={handleChange}
            />
            <Input
              title="Location"
              name="location"
              id="location"
              value={location}
              handleChange={handleChange}
              placeholder="Location"
            />
            <Input
              title="About"
              name="about"
              id="about"
              value={about}
              handleChange={handleChange}
              placeholder="About"
              textarea={true}
            />
            <Input
              type="url"
              title="Website"
              name="website"
              id="website"
              value={website}
              handleChange={handleChange}
              placeholder="http://..."
            />
            <Button text="Save" btnClass="btn-primary" />
          </form>
        </article>
      </Section>
    </div>
  )
}

export default EditCompany
