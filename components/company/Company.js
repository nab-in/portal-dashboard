import { useState } from "react"
import Link from "next/link"
import { GoVerified } from "react-icons/go"
import styles from "./company.module.sass"
import Modal from "../modal/Modal"
import Action from "../actions/Action"
import axios from "axios"
import { config } from "../config"
import { API } from "../api"

const Company = ({ company, setCompanies }) => {
  const { id, logo, name, verified } = company
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const verify = () => {
    if (verified === "true") {
      let body = {
        verified: false,
      }
      setLoading(true)
      axios
        .put(`${API}/companies/${id}`, body, config)
        .then((res) => {
          setOpen(false)
          setCompanies((prev) => {
            let companiesCopy = prev.slice()
            let companyIndex = companiesCopy.findIndex((el) => el.id === id)
            companiesCopy[companyIndex] = {
              ...companiesCopy[companyIndex],
              verified: res.data?.payload?.verified,
            }
            return companiesCopy
          })
          setLoading(false)
        })
        .catch((err) => {
          console.log(err?.response)
          setOpen(false)
          setLoading(false)
        })
    } else {
      let body = {
        verified: true,
      }
      setLoading(true)
      axios
        .put(`${API}/companies/${id}`, body, config)
        .then((res) => {
          setOpen(false)
          setCompanies((prev) => {
            let companiesCopy = prev.slice()
            let companyIndex = companiesCopy.findIndex((el) => el.id === id)
            companiesCopy[companyIndex] = {
              ...companiesCopy[companyIndex],
              verified: res.data?.payload?.verified,
            }
            return companiesCopy
          })
          setLoading(false)
        })
        .catch((err) => {
          console.log(err?.response)
          setOpen(false)
          setLoading(false)
        })
    }
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
        <div
          className={
            verified === "true"
              ? `badge verified ${styles.badge}`
              : `badge unverified ${styles.badge}`
          }
        >
          {verified === "true" ? (
            <>
              Verified <GoVerified className="icon" />
            </>
          ) : (
            "Unverified"
          )}
        </div>
        <div className={styles.jobs}>
          <Link href={`/companies/${id}/jobs`}>
            <a>Jobs</a>
          </Link>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setOpen(true)}>
          {verified === "true" ? "Unverify" : "Verify"}
        </button>
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            title={verified === "true" ? `Verify ${name}` : `Verify ${name}`}
            btnText={verified === "true" ? "Unverify" : "Verify"}
            action={verify}
            setOpen={setOpen}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  )
}

export default Company
