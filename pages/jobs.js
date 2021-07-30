import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import { useAuthState } from "../context/auth"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../components/api"
import Pagination from "../components/pagination/Pagination"

const jobs = () => {
  const [keywords, setKeywords] = useState([])
  const [size, setSize] = useState(0)
  const [jobs, setJobs] = useState([])
  const [pager, setPager] = useState(null)
  const router = useRouter()
  const [page] = useState(router?.query?.page ? router.query.page : 1)
  const { user } = useAuthState()
  let identity = user?.identity
  useEffect(() => {}, [])
  let nextUrl = `/profiles?page=${
    page < Math.ceil(pager?.total / pager?.pageSize)
      ? pager?.page + 1
      : pager?.page
  }`
  let prevUrl = `/profiles?page=${pager?.page > 1 ? pager?.page - 1 : 1}`
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
