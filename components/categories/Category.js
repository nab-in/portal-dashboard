import React, { useEffect, useState } from "react"
import styles from "./category.module.sass"

const Category = ({
  category,
  setParent,
  setOpenDropdown,
  selected,
  setSelected,
}) => {
  let { name } = category

  const toggleCategory = () => {
    setParent(category)
    setOpenDropdown(false)
  }

  return (
    <div onClick={toggleCategory} className={`${styles.sub__category} `}>
      <div className={styles.label}>
        <span> {name}</span>
      </div>
    </div>
  )
}

export default Category
