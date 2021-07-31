import React from "react"
import { AiOutlineClose } from "react-icons/ai"

const FilterItem = ({ sub, search, category, setSearch, styles }) => {
  let { name, id } = sub
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

      //   removing category in categories array
      if (searchCopy[categoryIndex].sub_categories.length === 0)
        searchCopy = searchCopy.filter((el) => el.id != category.id)
      //   updating state with new categories
      setSearch({
        ...search,
        categories: searchCopy,
      })
    }
  }
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
