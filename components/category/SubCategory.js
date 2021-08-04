import { useState } from "react"
import styles from "./categories.module.sass"
import { GoVerified } from "react-icons/go"
import Action from "../actions/Action"
import Modal from "../modal/Modal"
import { API } from "../api"
import axios from "axios"
import Cookies from "js-cookie"
import { useAlertsDispatch } from "../../context/alerts"
import { useCategoriesDispatch } from "../../context/categories"

let verified = true
const SubCategory = ({ name, id, parent }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAlertsDispatch()
  const categoriesDispatch = useCategoriesDispatch()

  const deleteCategory = () => {
    setLoading(true)
    const token = Cookies.get("token")
    const config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
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

  const verify = () => {}
  return (
    <article>
      {name}
      <div className={styles.sub_actions}>
        <button
          className={verified ? "badge verified" : "badge unverified"}
          onClick={verify}
        >
          Verify {verified && <GoVerified className="icon" />}
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
    </article>
  )
}

export default SubCategory
