import React, { useState, useEffect } from "react"
import styles from "./sub.module.sass"

const SubCategory = ({
  sub,
  selected,
  setSelected,
  category,
  categories,
  setCategories,
}) => {
  let [checked, setChecked] = useState(false)
  let { name, id } = sub
  let subCategoryIndex
  let selectCopy = selected

  let selectedCopy = categories

  let selectedcategoryIndex = selectedCopy?.findIndex(
    (u) => u.id == category.id
  )

  let selectedsubcategoryIndex = selectedCopy?.findIndex((u) => u.id == id)

  // checking if category exists in selected state
  let categoryIndex = selectCopy?.findIndex((u) => u.id == category.id)

  // searching if sub category exists in the category
  if (categoryIndex >= 0) {
    subCategoryIndex = selectCopy[categoryIndex].sub_categories?.findIndex(
      (u) => u.id == id
    )
  }

  // toggling sub category
  const toggleSubCategory = () => {
    // if category exists this run
    if (selectedsubcategoryIndex >= 0)
      selectedCopy = selectedCopy.filter((u) => u.id != id)

    if (categoryIndex >= 0) {
      if (subCategoryIndex >= 0) {
        // remove sub_category function goes here
        selectCopy[categoryIndex].sub_categories = selectCopy[
          categoryIndex
        ].sub_categories.filter((el) => el.id !== id)

        //   removing category in categories array
        if (selectCopy[categoryIndex].sub_categories.length === 0) {
          selectCopy = selectCopy.filter((el) => el.id != category.id)
          if (selectedcategoryIndex >= 0)
            selectedCopy = selectedCopy.filter((u) => u.id != category.id)
        }

        //   updating state with new categories
        setSelected(selectCopy)
        setCategories(selectedCopy)

        // uncheck the checkbox
        setChecked(false)
      }

      // if sub_category does not exists this run
      if (subCategoryIndex === -1) {
        selectCopy[categoryIndex] = {
          ...selectCopy[categoryIndex],

          sub_categories: selectCopy[categoryIndex].sub_categories.concat(sub),
        }

        setSelected(selectCopy)
        setChecked(true)
      }
    }

    if (selectedsubcategoryIndex === -1) {
      setCategories(
        selectedCopy.concat({
          id,
          name,
        })
      )
      if (selectedcategoryIndex === -1) {
        setCategories(
          selectedCopy.concat(
            {
              id: category.id,
              name: category.name,
            },
            {
              id,
              name,
            }
          )
        )
      }
    }

    // if category do not exist in selected
    if (categoryIndex === -1) {
      setSelected(
        selectCopy.concat({
          id: category.id,
          name: category.name,
          sub_categories: [sub],
        })
      )

      setChecked(true)
    }
  }

  useEffect(() => {
    // updating UI when subcategory is removed from filter criteria
    if (subCategoryIndex === -1 || subCategoryIndex === undefined) {
      setChecked(false)
    } else if (subCategoryIndex >= 0) {
      setChecked(true)
    }
  }, [selected])

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
