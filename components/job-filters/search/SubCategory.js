import { useEffect, useState } from "react"
import styles from "./sub_category.module.sass"

const SubCategory = ({ sub, setSearch, search, category, url, setUrl }) => {
  let { name, id } = sub //sub category destructuring
  let [urlCopy, setUrlCopy] = useState("")
  let [checked, setChecked] = useState(false)

  let searchCopy = search?.categories
  // checking if category exists in search state
  let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)

  let subCategoryIndex

  // searching if sub category exists in the category
  if (categoryIndex >= 0) {
    subCategoryIndex = searchCopy[categoryIndex].sub_categories?.findIndex(
      (u) => u.id == id
    )
  }

  // working on search url
  let urlBreak = url?.split("&")

  let categoriesArray = []

  let filterCategories = []

  let categoriesStr = urlBreak?.find((el) => {
    return el.includes("categories")
  })

  if (categoriesStr) {
    categoriesArray = categoriesStr?.split(":")
    categoriesArray = categoriesArray[categoriesArray?.length - 1]
    categoriesArray = categoriesArray?.split("[")
    categoriesArray = categoriesArray[1]?.split("]")
    if (categoriesArray[0]?.length > 1) {
      categoriesArray = categoriesArray[0]?.split(",")
    }
    filterCategories = categoriesArray
  }

  // toggling sub category
  const toggleSubCategory = () => {
    // if category exists this run
    if (categoryIndex >= 0) {
      if (subCategoryIndex >= 0) {
        // remove sub_category function goes here
        searchCopy[categoryIndex].sub_categories = searchCopy[
          categoryIndex
        ].sub_categories.filter((el) => el.id !== id)

        filterCategories = filterCategories.filter((el) => {
          return el !== id
        })

        setUrl(
          url.replace(
            url?.split("&")?.find((el) => el.includes("eq")),
            `filter=categories:eq:[${filterCategories}]`
          )
        )

        //   removing category in categories array
        if (searchCopy[categoryIndex].sub_categories.length === 0) {
          searchCopy = searchCopy.filter((el) => el.id != category.id)
          filterCategories = filterCategories.filter((el) => {
            return el !== category?.id
          })
          setUrl(
            url.replace(
              url?.split("&")?.find((el) => el.includes("eq")),
              `filter=categories:eq:[${filterCategories}]`
            )
          )
          if (filterCategories?.length < 1) {
            setUrl(
              url.replace(
                url?.split("&")?.find((el) => el.includes("eq")),
                ``
              )
            )
          }
        }

        //   updating state with new categories
        setSearch({
          ...search,
          categories: searchCopy,
        })

        // uncheck the checkbox
        setChecked(false)
      }

      // if sub_category does not exists this run
      if (subCategoryIndex === -1) {
        searchCopy[categoryIndex] = {
          ...searchCopy[categoryIndex],

          sub_categories: searchCopy[categoryIndex].sub_categories.concat(sub),
        }

        // setUrl(url + `&filter=categories:eq:[${filterCategories.push(id)}]`)
        filterCategories.push(id)
        setUrl(
          url.replace(
            url?.split("&")?.find((el) => el.includes("eq")),
            `filter=categories:eq:[${filterCategories}]`
          )
        )

        setSearch({
          ...search,
          categories: searchCopy,
        })
        setChecked(true)
      }
    }

    // if categories do not exist in search
    if (categoryIndex === -1) {
      setSearch({
        ...search,
        categories: searchCopy.concat({
          id: category.id,
          name: category.name,
          sub_categories: [sub],
        }),
      })
      filterCategories.push(id)
      filterCategories.push(category?.id)
      setChecked(true)
      if (categoriesStr) {
        setUrl(
          url.replace(
            url?.split("&")?.find((el) => el.includes("eq")),
            `filter=categories:eq:[${filterCategories}]`
          )
        )
      } else {
        setUrl(url + `&filter=categories:eq:[${filterCategories}]`)
      }
    }
  }

  // console.log(filterCategories)

  useEffect(() => {
    // updating UI when subcategory is removed from filter criteria
    if (subCategoryIndex === -1 || subCategoryIndex === undefined) {
      setChecked(false)
    }
  }, [search])

  return (
    <div
      onClick={toggleSubCategory}
      className={
        checked
          ? `${styles.sub__category} ${styles.checked}`
          : `${styles.sub__category}`
      }
    >
      <div className={styles.label}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 25">
          <path
            strokeLinecap="round"
            strokeMiterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          />
        </svg>
        <span> {name}</span>
      </div>
    </div>
  )
}

export default SubCategory
