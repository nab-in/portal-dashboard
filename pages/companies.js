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

const companies = () => {
  const [keywords, setKeywords] = useState([])
  const [companies, setCompanies] = useState([])
  const [size, setSize] = useState(0)
  const [pager, setPager] = useState({})
  const router = useRouter()
  const [page] = useState(router?.query?.page ? router.query.page : 1)

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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  let nextUrl = `/companies?page=${
    page < Math.ceil(pager.total / pager.pageSize)
      ? pager?.page + 1
      : pager?.page
  }`
  let prevUrl = `/companies?page=${pager.page > 1 ? pager?.page - 1 : 1}`

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
            <Search setKeywords={setKeywords} keywords={keywords} />
          </div>
          <Filter keywords={keywords} setKeywords={setKeywords} />
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
          </div>
        </SubContents>
      </div>
    </div>
  )
}

export default companies
