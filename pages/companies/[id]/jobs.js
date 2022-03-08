import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { API } from "../../../components/api"
import axios from "axios"
import { config } from "../../../components/config"
import MainContents from "../../../components/templates/MainContents"
import SubContents from "../../../components/templates/SubContents"
import Job from "../../../components/job/Job"
import Loader from "../../../components/loaders/cardLoader"

const Jobs = () => {
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    axios
      .get(`${API}/companies/${router.query.id}?fields=jobs`, config)
      .then((res) => {
        setJobs(res.data.jobs)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })

    axios
      .get(`${API}/companies/${router.query.id}?fields=name,id`, config)
      .then((res) => {
        setCompany(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>
              <Link href="/companies">Companies</Link>
            </span>
            <span>/</span>
            {company && (
              <span>
                <Link href={`/companies/${company.id}`}>{company.name}</Link>
              </span>
            )}

            <span>/</span>
            <span>Jobs</span>
          </div>
          <div className="mobile__link">
            <Link href={`/companies/${company?.id}`}>View Profile</Link>
          </div>
          {loading ? (
            <>
              <Loader loadClass="no_border" />
              <Loader loadClass="no_border" />
              <Loader loadClass="no_border" />
            </>
          ) : (
            <>
              {jobs?.length > 0 ? (
                jobs.map((job) => <Job key={job.id} job={job} />)
              ) : (
                <p
                  style={{
                    background: "white",
                    padding: "1rem",
                  }}
                >
                  No job found
                </p>
              )}
            </>
          )}
        </MainContents>
        <SubContents>
          <Link href={`/companies/${company?.id}`}>
            <a className="sub_btn span__full btn btn-primary">View Profile</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default Jobs
