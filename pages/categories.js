import { useEffect } from "react"
import axios from "axios"
import { API } from "../components/api"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Filter from "../components/categoryFilters/Filter"
import Categories from "../components/category/Categories"
import {
  useCategoriesDispatch,
  useCategoriesState,
} from "../context/categories"

const categories = () => {
  const { categories, loading } = useCategoriesState()
  const dispatch = useCategoriesDispatch()

  useEffect(() => {
    if (categories?.length == 0) {
      axios
        .get(
          `${API}/jobCategories?pageSize=200&fields=id,name,children[id, name],verified`
        )
        .then((res) => {
          dispatch({
            type: "LOAD",
            payload: res.data?.jobCategories,
          })
        })
        .catch((err) => {
          console.log(err)
          dispatch({
            type: "PROCESS FAILED",
          })
        })
    }
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
              {categories.length > 0 ? (
                <Categories />
              ) : (
                <p
                  style={{
                    background: "white",
                    padding: "1rem",
                  }}
                >
                  No category found
                </p>
              )}
            </>
          )}
        </MainContents>
        <SubContents>
          {loading ? <></> : <Filter categories={categories} />}
        </SubContents>
      </div>
    </div>
  )
}

export default categories
