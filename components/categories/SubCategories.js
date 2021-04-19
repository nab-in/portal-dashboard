import React from "react"
import SubCategory from "./SubCategory"
import Input from "../inputs/Input"
import styles from "./category.module.sass"

const SubCategories = ({ categories, parent, selected, setSelected }) => {
  let { id, name } = parent
  let category
  if (categories.length > 0) category = categories.filter((el) => el.id == id)

  const handleChange = (e) => {}

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={`card ${styles.card}`}>
      <p>{name}</p>
      {category[0]?.sub_categories?.length > 0 && (
        <>
          <div className={styles.showcase}>
            {category[0].sub_categories.map((sub) => (
              <SubCategory
                sub={sub}
                key={sub.id}
                selected={selected}
                setSelected={setSelected}
                category={category[0]}
              />
            ))}
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <Input
              handleChange={(e) => handleChange(e)}
              placeholder="Add category"
              inputClass="form__control__filter"
            />
            <button className={`${styles.btn__primary} btn btn-primary`}>
              Add
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default SubCategories
