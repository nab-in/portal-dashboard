import { useState } from "react"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import styles from "./company.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"

const Company = ({ company }) => {
  const { id, logo, name } = company
  const [open, setOpen] = useState(false)
  const verify = () => {
    setOpen(false)
  }
  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.company}>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <div className={styles.name}>
          <Link href={`/companies/${id}`}>
            <a>{name}</a>
          </Link>
        </div>
      </div>
      <div className={styles.job}>
        <div className={`badge verified ${styles.badge}`}>
          Verified <GoVerified className="icon" />
        </div>
        <div className={styles.jobs}>
          <Link href={`/companies/${id}/jobs`}>
            <a>Jobs</a>
          </Link>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setOpen(true)}>Unverify</button>
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            title={`Verify ${name}`}
            btnText="Verify"
            action={verify}
            setOpen={setOpen}
          />
        </Modal>
      )}
    </div>
  )
}

export default Company
