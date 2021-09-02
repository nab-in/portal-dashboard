import { useState } from "react"
import {
  useCategoriesDispatch,
  useCategoriesState,
} from "../../context/categories"
import styles from "./categories.module.sass"
import SubCategory from "./SubCategory"
import Accordion from "../accordion/Accordion"
import Action from "../actions/Action"
import Modal from "../modal/Modal"
import { API } from "../api"
import { config } from "../config"
import axios from "axios"
import { useAlertsDispatch } from "../../context/alerts"

let verified = false

const Category = ({ category }) => {
  const { categories } = useCategoriesState()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAlertsDispatch()
  const categoriesDispatch = useCategoriesDispatch()

  const deleteCategory = () => {
    setLoading(true)
    axios
      .delete(`${API}/jobCategories/${category?.id}`, config)
      .then((res) => {
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: res.data?.message,
          },
        })
        categoriesDispatch({
          type: "REMOVE",
          payload: {
            type: "parent",
            id: category?.id,
          },
        })
        setOpen(false)
        setLoading(false)
      })
      .catch((err) => {
        setOpen(false)
        setLoading(false)
        if (err.response?.data)
          dispatch({
            type: "ADD",
            payload: {
              type: "danger",
              message:
                "Please delete all the subcategories before deleting this category",
            },
          })
        if (err?.message == "Network Error")
          dispatch({
            type: "danger",
            payload: { type: "danger", message: "Network Error" },
          })
      })
  }

  const verify = () => {}

  return (
    <div className={styles.category}>
      <Accordion
        title={category?.name}
        key={category?.id}
        categories={categories}
      >
        <div className={styles.actions}>
          <button
            className={verified ? "badge verified" : "badge unverified"}
            onClick={verify}
          >
            {verified ? <>Unverify</> : "Verify"}
          </button>
          <button
            className={`${styles.btn} btn btn-primary`}
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
        </div>
        {category?.children?.length > 0 &&
          category.children.map(({ id, name }) => (
            <SubCategory key={id} name={name} id={id} parent={category?.id} />
          ))}
      </Accordion>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            setOpen={setOpen}
            title={`Are you sure you want to delete ${category.name}?`}
            action={deleteCategory}
            loading={loading}
            btnText="Delete"
          />
        </Modal>
      )}
    </div>
  )
}

export default Category
