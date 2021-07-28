import { useEffect, useState } from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import { API } from "../components/api"
import Pagination from "../components/pagination/Pagination"

const applications = ({ data, error, page }) => {
  const [apps, setApps] = useState([])
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

  console.log(errors)

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
          {apps.length > 0 &&
            apps.map((app, index) => (
              <div key={index}>
                {app.name}
                <br />
                {app.user.firstname} {app.user.firstname}
                <br />
              </div>
            ))}
          <Pagination pager={data?.pager} nextUrl={nextUrl} prevUrl={prevUrl} />
        </MainContents>
        <SubContents></SubContents>
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
