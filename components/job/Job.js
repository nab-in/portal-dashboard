import { useState } from "react"
import Link from "next/link"
import moment from "moment"
import styles from "./job.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"

const Job = ({ job, company, identity }) => {
  const [open, setOpen] = useState(false)
  let {
    id,
    name,
    created,
    closeDate,
    job_type,
    location,
    // reviews: 0.8
  } = job
  let reviews = 0.85
  let style = { "--rating": reviews * 5 }

  const deleteJob = () => {
    setOpen(false)
  }
  return (
    <article className={`card ${styles.job__card}`}>
      {company && (
        <div className={styles.logo__container}>
          <div className={styles.logo}>
            <img
              src={company.logo}
              // src="/assets/companies/logo1.png"
              alt={`${job.company?.name} logo`}
              loading="lazy"
            />
          </div>
        </div>
      )}
      <div
        className={
          company
            ? `${styles.details}`
            : `${styles.details} ${styles.details_company}`
        }
      >
        <h2>
          <Link href={`/jobs/${id}`}>{name}</Link>
        </h2>
        {/* {reviews && <div className="stars" style={style}></div>} */}
        <p>
          Posted: <span>{moment(created).format("MMM DD, YYYY")}</span>
        </p>
        <p>
          Deadline:{" "}
          <span>{moment(closeDate).format("MMM DD, YYYY HH:mm")}</span>
        </p>
      </div>
      <div
        className={
          company
            ? `${styles.job_description}`
            : `${styles.job_description} ${styles.details_company}`
        }
      >
        {company && (
          <p className={styles.company__name}>
            Company:{" "}
            <Link href={`/companies/${job.company?.id}`}>
              <a>{job.company?.name}</a>
            </Link>
          </p>
        )}
        {job_type && (
          <p>
            Job Type: <span>{job_type}</span>
          </p>
        )}
        {location && (
          <p>
            Location: <span>{location}</span>
          </p>
        )}
        {identity && identity.name == "company" && (
          <div className={styles.btns}>
            <Link href={`/jobs/${id}/edit`}>
              <a>Edit</a>
            </Link>
            <button className={styles.delete} onClick={() => setOpen(true)}>
              Delete
            </button>
          </div>
        )}
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            action={deleteJob}
            title={`Are you sure you want to delete ${name}`}
            btnText="Delete"
          />
        </Modal>
      )}
    </article>
  )
}

export default Job
