import styles from "./profile.module.sass"
import Section from "../Section"
import Link from "next/link"
import { FaPencilAlt } from "react-icons/fa"
import { useAuthState } from "../../../context/auth"

let Card = ({ title, content, url }) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <p>{url ? <a href={content}>{content}</a> : ` ${content} `}</p>
  </div>
)

let Img = ({ img }) => (
  <div className={styles.img}>
    <img src={img} alt={`dp`} />
  </div>
)

const Profile = ({ details }) => {
  const { user } = useAuthState()
  let {
    id,
    title,
    firstname,
    lastname,
    name,
    bio,
    about,
    website,
    dp,
    logo,
    cv,
    location,
  } = details
  let About = (
    <>
      <span>About</span>
      {user.id == id && (
        <Link href="/profile/edit">
          <a>
            <FaPencilAlt className={styles.icon} />
          </a>
        </Link>
      )}
    </>
  )
  return (
    <div className={styles.profile}>
      <Section title={About}>
        <article className={styles.contents}>
          {dp && <Img img={dp} />}
          {logo && <Img img={logo} />}
          {firstname && (
            <Card title="Name" content={`${firstname}${" "}${lastname}`} />
          )}
          {name && <Card title="Company name" content={name} />}
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
