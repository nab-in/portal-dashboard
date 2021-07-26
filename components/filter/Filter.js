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
        console.log(data)
        setcategories(data)
      })
      .catch((err) => {
        console.log(err)
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
