import React from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
// import {API } from "

const jobs = () => {
  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Jobs</span>
          </div>
          <div className="mobile__link">
            <Link href="/jobs/new_job">
              <a>Add New Job</a>
            </Link>
          </div>

          {/* Display jobs here, depending on who logged in */}

            <div className={styles.display__jobs}>
                <div className={styles.logo__container}>
                  <div className={styles.logo}>
                    <img
                      src={`/assets/companies/logo1.png`}
                      alt={`${job.name} logo`}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className={styles.job__heading}>
                  <div className={styles.title}>
                    <h1>{job.name}</h1>
                  </div>
                  <div className={styles.time__details}>
                    <div className={`${styles.time} ${styles.posted}`}>
                      Posted at:&nbsp;{" "}
                      {moment(job.created).format("MMM DD, YYYY")}
                    </div>
                    <div className={`${styles.time} ${styles.deadline}`}>
                      <span>
                        Deadline:{" "}
                        {moment(job.created).format("MMM DD, YYYY HH:mm")}
                      </span>
                      <span>{job[0]?.close_time}</span>
                    </div>
                  </div>
                </div>
              </div>

        </MainContents>
        <SubContents>
          <Link href="/jobs/new_job">
            <a className="sub_btn btn btn-primary">Add New Job</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default jobs
