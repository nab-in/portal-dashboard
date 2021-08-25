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
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [size, setSize] = useState(0)
  const [pager, setPager] = useState(null)
  const [loading, setLoading] = useState(true)
  let [error, setError] = useState("")
  const [results, setResults] = useState(null)
  const [keyword, setKeyword] = useState(
    router.query?.keyword ? router.query.keyword : ""
  )
  const { user } = useAuthState()
  const [page] = useState(router?.query?.page ? router.query.page : 1)

  let url = router.query?.url ? router.query.url : ""

  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }

    if (keyword?.trim().length > 0) {
      url = `&filter=firstname:ilike:${keyword}`
      axios
        .get(`${API}/users?page=${page}&pageSize=4${url}`, config)
        .then((res) => {
          setPager(res.data.pager)
          setResults(res.data.users)
          setSize(res.data.users.length)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.response)
          setError(err?.response?.data?.message)
          setLoading(false)
        })
    }
  }, [keyword])

  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    if (keyword?.trim().length == 0) {
      if (user?.identity?.name == "admin") {
        axios
          .get(`${API}/users?page=${page}&pageSize=4`, config)
          .then((res) => {
            console.log(res.data)
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
      }
      if (user?.identity?.name == "company") {
        axios
          .get(`${API}/companies/${user?.identity?.id}?fields=users`, config)
          .then((res) => {
            setUsers(res.data.users)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err.response)
            setError(err?.response?.data?.message)
            setLoading(false)
          })
      }
    }
  }, [])
  let nextUrl = `/profiles?page=${
    page < Math.ceil(pager?.total / pager?.pageSize)
      ? pager?.page + 1
      : pager?.page
  }&url=${url}&keyword=${keyword}`
  let prevUrl = `/profiles?page=${
    pager?.page > 1 ? pager?.page - 1 : 1
  }&url=${url}&keyword=${keyword}`
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
            <Search setKeyword={setKeyword} />
          </div>
          <Filter
            keyword={keyword}
            setKeyword={setKeyword}
            setResults={setResults}
          />
          {loading ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          ) : (
            <>
              {results !== null ? (
                <>
                  {results.length > 0 ? (
                    <>
                      {results.map((user) => (
                        <User key={user.id} userData={user} />
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
              ) : (
                <>
                  {users.length > 0 ? (
                    <>
                      {users.map((user) => (
                        <User key={user.id} userData={user} />
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
            </>
          )}
          {pager && (
            <Pagination
              size={size}
              pager={pager}
              nextUrl={nextUrl}
              prevUrl={prevUrl}
            />
          )}
        </MainContents>
        <SubContents>
          <div className="desktop-filter">
            <Search setKeyword={setKeyword} />
          </div>
          {user?.identity?.name == "admin" && user?.role == "admin" && (
            <Roles />
          )}
        </SubContents>
      </div>
    </div>
  )
}

export default profiles
