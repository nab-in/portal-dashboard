import React, { useState, useRef, useEffect } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Category from "./Category"
import Input from "../inputs/Input"
import styles from "./category.module.sass"

// detect outside click hook
let useClickOutside = (handler) => {
  let node = useRef()
  useEffect(() => {
    let handle = (e) => {
      if (!node.current.contains(e.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
    }
  })
  return node
}

const handleChange = (e) => {}

const handleSubmit = (e) => {
  e.preventDefault()
}

// filter dropdown component per each category
const Categories = ({ categories }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  // let { name, sub_categories, id } = category
  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = useClickOutside(() => {
    setOpenDropdown(false)
  })

  return (
    <>
      {/* {sub_categories.length > 0 && ( */}
      <div className={styles.category} ref={node}>
        <button onClick={open}>
          Select Parent Category{" "}
          {openDropdown ? (
            <FaChevronUp className={styles.icon} />
          ) : (
            <FaChevronDown className={styles.icon} />
          )}
        </button>
        <div
          className={
            openDropdown
              ? `${styles.open} ${styles.dropdown}`
              : `${styles.dropdown}`
          }
        >
          {categories.map((category) => (
            <Category key={category.id} category={category} />
          ))}
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input
                handleChange={handleChange}
                placeholder="Add category"
                inputClass="form__control__filter"
              />
              <button className={`${styles.btn__primary} btn btn-primary`}>
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}

export default Categories
