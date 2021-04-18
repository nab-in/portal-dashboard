import React from "react"
import Card from "../card/Card"
import styles from "./chart.module.sass"

let Subtitle = () => {
  return <div className="badge">Filter By</div>
}

const Chart = ({ title }) => {
  return (
    <Card title={title} subtitle={<Subtitle />}>
      Chart
    </Card>
  )
}

export default Chart
