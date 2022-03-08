import { useEffect, useState } from "react"
import styles from "./roles.module.sass"
import Input from "../inputs/Input"
import rippleEffect from "../rippleEffect"
import Loader from "../loaders/ButtonLoader"
import Role from "./Role"
import axios from "axios"
import { config } from "../config"
import { API } from "../api"
import { useAlertsDispatch } from "../../context/alerts"
import { useAuthDispatch, useAuthState } from "../../context/auth"

const Roles = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  // })
  // const [loading, setLoading] = useState(true)
  // const [addLoading, setAddLoading] = useState(false)
  const dispatch = useAuthDispatch()
  // const alertsDispatch = useAlertsDispatch()
  const { roles } = useAuthState()
  // const { name } = formData
  // const handleChange = (e) => {
  //   setFormData({ name: e.target.value })
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const token = Cookies.get("token")
  //   const config = {
  //     headers: {
  //       authorization: `Bearer ` + token,
  //     },
  //   }
  //   setAddLoading(true)
  //   axios
  //     .post(`${API}/userRoles`, formData, config)
  //     .then((res) => {
  //       dispatch({
  //         type: "ADD_ROLE",
  //         payload: res.data.payload,
  //       })
  //       alertsDispatch({
  //         type: "ADD",
  //         payload: {
  //           message: res.data.message,
  //           type: "success",
  //         },
  //       })
  //       setAddLoading(false)
  //       setFormData({
  //         name: "",
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setAddLoading(false)
  //     })
  // }
  useEffect(() => {
    let isMounted = true
    if (isMounted)
      if (roles.length == 0) {
        axios
          .get(`${API}/userRoles`, config)
          .then((res) => {
            dispatch({
              type: "ROLES",
              payload: res.data?.userRoles,
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <div className={styles.roles}>
      <h2>Admin Roles</h2>
      {roles?.length > 0 &&
        roles.map((role) => <Role key={role.id} role={role} />)}
      {/* <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          handleChange={(e) => handleChange(e)}
          placeholder="New role"
          inputClass="form__control__filter"
          name="name"
          value={name}
        />
        <button
          className={`${styles.btn__primary} btn btn-primary`}
          onClick={rippleEffect}
        >
          {addLoading ? <Loader /> : "Add"}
        </button>
      </form> */}
    </div>
  )
}

export default Roles
