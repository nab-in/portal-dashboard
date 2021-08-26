import { useState } from "react"
import Link from "next/link"
import styles from "./application.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"

const Application = ({ app }) => {
  const [interview, setInterview] = useState(false)
  const [reject, setReject] = useState(false)
  const [accept, setAccept] = useState(false)
  const [data, setData] = useState({
    date: "",
    location: "",
  })
  const callInterview = () => {
    setInterview(false)
  }

  const acceptApplication = () => {
    setAccept(false)
  }

  const rejectApplication = () => {
    setReject(false)
  }

  console.log(app)

  return (
    <article className={`card ${styles.card}`}>
      <div className={styles.user}>
        <div className={styles.dp}>
          <img src={app.user.dp} />
        </div>
        <div className={styles.name}>
          <Link href={`/applications/${app?.user?.id}?job=${app?.id}`}>
            <a>
              {app.user.firstname} {app.user.lastname}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.job}>
        <Link href={`/applications/${app?.user?.id}?job=${app?.id}`}>
          {app.name}
        </Link>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setInterview(true)}>
          Call for the Interview
        </button>
        <button onClick={() => setReject(true)}>Reject</button>
        <button className={styles.accept} onClick={() => setAccept(true)}>
          Accept
        </button>
      </div>
      {interview && (
        <Modal setOpen={setInterview}>
          <Action
            title="Set date for this interview"
            data={data}
            setData={setData}
            action={callInterview}
            setOpen={setInterview}
            btnText="Submit"
          />
        </Modal>
      )}
      {accept && (
        <Modal setOpen={setAccept}>
          <Action
            title={`Are you sure you want to accept ${app.user.firstname} application?`}
            action={acceptApplication}
            setOpen={setAccept}
            btnText="Yes"
          />
        </Modal>
      )}
      {reject && (
        <Modal setOpen={setReject}>
          <Action
            title={`Are you sure you want to reject ${app.user.firstname} application?`}
            action={rejectApplication}
            setOpen={setReject}
            btnText="Yes"
          />
        </Modal>
      )}
    </article>
  )
}

export default Application
