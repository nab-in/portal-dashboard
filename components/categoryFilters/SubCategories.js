import { useState, useEffect, useCallback, useMemo } from "react"
import SubCategory from "./SubCategory"
import Input from "../inputs/Input"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"
import styles from "./category.module.sass"
import { useAlertsDispatch } from "../../context/alerts"

const SubCategories = ({ categories, parent, setcategories }) => {
  let { id, name } = parent
  const [category, setCategory] = useState([])
  let [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    name: "",
  })
  const dispatch = useAlertsDispatch()

  const handleChange = useMemo(() => {
    return (e) => {
      let { value } = e.target
      setFormData({ name: value })
    }
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault()

    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    let body = {
      name: formData.name,
      parent: { id },
    }
    setLoading(true)
    let categoriesCopy = categories

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

        let categoryIndex = categories.findIndex((el) => el.id == category?.id)

        if (categoriesCopy[categoryIndex]?.children?.length > 0) {
          categoriesCopy[categoryIndex] = {
            ...categoriesCopy[categoryIndex],
            children: categoriesCopy[categoryIndex].children.concat(
              res.data.payload
            ),
          }
          // setcategories(categoriesCopy)
        } else {
          categoriesCopy[categoryIndex] = {
            ...categoriesCopy[categoryIndex],
            children: [res.data.payload],
          }
          // setcategories(categoriesCopy)
        }

        let index = categoriesCopy.findIndex((el) => el.id == category?.id)

        categoriesCopy[categoryIndex] = categories[index]

        // setCategory(categoriesCopy[index])
        setFormData({
          name: "",
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
    setcategories(categoriesCopy)
  }

  useEffect(() => {
    console.log("here")
    if (categories.length > 0) {
      let i = categories.filter((el) => {
        return id == el.id
      })
      setCategory(i[0])
    }
  }, [parent, categories])

  console.log(categories)

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
    </div>
  )
}

export default SubCategories
