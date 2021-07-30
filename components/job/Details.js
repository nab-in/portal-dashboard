import Card from "../cards/Card"
import moment from "moment"
import Linkify from "react-linkify"
import styles from "./details.module.sass"
import { useAuthState } from "../../context/auth"

const Details = ({ job }) => {
  let {
    id,
    job_type,
    location,
    company,
    email,
    attachment,
    bio,
    description,
    closeDate,
    name,
    created,
  } = job
  const { user } = useAuthState()
  return (
    <div className={styles.details}>
      <Card title={name}>
        <div className={styles.details}>
          {user.identity?.name == "admin" && (
            <div className={styles.logo}>
              <img src={company?.logo} alt={`${company.name} logo`} />
            </div>
          )}
          {name && (
            <div className={styles.title}>
              Job Title: <span>{name}</span>
            </div>
          )}
          {company && user.identity?.name == "admin" && (
            <div className={styles.title}>
              Company/Organisation: <span>{company?.name}</span>
            </div>
          )}
          {location && (
            <div className={styles.title}>
              Location: <span>{location}</span>
            </div>
          )}
          {job_type && (
            <div className={styles.title}>
              Open To: <span>{job_type}</span>
            </div>
          )}
          {bio && (
            <div className={styles.title}>
              Bio: <span>{bio}</span>
            </div>
          )}
          {created && (
            <div className={styles.title}>
              Posted: <span>{moment(created).format("MMM DD, YYYY")}</span>
            </div>
          )}
          {closeDate && (
            <div className={styles.title}>
              Deadline:{" "}
              <span>{moment(closeDate).format("MMM DD, YYYY HH:mm")}</span>
            </div>
          )}
          {email && (
            <div className={styles.title}>
              Email:
              <a href={`mailto:${email}`}>
                <span>{email}</span>
              </a>
            </div>
          )}
          {attachment && (
            <div className={styles.title}>
              Attachment:
              <Link href={attachment}>
                <a target="_blank">
                  <span>Attachment</span>
                </a>
              </Link>
            </div>
          )}
          {description && (
            <div className={styles.descriptions}>
              <Linkify>{description}</Linkify>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Details
