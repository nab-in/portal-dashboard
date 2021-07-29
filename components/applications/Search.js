import { useState } from "react"
import styles from "./search.module.sass"
import Input from "../inputs/Input"
import rippleEffect from "../rippleEffect"

const Search = ({ setKeywords, keywords }) => {
  let [keyword, setKeyword] = useState("")
  const handleChange = (e) => {
    setKeyword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim() != "") {
      setKeywords(keywords.concat(keyword))
      setKeyword("")
    }
  }
  return (
    <div className={styles.search}>
      <h2>Filter</h2>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          handleChange={(e) => handleChange(e)}
          placeholder="Add criteria"
          inputClass="form__control__filter"
          //   name="name"
          value={keyword}
        />
        <button
          className={`${styles.btn__primary} btn btn-primary`}
          onClick={rippleEffect}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default Search
