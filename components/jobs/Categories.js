import React from "react"
import Filter from "../filter/Filter"

const Categories = ({
  categories,
  setCategories,
  job,
  selected,
  setSelected,
}) => {
  return (
    <div>
      <Filter
        categories={categories}
        setCategories={setCategories}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}

export default Categories
