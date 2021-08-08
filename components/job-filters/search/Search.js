import { useEffect } from "react"
import axios from "axios"
import { API } from "../../api"
import {
  useCategoriesDispatch,
  useCategoriesState,
} from "../../../context/categories"
import Input from "../../inputs/Input"
import Category from "./Category"
import styles from "./search.module.sass"

const Search = ({ setSearch, search, setUrl, url }) => {
  const { categories } = useCategoriesState()
  const dispatch = useCategoriesDispatch()

  // working on search url
  let urlBreak = url?.split("&")

  let inputArr = urlBreak?.filter((el) => {
    return el.includes("ilike")
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    setSearch({ ...search, [name]: value })
    let input = inputArr.find((el) => el.includes(name))
    if (value.trim().length > 0 && input) {
      setUrl(
        url.replace(
          url?.split("&")?.find((el) => el.includes(name)),
          `filter=${[name]}:ilike:${value}`
        )
      )
    } else if (value.trim().length > 0 && !input) {
      setUrl(url + `&filter=${[name]}:ilike:${value}`)
    } else if (value.trim().length == 0 && input) {
      setUrl(
        url.replace(
          url?.split("&")?.find((el) => el.includes(name)),
          ``
        )
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (categories?.length == 0) {
      axios
        .get(
          `${API}/jobCategories?pageSize=200&fields=id,name,children[id, name]`
        )
        .then((res) => {
          dispatch({
            type: "LOAD",
            payload: res.data?.jobCategories,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  return (
    <div className={styles.search}>
      <h2>Filter By</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Input
            handleChange={(e) => handleChange(e)}
            placeholder="Keyword"
            inputClass="filter_input"
            name="name"
            value={search.keyword}
          />
          <Input
            handleChange={(e) => handleChange(e)}
            inputClass="filter_input"
            name="location"
            placeholder="Location"
            value={search.location}
          />
        </div>
        {categories?.length > 0 && (
          <div>
            {categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                search={search}
                setSearch={setSearch}
                url={url}
                setUrl={setUrl}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default Search
