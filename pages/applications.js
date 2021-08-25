import { useEffect, useState } from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import { API } from "../components/api"
import axios from "axios"
import Cookies from "js-cookie"
import Pagination from "../components/pagination/Pagination"
import Application from "../components/applications/Application"
import Filter from "../components/applications/Filter"
import Search from "../components/applications/Search"
import { useAuthState } from "../context/auth"

const applications = ({ data, error, page }) => {
  const [apps, setApps] = useState([])
  const [keywords, setKeywords] = useState([])
  const [size, setSize] = useState(0)
  const [errors, setErrors] = useState(null)
  const { user } = useAuthState()
  useEffect(() => {
    if (data) {
      let results = []
      data?.jobs.forEach((el) => {
        if (el.users?.length > 0) {
          el.users.forEach((o) => {
            let app = {
              id: el.id,
              name: el.name,
              user: o,
            }
            results.push(app)
          })
        }
      })
      setApps(results)
      setSize(data.jobs.length)
    }
    if (error) {
      setErrors(error)
    }
  }, [])

  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
    axios
      .get(`${API}/companies/${user?.company?.id}?fields=jobs[users]`, config)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err?.response)
      })
  }, [user])

  let nextUrl = `/applications?page=${
    page < Math.ceil(data?.pager.total / data?.pager.pageSize)
      ? data?.pager?.page + 1
      : data?.pager?.page
  }`
  let prevUrl = `/applications?page=${
    data?.pager.page > 1 ? data?.pager?.page - 1 : 1
  }`

  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Applications</span>
          </div>
          <div className="mobile__link">
            <Link href="/jobs/new_job">
              <a>Add New Job</a>
            </Link>
          </div>
          <div className="mobile-filter">
            <Search setKeywords={setKeywords} keywords={keywords} />
          </div>
          <Filter keywords={keywords} setKeywords={setKeywords} />
          {apps.length > 0 ? (
            apps.map((app, index) => <Application app={app} key={index} />)
          ) : (
            <p
              style={{
                background: "white",
                padding: "1rem",
              }}
            >
              No Application found
            </p>
          )}
          <Pagination
            size={size}
            pager={data?.pager}
            nextUrl={nextUrl}
            prevUrl={prevUrl}
          />
        </MainContents>
        <SubContents>
          <Link href="/jobs/new_job">
            <a className="sub_btn btn btn-primary">Add New Job</a>
          </Link>
          <div className="desktop-filter">
            <Search setKeywords={setKeywords} keywords={keywords} />
          </div>
        </SubContents>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  let data = null
  let error = null
  let page = 1

  if (query?.page) page = query?.page

  try {
    const res = await fetch(
      `${API}/jobs?pageSize=3&page=${page}&fields=id,name,users`
    )
    data = await res.json()
  } catch (err) {
    console.log(err)
    error = JSON.stringify(err)
  }

  return {
    props: {
      error,
      data,
      page,
    },
  }
}

export default applications
