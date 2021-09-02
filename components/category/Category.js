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

const Category = ({ category }) => {
  const { categories } = useCategoriesState()
  const [open, setOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
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

  const verify = () => {
    if (category?.verified === "true") {
      let body = {
        verified: false,
      }
      setLoading(true)
      axios
        .put(`${API}/jobCategories/${category?.id}`, body, config)
        .then((res) => {
          setLoading(false)
          setVerifyOpen(false)
          categoriesDispatch({
            type: "TOGGLE_VERIFY",
            payload: {
              category: res?.data?.payload,
            },
          })
        })
        .catch((err) => {
          setLoading(false)
          setVerifyOpen(false)
        })
    } else {
      let body = {
        verified: true,
      }
      setLoading(true)

      axios
        .put(`${API}/jobCategories/${category?.id}`, body, config)
        .then((res) => {
          setLoading(false)
          setVerifyOpen(false)
          categoriesDispatch({
            type: "TOGGLE_VERIFY",
            payload: {
              category: res?.data?.payload,
            },
          })
        })
        .catch((err) => {
          setLoading(false)
          setVerifyOpen(false)
        })
    }
  }
  return (
    <div className={styles.category}>
      <Accordion
        title={category?.name}
        key={category?.id}
        categories={categories}
      >
        <div className={styles.actions}>
          <button
            className={
              category?.verified === "true"
                ? "badge verified"
                : "badge unverified"
            }
            onClick={() => setVerifyOpen(true)}
          >
            {category?.verified === "true" ? "Unverify" : "Verify"}
          </button>
          <button
            className={`${styles.btn} btn btn-primary`}
            onClick={() => setOpen(true)}
          >
            Delete
          </button>
        </div>
        {category?.children?.length > 0 &&
          category.children.map(({ id, name, verified }) => (
            <SubCategory
              key={id}
              name={name}
              id={id}
              verified={verified}
              parent={category?.id}
            />
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
      {verifyOpen && (
        <Modal setOpen={setVerifyOpen}>
          <Action
            setOpen={setVerifyOpen}
            title={
              category?.verified === "true"
                ? `Unverify ${category.name}?`
                : `Verify ${category.name}?`
            }
            action={verify}
            loading={loading}
            btnText={category?.verified === "true" ? "Unverify" : "Verify"}
          />
        </Modal>
      )}
    </div>
  )
}

export default Category
