import { useState, useEffect } from "react"
import { API } from "../api"
import axios from "axios"
import Categories from "../categories/Categories"
import SubCategories from "../categories/SubCategories"
import styles from "./filter.module.sass"
import {
  useCategoriesDispatch,
  useCategoriesState,
} from "../../context/categories"

const Filter = ({
  selected,
  setSelected,
  selectedCategories,
  setCategories,
}) => {
  const { categories } = useCategoriesState()
  let [parent, setParent] = useState(
    categories?.length > 0 ? categories[0] : {}
  )
  const dispatch = useCategoriesDispatch()

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
    if (categories > 0) {
      setParent(categories?.length > 0 && categories[0])
    }
  }, [])
  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      <Categories categories={categories} setParent={setParent} />
      <SubCategories
        parent={parent}
        categories={categories}
        setSelected={setSelected}
        selected={selected}
        selectedCategories={selectedCategories}
        setCategories={setCategories}
      />
    </div>
  )
}

export default Filter
