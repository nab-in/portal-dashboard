import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import SubCategory from "./SubCategory"
import UseClickOutside from "../../UseClickOutside"
import styles from "./category.module.sass"

const Category = ({ category, search, setSearch }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  let { name, children, id } = category
  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = UseClickOutside(() => {
    setOpenDropdown(false)
  })
  return (
    <>
      {children?.length > 0 && (
        <div ref={node} className={styles.category}>
          <button onClick={open}>
            {name}{" "}
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
            {children.map((sub) => (
              <SubCategory
                key={sub.id}
                sub={sub}
                search={search}
                setSearch={setSearch}
                category={category}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Category
