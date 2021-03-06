import { useEffect, useState } from "react"
import Categories from "./Categories"
import SubCategories from "./SubCategories"
import styles from "./filter.module.sass"

const Filter = ({ categories }) => {
  let [parent, setParent] = useState(null)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (categories)
        if (parent) {
          let check = categories?.filter((el) => el.id == parent.id)
          setParent(
            check.length > 0
              ? parent
              : categories.length > 0
              ? categories[0]
              : {}
          )
        } else if (categories?.length > 0) {
          setParent(categories[0])
        } else {
          setParent({})
        }
    }
    return () => {
      isMounted = false
    }
  }, [categories])

  return (
    <div className={styles.card}>
      <h2>Add Job Category</h2>
      <Categories categories={categories} setParent={setParent} />
      {parent && <SubCategories parent={parent} categories={categories} />}
    </div>
  )
}

export default Filter
