import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "../components/api"
import axios from "axios"
import Cookies from "js-cookie"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Pagination from "../components/pagination/Pagination"
import Roles from "../components/roles/Roles"
import Search from "../components/applications/Search"
import Filter from "../components/applications/Filter"
import User from "../components/user/User"
import Loader from "../components/loaders/UsersLoader"
import { useAuthState } from "../context/auth"

const profiles = () => {
  const [users, setUsers] = useState([])
  const [size, setSize] = useState(0)
  const [pager, setPager] = useState({})
  const [loading, setLoading] = useState(false)
  let [error, setError] = useState("")
  const [keywords, setKeywords] = useState([])
  const router = useRouter()
  const { user } = useAuthState()
  const [page] = useState(router?.query?.page ? router.query.page : 1)
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .get(`${API}/users?page=${page}&pageSize=4`, config)
      .then((res) => {
        setPager(res.data.pager)
        setUsers(res.data.users)
        setSize(res.data.users.length)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response)
        setError(err?.response?.data?.message)
        setLoading(false)
      })
  }, [])
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
            <span>Profiles</span>
          </div>
          {/* <div className="mobile__link">
            <Link href="/jobs/new_job">
              <a>Add New Job</a>
            </Link>
          </div> */}
          <div className="mobile-filter">
            <Search setKeywords={setKeywords} keywords={keywords} />
            {user?.identity?.name == "admin" && user?.role == "admin" && (
              <Roles />
            )}
          </div>
          <Filter keywords={keywords} setKeywords={setKeywords} />
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {users.length > 0 ? (
                <>
                  {users.map((user) => (
                    <User key={user.id} user={user} />
                  ))}
                </>
              ) : (
                <p
                  style={{
                    background: "white",
                    padding: "1rem",
                  }}
                >
                  No user found
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
          <div className="desktop-filter">
            <Search setKeywords={setKeywords} keywords={keywords} />
            {user?.identity?.name == "admin" && user?.role == "admin" && (
              <Roles />
            )}
          </div>
        </SubContents>
      </div>
    </div>
  )
}

export default profiles
