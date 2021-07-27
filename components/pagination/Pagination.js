import React from "react";
import styles from "./pagination.module.sass";
import Link from "next/link";

const Pagination = ({ currentPage, totalCount, startCount }) => {
  return (
    <div className={styles.container}>
      <span id={styles.currentpage}>
        Page {currentPage} | 
      </span>
      <span id={styles.display}>
        Displaying {startCount} - {startCount + 4} out of {totalCount} |
      </span>
      <span className={styles.previous}>
        <button type="button">prev</button>
      </span>
      <span class={styles.next}>
        <button type="button">next</button>
      </span>
    </div>
  );
};

export default Pagination;
