import { useEffect, useState } from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import { API } from "../components/api"
import Pagination from "../components/pagination/Pagination"
import Application from "../components/applications/Application"
import Filter from "../components/applications/Filter"
import Search from "../components/applications/Search"

const applications = ({ data, error, page }) => {
  const [apps, setApps] = useState([])
  const [keywords, setKeywords] = useState([])
  const [errors, setErrors] = useState(null)
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
    }
    if (error) {
      setErrors(error)
    }
  }, [])

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
          <Filter keywords={keywords} setKeywords={setKeywords} />
          {apps.length > 0 &&
            apps.map((app, index) => <Application app={app} key={index} />)}
          <Pagination pager={data?.pager} nextUrl={nextUrl} prevUrl={prevUrl} />
        </MainContents>
        <SubContents>
          <Link href="/jobs/new_job">
            <a className="sub_btn btn btn-primary">Add New Job</a>
          </Link>
          <Search setKeywords={setKeywords} keywords={keywords} />
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
