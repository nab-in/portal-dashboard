import { useState } from "react"
import styles from "./categories.module.sass"
import Action from "../actions/Action"
import Modal from "../modal/Modal"
import { config } from "../config"
import { API } from "../api"
import axios from "axios"
import { useAlertsDispatch } from "../../context/alerts"
import { useCategoriesDispatch } from "../../context/categories"

const SubCategory = ({ name, id, verified, parent }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const dispatch = useAlertsDispatch()
  const categoriesDispatch = useCategoriesDispatch()

  const deleteCategory = () => {
    setLoading(true)
    axios
      .delete(`${API}/jobCategories/${id}`, config)
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
            type: "child",
            id,
            parent,
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
    if (verified === "true") {
      let body = {
        verified: false,
      }
      setLoading(true)
      axios
        .put(`${API}/jobCategories/${id}`, body, config)
        .then((res) => {
          setLoading(false)
          setVerifyOpen(false)
          categoriesDispatch({
            type: "TOGGLE_VERIFY",
            payload: {
              category: res?.data?.payload,
              parent,
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
        .put(`${API}/jobCategories/${id}`, body, config)
        .then((res) => {
          console.log(res.data)
          setLoading(false)
          setVerifyOpen(false)
          categoriesDispatch({
            type: "TOGGLE_VERIFY",
            payload: {
              category: res?.data?.payload,
              parent,
            },
          })
        })
        .catch((err) => {
          console.log(err?.response)
          setLoading(false)
          setVerifyOpen(false)
        })
    }
  }

  return (
    <article>
      {name}
      <div className={styles.sub_actions}>
        <button
          className={
            verified === "true" ? "badge verified" : "badge unverified"
          }
          onClick={setVerifyOpen}
        >
          {verified === "true" ? "Unverify" : "Verify"}
        </button>
        <button
          className={`${styles.btn} btn btn-primary`}
          onClick={() => setOpen(true)}
        >
          Delete
        </button>
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            setOpen={setOpen}
            title={`Are you sure you want to delete ${name}?`}
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
              verified === "true" ? `Unverify ${name}?` : `Verify ${name}?`
            }
            action={verify}
            loading={loading}
            btnText={verified === "true" ? "Unverify" : "Verify"}
          />
        </Modal>
      )}
    </article>
  )
}

export default SubCategory
