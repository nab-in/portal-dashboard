import { useState, useEffect, useMemo } from "react"
import SubCategory from "./SubCategory"
import Input from "../inputs/Input"
import { API } from "../api"
import axios from "axios"
import { config } from "../config"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"
import styles from "./category.module.sass"
import { useAlertsDispatch } from "../../context/alerts"
import { useCategoriesDispatch } from "../../context/categories"
import checkSymbols, { checkChange } from "../checkSymbols"

const SubCategories = ({ categories, parent }) => {
  let { id, name } = parent
  const categoriesDispatch = useCategoriesDispatch()
  const dispatch = useAlertsDispatch()
  const [error, setError] = useState(null)
  const [category, setCategory] = useState([])
  let [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    name: "",
  })

  const handleChange = useMemo(() => {
    return (e) => {
      let { value } = e.target
      setFormData({ name: value })
      checkChange(formData.name, setError)
    }
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault()
    let body = {
      name: formData.name,
      parent: { id },
    }

    axios
      .post(`${API}/jobCategories`, body, config)
      .then((res) => {
        setLoading(false)
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: res.data.message,
          },
        })

        categoriesDispatch({
          type: "ADD_SUBCATEGORY",
          payload: {
            subcategory: res.data?.payload,
            id,
          },
        })
        setFormData({
          name: "",
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err?.response)
      })
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted)
      if (categories.length > 0) {
        let i = categories.filter((el) => {
          return id == el.id
        })
        setCategory(i[0])
      }
    return () => {
      isMounted = false
    }
  }, [parent, categories])

  checkSymbols(formData.name, setError)

  return (
    <div className={`card ${styles.card}`}>
      {name && (
        <p>
          <span>Category:</span> {name}
        </p>
      )}
      {category && category?.children?.length > 0 && (
        <>
          <div className={styles.showcase}>
            {category?.children.map((sub) => (
              <SubCategory sub={sub} key={sub.id} />
            ))}
          </div>
        </>
      )}
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          handleChange={(e) => handleChange(e)}
          placeholder="Add sub category"
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
  )
}

export default SubCategories
