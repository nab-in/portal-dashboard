import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "../components/api"
import Cookies from "js-cookie"
import axios from "axios"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Filter from "../components/applications/Filter"
import Search from "../components/applications/Search"
import Company from "../components/company/Company"
import Pagination from "../components/pagination/Pagination"
import Loader from "../components/loaders/UsersLoader"

const companies = () => {
  const router = useRouter()
  const [results, setResults] = useState(null)
  const [keyword, setKeyword] = useState(
    router.query?.keyword ? router.query.keyword : ""
  )
  let [error, setError] = useState("")
  const [companies, setCompanies] = useState([])
  const [size, setSize] = useState(0)
  const [pager, setPager] = useState({})
  const [loading, setLoading] = useState(true)
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
      url = `&filter=name:ilike:${keyword}`
      axios
        .get(`${API}/companies?page=${page}&pageSize=4${url}`, config)
        .then((res) => {
          console.log(res.data)
          setPager(res.data.pager)
          setResults(res.data.companies)
          setSize(res.data.users.length)
          setLoading(false)
        })
        .catch((err) => {
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
    axios
      .get(`${API}/companies?page=${page}&pageSize=8`, config)
      .then((res) => {
        setPager(res.data.pager)
        setCompanies(res.data.companies)
        setSize(res.data.companies.length)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  let nextUrl = `/companies?page=${
    page < Math.ceil(pager.total / pager.pageSize)
      ? pager?.page + 1
      : pager?.page
  }&url=${url}&keyword=${keyword}`
  let prevUrl = `/companies?page=${
    pager.page > 1 ? pager?.page - 1 : 1
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
            <span>Companies</span>
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
            </>
          ) : (
            <>
              {results != null ? (
                <>
                  {results.length > 0 ? (
                    <>
                      {results.map((company) => (
                        <Company key={company.id} company={company} />
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
                  {companies.length > 0 ? (
                    <>
                      {companies.map((company) => (
                        <Company key={company.id} company={company} />
                      ))}
                    </>
                  ) : (
                    <p
                      style={{
                        background: "white",
                        padding: "1rem",
                      }}
                    >
                      No Company Found
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
            </>
          )}
        </MainContents>
        <SubContents>
          <div className="desktop-filter">
            <Search setKeyword={setKeyword} />
          </div>
        </SubContents>
      </div>
    </div>
  )
}

export default companies
