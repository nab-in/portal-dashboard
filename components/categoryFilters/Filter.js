import { useEffect, useState } from "react"
import Categories from "./Categories"
import SubCategories from "./SubCategories"
import styles from "./filter.module.sass"

const Filter = ({ categories }) => {
  let [parent, setParent] = useState(null)

  useEffect(() => {
    if (categories)
      setParent(parent ? parent : categories.length > 0 ? categories[0] : {})
  }, [parent])

  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      <Categories categories={categories} setParent={setParent} />
      {parent && <SubCategories parent={parent} categories={categories} />}
    </div>
  )
}

export default Filter
