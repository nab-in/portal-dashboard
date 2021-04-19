import React from "react"
import categories from "../../data/categories"
import Categories from "../categories/Categories"
import styles from "./filter.module.sass"

const Filter = () => {
  return (
    <div className={styles.card}>
      <h2>Select Parent Category</h2>
      {categories.length > 0 && <Categories categories={categories} />}
    </div>
  )
}

export default Filter
