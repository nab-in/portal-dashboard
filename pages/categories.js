import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../components/api"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Filter from "../components/categoryFilters/Filter"
import Categories from "../components/category/Categories"

const categories = () => {
  let [categories, setcategories] = useState([])
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    let data = []
    let filter = []
    axios
      .get(
        `${API}/jobCategories?pageSize=200&fields=id,name,children[id, name]`
      )
      .then((res) => {
        data = res.data?.jobCategories
        data.forEach((el) => {
          if (el.children) filter = filter.concat(el.children)
        })
        filter.forEach((el) => {
          data = data.filter((o) => o.id != el.id)
        })
        setcategories(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    console.log(data)
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
          {loading ? (
            <></>
          ) : (
            <>
              {categories.length > 0 && (
                <Categories
                  categories={categories}
                  setcategories={setcategories}
                />
              )}
            </>
          )}
        </MainContents>
        <SubContents>
          {loading ? (
            <></>
          ) : (
            <Filter categories={categories} setcategories={setcategories} />
          )}
        </SubContents>
      </div>
    </div>
  )
}

export default categories
