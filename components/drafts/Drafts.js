import React, { useEffect, useState } from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Search from "../components/job-filters/search/Search"
import Filter from "../components/job-filters/filter/Filter"
import Draftcard from "../components/cards/Draftcard"
import Pagination from "../components/pagination/Pagination"
import { API } from "../components/api"
import axios from "axios"

const drafts = ({ data, error, page }) => {
  const [drafts, setDrafts] = useState([])
  const [size, setSize] = useState(0)
  const [categories, setCategories] = useState([])
  let [search, setSearch] = useState({
    keyword: "",
    location: "",
    categories: [],
  })
  useEffect(() => {
    if (data) {
      setDrafts(data.jobs)
      setSize(data.jobs.length)
    }
    if (error) {
      setErrors(error)
    }
    axios
      .get(`${API}/jobCategories?fields=id,name,children[id, name]`)
      .then((res) => {
        // console.log(res.data)
        let data = res.data?.jobCategories
        let filter = []
        data.forEach((el) => {
          // console.log(el.children)
          if (el.children) filter = filter.concat(el.children)
        })
        filter.forEach((el) => {
          data = data.filter((o) => o.id != el.id)
        })
        setCategories(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  let nextUrl = `/drafts?page=${
    page < Math.ceil(data?.pager.total / data?.pager.pageSize)
      ? data?.pager?.page + 1
      : data?.pager?.page
  }`
  let prevUrl = `/drafts?page=${
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
            <span>Drafts</span>
          </div>
          <div className="mobile-filter">
            <Search
              setSearch={setSearch}
              search={search}
              categories={categories}
            />
          </div>
          <Filter search={search} setSearch={setSearch} />
          {drafts.length > 0 &&
            drafts.map((draft, index) => (
              <Draftcard draft={draft} key={index} />
            ))}
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
            <Search
              setSearch={setSearch}
              search={search}
              categories={categories}
            />
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
      `${API}/jobs?page=${page}&pageSize=5&fields=name,title,created,id`
    )
    data = await res.json()
  } catch (err) {
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

export default drafts
