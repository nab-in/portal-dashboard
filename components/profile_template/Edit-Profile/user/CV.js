import { useState } from "react"
import Section from "../../Section"
import Button from "../../../buttons/FormButton"
import styles from "./cv.module.sass"
import { useAlertsDispatch } from "../../../../context/alerts"
import { useAuthDispatch } from "../../../../context/auth"
import { API } from "../../../api"
import Cookies from "js-cookie"
import axios from "axios"

const CV = ({ userCv }) => {
  let [loading, setLoading] = useState(false)
  const [cv, setCv] = useState("")
  const dispatch = useAuthDispatch()
  const alertDispatch = useAlertsDispatch()
  const handleFileChange = (e) => {
    const data = new FormData()
    data.append("", e.target.files[0])
    setCv(data)
  }
  const handleFileSubmit = (e) => {
    e.preventDefault(e)
    e.preventDefault(e)
    setLoading(true)
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    axios
      .post(`${API}/users/cv`, cv, config)
      .then((res) => {
        setLoading(false)
        dispatch({
          type: "ADD_CV",
          payload: res.data,
        })
        alertDispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: res.data.message,
          },
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response?.data?.message)
        alertDispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: err.response?.data?.message,
          },
        })
      })
  }
  return (
    <Section title="Upload CV">
      <article className={styles.cv}>
        {userCv && (
          <p
            style={{
              marginBottom: "1rem",
            }}
          >
            CV:{" "}
            <a href={userCv} target="_blank">
              Your CV
            </a>
            <br />
            <span
              style={{
                marginTop: ".7rem",
                display: "block",
              }}
            >
              Change?
            </span>
          </p>
        )}
        <form onSubmit={(e) => handleFileSubmit(e)}>
          <label htmlFor="cv">
            <input
              type="file"
              name="cv"
              id="cv"
              onChange={(e) => handleFileChange(e)}
            />
          </label>
          <Button text="Upload" btnClass="btn-primary" loading={loading} />
        </form>
      </article>
    </Section>
  )
}

export default CV
