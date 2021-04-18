import React from "react"
import styles from "./metricsCard.module.sass"

const MetricsCard = ({ title, number }) => {
  return (
    <div className={styles.metrics}>
      <h3>{title}</h3>
      <span>{number}</span>
    </div>
  )
}

export default MetricsCard
