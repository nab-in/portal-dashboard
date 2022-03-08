import { useState } from "react"
import styles from "./search.module.sass"
import Input from "../inputs/Input"
import rippleEffect from "../rippleEffect"

const Search = ({ setKeyword }) => {
  let [name, setName] = useState("")
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() != "") {
      setKeyword(name)
      setName("")
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
          value={name}
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
