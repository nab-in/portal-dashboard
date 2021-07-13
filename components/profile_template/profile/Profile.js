import styles from "./profile.module.sass"
import Section from "../Section"
import Link from "next/link"
import { FaPencilAlt } from "react-icons/fa"

let Card = ({ title, content, url }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{url ? <a href={content}>{content}</a> : ` ${content} `}</p>
  </div>
)

let About = (
  <>
    <span>About</span>
    <Link href="/profile/edit">
      <a>
        <FaPencilAlt className={styles.icon} />
      </a>
    </Link>
  </>
)

const Profile = ({ details }) => {
  let { id, title, bio, about, website, cv, location } = details
  return (
    <div className={styles.profile}>
      <Section title={About}>
        <article className={styles.contents}>
          {title && <Card title="Title" content={title} />}
          {bio && <Card title="Bio" content={bio} />}
          {location && <Card title="Location" content={location} />}
          {about && <Card title="About" content={about} />}
          {website && <Card title="Website" content={website} url={true} />}
          {cv && <Card title="CV" content={cv} url="true" />}
        </article>
      </Section>
    </div>
  )
}

export default Profile
