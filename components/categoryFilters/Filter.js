import { useEffect, useState } from "react"
import Categories from "./Categories"
import SubCategories from "./SubCategories"
import styles from "./filter.module.sass"

const Filter = ({ categories, setcategories }) => {
  let [parent, setParent] = useState(null)

  useEffect(() => {
    if (categories)
      setParent(parent ? parent : categories.length > 0 ? categories[0] : {})
  }, [parent])

  // useEffect(() => {
  //   // console.log("here")
  // }, [categories])

  // console.log(categories, setcategories)

  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      <Categories
        categories={categories}
        setcategories={setcategories}
        setParent={setParent}
      />
      {parent && (
        <SubCategories
          parent={parent}
          categories={categories}
          setcategories={setcategories}
        />
      )}
    </div>
  )
}

export default Filter
