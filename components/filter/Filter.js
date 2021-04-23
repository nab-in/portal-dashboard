import React, { useState } from "react"
import categories from "../../data/categories"
import Categories from "../categories/Categories"
import SubCategories from "../categories/SubCategories"
import styles from "./filter.module.sass"

const Filter = () => {
  let [parent, setParent] = useState(categories.length > 0 && categories[0])
  let [selected, setSelected] = useState([])
  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      {categories.length > 0 && (
        <Categories
          categories={categories}
          setParent={setParent}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      <SubCategories
        parent={parent}
        categories={categories}
        setSelected={setSelected}
        selected={selected}
      />
    </div>
  )
}

export default Filter
