import { useState } from "react"
import { useRouter } from "next/router"
import Input from "../components/inputs/Input"
import FormButton from "../components/buttons/FormButton"
import styles from "../styles/login.module.sass"
import axios from "axios"
import { useAuthDispatch } from "../context/auth"
import { API } from "../components/api"

const Login = () => {
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    axios
      .post(`${API}/login`, formData)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        })
        setLoading(false)
        window.href = "/select_identity"
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response) {
          setErrors({
            type: "danger",
            msg: err?.response?.data?.message,
          })
        } else if (err?.message) {
          if (err?.code === "ECONNREFUSED") {
            setErrors({
              type: "danger",
              msg: "Failed to connect, please try again",
            })
          } else {
            setErrors({
              type: "danger",
              msg: err.message,
            })
          }
        } else {
          setErrors({
            type: "danger",
            msg: "Internal server error, please try again",
          })
        }
      })
  }

  return (
    <div className={`${styles.auth} ${styles.login}`}>
      <div className={`${styles.container}`}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.logo}>
            <img src="/assets/images/logo.png" alt="logo" loading="lazy" />
          </div>
          <h1>You are not logged in, Login to your account</h1>
          <Input
            type="text"
            name="username"
            handleChange={handleChange}
            id="username"
            title="Username/Email:"
            error={errors.username && errors.username}
          />
          <Input
            type="password"
            name="password"
            handleChange={handleChange}
            id="password"
            title="Password:"
          />
          {errors.msg && (
            <p className={`alerts ${errors.type}`}>{errors.msg}</p>
          )}
          <div className={styles.btns}>
            <FormButton text="Login" btnClass="btn-primary" loading={loading} />
            <a href="http://localhost:3000/forgot_password">Forgot password?</a>
          </div>
        </form>
        <div className={`${styles.extra__stuffs}`}>
          Don't have an account yet?{" "}
          <a href="http://localhost:3000/register">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Login
