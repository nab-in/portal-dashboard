import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import styles from "./pagination.module.sass"
import Link from "next/link"

const Pagination = ({ pager, nextUrl, prevUrl }) => {
  const { page, total, pageSize } = pager
  return (
    <div className={styles.container}>
      <div>
        <span id={styles.currentpage}>Page {page} | &nbsp; &nbsp;</span>
        <span className={styles.display}>
          Displaying {pageSize} out of {total}
        </span>
      </div>
      <div>
        <span>
          {pageSize * (page - 1) + 1} - {page * pageSize}
        </span>
      </div>

      <div>
        <span className={styles.previous}>
          <Link type="button" href={prevUrl}>
            <a className={page == 1 && "disabled"}>
              <FaChevronLeft className={styles.icon} />
            </a>
          </Link>
        </span>
        <span className={styles.next}>
          <Link type="button" href={nextUrl}>
            <a className={page >= Math.ceil(total / pageSize) && "disabled"}>
              <FaChevronRight className={styles.icon} />
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Pagination
