import React from "react"
import { AiOutlineClose } from "react-icons/ai"

const FilterItem = ({ sub, search, category, setSearch, url, setUrl }) => {
  let { name, id } = sub

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

  const removeCriteria = () => {
    //   categories copy
    let searchCopy = search?.categories

    // checking category index in categories array
    let categoryIndex = searchCopy?.findIndex((u) => u.id == category.id)

    // checking if subcategory exists
    let SubCategoryIndex = searchCopy[categoryIndex]?.sub_categories?.findIndex(
      (u) => u.id == id
    )

    if (SubCategoryIndex >= 0) {
      // removing sub category in sub categories array
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

        if (filterCategories?.length === 0) {
          setUrl(
            url.replace(
              url?.split("&")?.find((el) => el.includes("eq")),
              ``
            )
          )
        } else {
          setUrl(
            url.replace(
              url?.split("&")?.find((el) => el.includes("eq")),
              `filter=categories:eq:[${filterCategories}]`
            )
          )
        }
      }
      //   updating state with new categories
      setSearch({
        ...search,
        categories: searchCopy,
      })
    }
  }

  console.log(filterCategories, filterCategories.length, url)

  return (
    <span>
      {name}
      <span onClick={removeCriteria} className="close">
        <AiOutlineClose className="icon" />
      </span>
    </span>
  )
}

export default FilterItem
