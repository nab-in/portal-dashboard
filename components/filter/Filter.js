import React, { useState } from "react"
import categories from "../../data/categories"
import Categories from "../categories/Categories"
import SubCategories from "../categories/SubCategories"
import styles from "./filter.module.sass"

const Filter = ({
  selected,
  setSelected,
  selectedCategories,
  setCategories,
}) => {
  let [parent, setParent] = useState(categories.length > 0 && categories[0])

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
        selectedCategories={selectedCategories}
        setCategories={setCategories}
      />
    </div>
  )
}

export default Filter
