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
  const [username, setUsername] = useState("")
  const [transfer, setTransfer] = useState(false)
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

  const transferCompany = () => {
    setTransfer(false)
  }
  return (
    <div className={styles.delete}>
      <Section title="Danger Zone">
        <article>
          <p>
            <span className={styles.text}>
              Transfer <span className={styles.name}>{details?.name}</span>?
              ownership
            </span>
            <span>
              <button
                className={`btn btn-danger ${styles.btn}`}
                onClick={() => setTransfer(true)}
              >
                Transfer
              </button>
            </span>
          </p>
          <p>
            <span className={styles.text}>
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
      {transfer && (
        <Modal setOpen={setOpen}>
          <Action
            btnText="Transfer"
            action={transferCompany}
            setOpen={setTransfer}
            title={`Enter your password to transfer ${details.name}`}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
          />
        </Modal>
      )}
    </div>
  )
}

export default Delete
