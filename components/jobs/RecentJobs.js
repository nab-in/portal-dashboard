import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { API } from "../api"
import Link from "next/link"
import moment from "moment"
import styles from "./recent_jobs.module.sass"
import { useAuthState } from "../../context/auth"

const RelatedJobs = () => {
  const [jobs, setJobs] = useState([])
  const { user } = useAuthState()
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .get(
        `${API}/jobs?pageSize=3&fields=id,name,created,closeDate,company,location`,
        config
      )
      .then((res) => {
        setJobs(res.data.jobs)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={styles.card}>
      <h2>Recent Jobs</h2>
      <div className={styles.showcase}>
        {jobs.map(({ id, company, created, closeDate, name, location }) => (
          <article key={id} className="card">
            <div className={styles.title}>
              <h3>
                <Link href={`/jobs/${id}`}>{name}</Link>
              </h3>
            </div>
            <div className={styles.basic__info}>
              {user?.identity.name == "company" && (
                <div className={styles.logo__container}>
                  <div className={styles.logo}>
                    <img src={company.logo} alt={`${company?.name} logo`} />
                  </div>
                </div>
              )}
              <div className={styles.time__details}>
                <p className={styles.time}>
                  Posted: <span>{moment(created).format("MMM DD, YYYY")}</span>
                </p>
                <p className={styles.time}>
                  Deadline:{" "}
                  <span>{moment(closeDate).format("MMM DD, YYYY HH:mm")}</span>
                </p>
              </div>
              <div className={styles.company__info}>
                <p>
                  Location: <span>{location}</span>
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.more__link}>
        <Link href="/jobs">More Jobs</Link>
      </div>
    </div>
  )
}

export default RelatedJobs
