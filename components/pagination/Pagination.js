import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import styles from "./pagination.module.sass"
import Link from "next/link"

const Pagination = ({ size, pager, nextUrl, prevUrl }) => {
  // size - displayed content size/length
  // pager - this comes from the api it res.data.pager
  // nextUrl - url that takes in next page query ie `/url?page=${page+1}`
  // prevUrl - url that takes in previous page query ie `/url?page=${page-1}`
  return (
    <>
      {pager && (
        <div className={styles.container}>
          <div>
            <span id={styles.currentpage}>
              Page {pager?.page} | &nbsp; &nbsp;
            </span>
            <span className={styles.display}>
              Displaying {size} out of {pager?.total}
            </span>
          </div>
          <div className={styles.prev_next}>
            {size > 0 && <div>
              <span>
                {pager?.pageSize * (pager?.page - 1) + 1} -{" "}
                {pager?.pageSize * (pager?.page - 1) + size}
              </span>
            </div>}
            <span className={styles.previous}>
              {prevUrl && (
                <Link type="button" href={prevUrl}>
                  <a className={pager?.page == 1 ? "disabled" : ""}>
                    <FaChevronLeft className={styles.icon} />
                  </a>
                </Link>
              )}
            </span>
            <span className={styles.next}>
              {nextUrl && (
                <Link type="button" href={nextUrl}>
                  <a
                    className={
                      pager?.page >= Math.ceil(pager?.total / pager?.pageSize)
                        ? "disabled"
                        : ""
                    }
                  >
                    <FaChevronRight className={styles.icon} />
                  </a>
                </Link>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
