import { useState } from "react"
import SubCategory from "./SubCategory"
import Input from "../inputs/Input"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"
import styles from "./category.module.sass"
import { useAlertsDispatch } from "../../context/alerts"

const SubCategories = ({ categories, parent }) => {
  let { id, name } = parent
  let category
  if (categories.length > 0) category = categories.filter((el) => el.id == id)
  let [loading, setLoading] = useState(false)
  let [formData, setFormData] = useState({
    name: "",
  })
  const dispatch = useAlertsDispatch()

  const handleChange = (e) => {
    let { value } = e.target
    setFormData({ name: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
    console.log(body)
    setLoading(true)
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
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  return (
    <div className={`card ${styles.card}`}>
      <p>
        <span>Category:</span> {name}
      </p>
      {category && category[0]?.children?.length > 0 && (
        <>
          <div className={styles.showcase}>
            {category[0].children.map((sub) => (
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
