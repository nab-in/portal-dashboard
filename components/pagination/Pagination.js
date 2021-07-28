import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import styles from "./pagination.module.sass"
import Link from "next/link"

const Pagination = ({ pager, nextUrl, prevUrl }) => {
  return (
    <>
      {pager && (
        <div className={styles.container}>
          <div>
            <span id={styles.currentpage}>
              Page {pager?.page} | &nbsp; &nbsp;
            </span>
            <span className={styles.display}>
              Displaying {pager?.pageSize} out of {pager?.total}
            </span>
          </div>
          <div className={styles.prev_next}>
            <div>
              <span>
                {pager?.pageSize * (pager?.page - 1) + 1} -{" "}
                {pager?.page * pager?.pageSize}
              </span>
            </div>
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
