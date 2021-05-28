import Section from "../Section"
import Loader from "../../loaders/ProfileLoader"
import styles from "./profile.module.sass"

let loading = false

let Card = ({ title, content, url }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{url ? <a href={content}>{content}</a> : ` ${content} `}</p>
  </div>
)

const Profile = ({ details }) => {
  let { id, title, bio, about, website, cv, location } = details
  return (
    <div className={styles.profile}>
      <Section title="About">
        <article className={styles.contents}>
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {title && <Card title="Title" content={title} />}
              {bio && <Card title="Bio" content={bio} />}
              {location && <Card title="Location" content={location} />}
              {about && <Card title="About" content={about} />}
              {website && <Card title="Website" content={website} url={true} />}
              {cv && <Card title="CV" content={cv} url="true" />}
            </>
          )}
        </article>
      </Section>
    </div>
  )
}

export default Profile
