import { useState } from "react"
import Link from "next/link"
import dayjs from "dayjs"
import styles from "./job.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"
import { API } from "../api"
import { config } from "../config"
import axios from "axios"

const Job = ({ job, company, identity }) => {
  const [open, setOpen] = useState(false)
  let { id, name, created, closeDate, jobType, location } = job

  const deleteJob = () => {
    axios
      .delete(`${API}/jobs/${id}`, config)
      .then((res) => {
        setOpen(false)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err?.response)
      })
  }

  return (
    <article className={`card ${styles.job__card}`}>
      {company && (
        <div className={styles.logo__container}>
          <div className={styles.logo}>
            <img
              src={company.logo}
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
        <p>
          Posted: <span>{dayjs(created).format("MMM DD, YYYY")}</span>
        </p>
        <p>
          Deadline: <span>{dayjs(closeDate).format("MMM DD, YYYY HH:mm")}</span>
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
        {jobType && (
          <p>
            Job Type: <span>{jobType}</span>
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
            setOpen={setOpen}
          />
        </Modal>
      )}
    </article>
  )
}

export default Job
