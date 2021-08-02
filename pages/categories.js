import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { API } from "../components/api"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Filter from "../components/categoryFilters/Filter"
import Categories from "../components/category/Categories"
// import Pagination from "../components/pagination/Pagination"

const categories = () => {
  let [categories, setcategories] = useState([])
  let router = useRouter()
  let page = router.query?.page ? router.query.page : 1
  useEffect(() => {
    axios
      .get(
        `${API}/jobCategories?pageSize=100&page=${page}&fields=id,name,children[id, name]`
      )
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
        setcategories(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Categories</span>
          </div>
          <Categories categories={categories} setcategories={setcategories} />
        </MainContents>
        <SubContents>
          <Filter categories={categories} setcategories={setcategories} />
        </SubContents>
      </div>
    </div>
  )
}

export default categories
