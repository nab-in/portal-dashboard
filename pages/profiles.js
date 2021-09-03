import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "../components/api"
import RefreshButton from "../components/RefreshButton"
import axios from "axios"
import { config } from "../components/config"
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
  const [errors, setErrors] = useState("")
  const [message, setMessage] = useState("")
  const [results, setResults] = useState(null)
  const [keyword, setKeyword] = useState(
    router.query?.keyword ? router.query.keyword : ""
  )
  const { user } = useAuthState()
  const [page] = useState(router?.query?.page ? router.query.page : 1)

  let url = router.query?.url ? router.query.url : ""

  useEffect(() => {
    let isMounted = true
    let search = true
    if (isMounted) refreshUsers(search)
    return () => {
      isMounted = false
    }
  }, [keyword])

  useEffect(() => {
    let isMounted = true
    if (isMounted) refreshUsers()
    return () => {
      isMounted = false
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

  const refreshUsers = (search) => {
    setMessage("")
    if (search && keyword?.trim().length > 0) {
      url = `&filter=firstname:ilike:${keyword}`
      setLoading(true)
      axios
        .get(`${API}/users?page=${page}&pageSize=10${url}`, config)
        .then((res) => {
          setPager(res.data.pager)
          setResults(res.data.users)
          setSize(res.data.users.length)
          if (res?.data?.users?.length === 0)
            setMessage("No user match your criteria")
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          if (err?.response) {
            setErrors({
              type: "danger",
              msg: err?.response?.data?.message,
            })
          } else if (err?.message) {
            if (err?.code === "ECONNREFUSED") {
              setErrors({
                type: "danger",
                msg: "Failed to connect, please try again",
              })
            } else {
              setErrors({
                type: "danger",
                msg: err.message,
              })
            }
          } else {
            setErrors({
              type: "danger",
              msg: "Internal server error, please try again",
            })
          }
        })
    } else if (keyword?.trim().length == 0) {
      if (user?.identity?.name == "admin") {
        setLoading(true)
        axios
          .get(
            `${API}/users?page=${page}&pageSize=10&fields=userRoles,firstname,lastname,id,dp`,
            config
          )
          .then((res) => {
            setPager(res.data.pager)
            setUsers(res.data.users)
            if (res?.data?.users?.length === 0) setMessage("No user found")
            setSize(res.data.users.length)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            if (err?.response) {
              setErrors({
                type: "danger",
                msg: err?.response?.data?.message,
              })
            } else if (err?.message) {
              if (err?.code === "ECONNREFUSED") {
                setErrors({
                  type: "danger",
                  msg: "Failed to connect, please try again",
                })
              } else {
                setErrors({
                  type: "danger",
                  msg: err.message,
                })
              }
            } else {
              setErrors({
                type: "danger",
                msg: "Internal server error, please try again",
              })
            }
          })
      }
      if (user?.identity?.name == "company") {
        setLoading(true)
        axios
          .get(`${API}/companies/${user?.identity?.id}?fields=users`, config)
          .then((res) => {
            setUsers(res.data.users)
            if (res?.data?.users?.length === 0) setMessage("No user found")
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            if (err?.response) {
              setErrors({
                type: "danger",
                msg: err?.response?.data?.message,
              })
            } else if (err?.message) {
              if (err?.code === "ECONNREFUSED") {
                setErrors({
                  type: "danger",
                  msg: "Failed to connect, please try again",
                })
              } else {
                setErrors({
                  type: "danger",
                  msg: err.message,
                })
              }
            } else {
              setErrors({
                type: "danger",
                msg: "Internal server error, please try again",
              })
            }
          })
      }
    }
  }

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
                  {results.length > 0 && (
                    <>
                      {results.map((user) => (
                        <User key={user.id} userData={user} />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {users.length > 0 && (
                    <>
                      {users.map((user) => (
                        <User key={user.id} userData={user} />
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
          {(errors || message) && (
            <div
              style={{
                background: "white",
                padding: "1rem",
              }}
            >
              {message && !loading && <p>{message}</p>}
              {errors?.msg && <p className="alerts danger">{errors.msg}</p>}
              <RefreshButton onclick={refreshUsers} />
            </div>
          )}

          {pager &&
            ((users?.length > 0 && results?.length > 0) ||
              (users?.length > 0 && results === null)) && (
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
