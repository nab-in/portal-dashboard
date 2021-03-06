import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import Category from "./Category"
import Input from "../inputs/Input"
import { API } from "../api"
import axios from "axios"
import { config } from "../config"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"
import styles from "./category.module.sass"
import { useAlertsDispatch } from "../../context/alerts"
import useClickOutside from "../UseClickOutside"
import {
  useCategoriesDispatch,
  useCategoriesState,
} from "../../context/categories"
import checkSymbols, { checkChange } from "../checkSymbols"

// filter dropdown component per each category
const Categories = ({ setParent }) => {
  let [openDropdown, setOpenDropdown] = useState(false)
  let [loading, setLoading] = useState(false)
  const { categories } = useCategoriesState()
  let [formData, setFormData] = useState({
    name: "",
  })
  const [error, setError] = useState(null)
  const dispatch = useAlertsDispatch()
  const categoriesDispatch = useCategoriesDispatch()

  const open = () => {
    setOpenDropdown(!openDropdown)
  }

  // check if outside is clicked
  let node = useClickOutside(() => {
    setOpenDropdown(false)
  })

  const handleChange = (e) => {
    let { value } = e.target
    setFormData({ name: value })
    checkChange(formData.name, setError)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!error) {
      setLoading(true)
      axios
        .post(`${API}/jobCategories`, formData, config)
        .then((res) => {
          setLoading(false)
          dispatch({
            type: "ADD",
            payload: {
              type: "success",
              message: res.data?.message,
            },
          })
          categoriesDispatch({
            type: "ADD_CATEGORY",
            payload: res.data?.payload,
          })
          setFormData({
            name: "",
          })
        })
        .catch((err) => {
          setLoading(false)
          // console.log(err)
          dispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message: err?.data?.message,
            },
          })
        })
    }
  }

  checkSymbols(formData.name, setError)

  return (
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
        {categories?.map((category) => (
          <Category
            key={category.id}
            category={category}
            setParent={setParent}
            setOpenDropdown={setOpenDropdown}
          />
        ))}
        <div>
          <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
            <Input
              handleChange={(e) => handleChange(e)}
              placeholder="Add category"
              inputClass="form__control__filter"
              name="name"
              value={formData.name}
            />
            <button
              className={`${styles.btn__primary} btn btn-primary`}
              onClick={rippleEffect}
            >
              {loading ? <Loader /> : "Add"}
            </button>
          </form>
          {error && <p className={`alerts ${error.type}`}>{error.msg}</p>}
        </div>
      </div>
    </div>
  )
}

export default Categories
