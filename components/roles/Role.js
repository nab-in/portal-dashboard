import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"
import { useAuthDispatch } from "../../context/auth"
import styles from "./roles.module.sass"

const Role = ({ role }) => {
  let { id, name } = role
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
            message: res.data.message,
            type: "success",
          },
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <p key={id}>
      <span>{name}</span>
      {name != "Super User" && (
        <FaTrash className={styles.icon} onClick={remove} />
      )}
    </p>
  )
}

export default Role
