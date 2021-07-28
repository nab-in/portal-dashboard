import React from "react"
import styles from "./pagination.module.sass"
import Link from "next/link"

const Pagination = ({ pager, nextUrl, prevUrl }) => {
  const { page, total, pageSize } = pager
  return (
    <div className={styles.container}>
      <span id={styles.currentpage}>Page {page} | </span>
      <span className={styles.display}>
        Displaying {pageSize} out of {total}
      </span>
      <span>
        {pageSize * (page - 1) + 1} - {page * pageSize}
      </span>
      <span className={styles.previous}>
        <Link type="button" href={prevUrl}>
          prev
        </Link>
      </span>
      <span className={styles.next}>
        <Link type="button" href={nextUrl}>
          next
        </Link>
      </span>
    </div>
  )
}

export default Pagination
