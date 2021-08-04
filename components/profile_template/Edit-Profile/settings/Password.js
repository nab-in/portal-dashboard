import { useState } from "react"
import Accordion from "./Accordion"
import Input from "../../../inputs/Input"
import Button from "../../../buttons/FormButton"
import styles from "./settings.module.sass"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../../../api"
import { useAlertsDispatch } from "../../../../context/alerts"

const Password = ({ details }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const dispatch = useAlertsDispatch()
  const handleSubmit = (e) => {
    e.preventDefault(e)
    const token = Cookies.get("token")
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .put(`${API}/users/${details?.id}`, formData, config)
      .then((res) => {
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: "Password updates successfully",
          },
        })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err?.response)
        setLoading(false)
      })
  }
  return (
    <Accordion title="Change Password">
      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <Input
          title="Enter your current email/username"
          handleChange={handleChange}
        />
        <Input
          type="password"
          title="Enter your current password"
          handleChange={handleChange}
        />
        <Input
          type="password"
          title="Enter New Password"
          handleChange={handleChange}
          name="password"
        />
        <Button text="Update" btnClass="btn-primary" loading={loading} />
      </form>
    </Accordion>
  )
}

export default Password
