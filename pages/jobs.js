import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Job from "../components/job/Job"
import Search from "../components/job-filters/search/Search"
import Filter from "../components/job-filters/filter/Filter"
import { useAuthState } from "../context/auth"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../components/api"
import Pagination from "../components/pagination/Pagination"
import Loader from "../components/loaders/cardLoader"

const jobs = () => {
  let router = useRouter()
  const [size, setSize] = useState(0)
  const [jobs, setJobs] = useState([])
  const [results, setResults] = useState(null)
  let [url, setUrl] = useState(router.query?.url ? router.query.url : "")
  const [pager, setPager] = useState(null)
  const [loading, setLoading] = useState(true)
  let [search, setSearch] = useState(
    router.query?.search
      ? JSON.parse(router.query.search)
      : {
          name: "",
          location: "",
          categories: [],
        }
  )
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
          setPager(res.data.pager)
          setJobs(res.data.jobs)
          setSize(res.data.jobs.length)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
    if (identity?.name == "company") {
      axios
        .get(`${API}/companies/${identity.id}?fields=jobs`, config)
        .then((res) => {
          setLoading(false)
          setJobs(res.data.jobs)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  }, [])

  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    if (
      identity?.name == "admin" &&
      (search.name.trim().length > 0 ||
        search.location.trim().length > 0 ||
        search.categories?.length > 0)
    ) {
      axios
        .get(
          `${API}/jobs?page=${page}&pageSize=4&fields=id,name,company,location,created,closeDate${url}`,
          config
        )
        .then((res) => {
          // console.log(res.data)
          setPager(res.data.pager)
          setSize(res.data.jobs.length)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err?.response)
        })
    }
  }, [search])

  let nextUrl = `/jobs?page=${
    page < Math.ceil(pager?.total / pager?.pageSize)
      ? pager?.page + 1
      : pager?.page
  }&url=${url}&search=${JSON.stringify(search)}`
  let prevUrl = `/jobs?page=${
    pager?.page > 1 ? pager?.page - 1 : 1
  }&url=${url}&${JSON.stringify(search)}`

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
          {user?.identity?.name == "admin" && (
            <div className="mobile-filter">
              <Search
                setSearch={setSearch}
                search={search}
                url={url}
                setUrl={setUrl}
              />
            </div>
          )}
          {user?.identity?.name == "admin" && (
            <Filter
              search={search}
              setSearch={setSearch}
              url={url}
              setUrl={setUrl}
            />
          )}
          {loading ? (
            <>
              <Loader loadClass="no_border" />
              <Loader loadClass="no_border" />
              <Loader loadClass="no_border" />
            </>
          ) : (
            <>
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
          {user?.identity?.name == "admin" && (
            <div className="desktop-filter">
              <Search
                setSearch={setSearch}
                search={search}
                url={url}
                setUrl={setUrl}
              />
            </div>
          )}
        </SubContents>
      </div>
    </div>
  )
}

export default jobs
