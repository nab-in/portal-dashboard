import { useState, useEffect } from "react"
import { API } from "../api"
import axios from "axios"
import Categories from "../categories/Categories"
import SubCategories from "../categories/SubCategories"
import styles from "./filter.module.sass"

const Filter = ({
  selected,
  setSelected,
  selectedCategories,
  setCategories,
}) => {
  let [categories, setcategories] = useState([])
  let [parent, setParent] = useState(categories.length > 0 && categories[0])
  useEffect(() => {
    axios
      .get(`${API}/jobCategories?fields=id,name,children[id, name]`)
      .then((res) => {
        console.log(res.data)
        setcategories(res.data?.jobCategories)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }, [])
  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      <Categories
        categories={categories}
        setParent={setParent}
        setSelected={setSelected}
        selected={selected}
      />
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
