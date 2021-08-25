import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"
import { useAuthDispatch } from "../../context/auth"
import styles from "./roles.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"

const Role = ({ role }) => {
  let { id, name } = role
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAuthDispatch()
  const alertsDispatch = useAlertsDispatch()
  const remove = () => {
    const token = Cookies.get("token")
    const config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .delete(`${API}/userRoles/${id}`, config)
      .then((res) => {
        dispatch({
          type: "REMOVE_ROLE",
          payload: id,
        })
        alertsDispatch({
          type: "ADD",
          payload: {
            message: "Item removed successfully",
            type: "success",
          },
        })
        setLoading(false)
        setOpen(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setOpen(false)
      })
  }
  const title = (
    <>
      Users with <span className={styles.name}>{name}</span> role will no longer
      have this role. Are you sure you want to continue?
    </>
  )
  return (
    <>
      <p key={id} className={styles.title}>
        <span>{name}</span>
        {(name != "SUPER USER" && name != "ADMIN") && (
          <FaTrash className={styles.icon} onClick={setOpen} />
        )}
      </p>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            setOpen={setOpen}
            action={remove}
            btnText="Delete"
            title={title}
          />
        </Modal>
      )}
    </>
  )
}

export default Role
