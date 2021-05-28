import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./error.module.sass"

const Error = () => {
  let router = useRouter()
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <div className={styles.error__text}>
        <h2>Ooops! page not found</h2>
        <p>Sorry, the page you are looking for doesn't exist/it is broken.</p>
        <div className={styles.btns}>
          <button onClick={() => router.back()} className="btn btn-secondary">
            Go back
          </button>
          <Link href="/">
            <a className="btn btn-primary">Go Home</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error
