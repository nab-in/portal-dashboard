import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Job from "../components/job/Job"
import { useAuthState } from "../context/auth"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../components/api"
import Pagination from "../components/pagination/Pagination"

const jobs = () => {
  const [size, setSize] = useState(0)
  const [jobs, setJobs] = useState([])
  const [pager, setPager] = useState(null)
  const router = useRouter()
  const [page] = useState(router?.query?.page ? router.query.page : 1)
  const { user } = useAuthState()
  let identity = user?.identity
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    if (identity?.name == "admin") {
      axios
        .get(
          `${API}/jobs?page=${page}&pageSize=4&fields=id,name,company,location,created,closeDate`,
          config
        )
        .then((res) => {
          // console.log(res)
          setPager(res.data.pager)
          setJobs(res.data.jobs)
          setSize(res.data.jobs.length)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (identity?.name == "company") {
      axios
        .get(`${API}/companies/${identity.id}?fields=jobs`, config)
        .then((res) => {
          // console.log(res)
          setJobs(res.data.jobs)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  let nextUrl = `/jobs?page=${
    page < Math.ceil(pager?.total / pager?.pageSize)
      ? pager?.page + 1
      : pager?.page
  }`
  let prevUrl = `/jobs?page=${pager?.page > 1 ? pager?.page - 1 : 1}`
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
          {jobs.length > 0 ? (
            <>
              {jobs.map((job) => (
                <Job
                  key={job.id}
                  job={job}
                  company={job?.company}
                  identity={identity}
                />
              ))}
            </>
          ) : (
            <>No job found</>
          )}
          <Pagination
            size={size}
            pager={pager}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
          />
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
