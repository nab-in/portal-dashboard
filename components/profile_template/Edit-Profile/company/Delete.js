import { useState } from "react"
import Section from "../../Section"
import styles from "./delete.module.sass"
import Action from "../../../actions/Action"
import Modal from "../../../modal/Modal"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../../../api"
import { useAlertsDispatch } from "../../../../context/alerts"

const Delete = ({ details }) => {
  const [password, setPassword] = useState("")
  const [open, setOpen] = useState(false)
  const dispatch = useAlertsDispatch()
  const deleteCompany = () => {
    const token = Cookies.get("token")
    const config = {
      headers: {
        authorization: `Bearer ` + token,
      },
    }
    axios
      .delete(`${API}/companies/${details.id}`, config)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: "ADD",
          payload: {
            type: "success",
            message: "Company deleted successfully",
          },
        })
        setOpen(false)
        Cookies.remove("identity")
      })
      .catch((err) => {
        setOpen(false)
        dispatch({
          type: "ADD",
          payload: {
            type: "danger",
            message: err.response?.data?.message,
          },
        })
      })
  }
  return (
    <div className={styles.delete}>
      <Section title="Danger Zone">
        <article>
          <p>
            <span>
              Delete <span className={styles.name}>{details?.name}</span>? Once
              you perform this action there is no going back
            </span>
            <span>
              <button
                className={`btn btn-danger ${styles.btn}`}
                onClick={() => setOpen(true)}
              >
                Delete
              </button>
            </span>
          </p>
        </article>
      </Section>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            btnText="Delete"
            action={deleteCompany}
            setOpen={setOpen}
            title={`Enter your password to delete ${details.name}`}
            password={password}
            setPassword={setPassword}
          />
        </Modal>
      )}
    </div>
  )
}

export default Delete
