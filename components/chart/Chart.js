import React from "react"
import Card from "../card/Card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import data from "../../data/chart.js"
import moment from "moment"
import styles from "./chart.module.sass"

const CustomTooltip = ({ active, payload, label }) => {
  let date = payload[0]?.payload.date
  console.log(date);
  if (active && payload && payload.length) {
    return (
      <div
        className={styles.custom__tooltip}
        style={{
          background: "#E2E8EC",
          padding: "1rem",
          borderRadius: "5px",
          boxShadow: "2px 4px 10px 3px rgba(0, 0, 0, 0.15)",
        }}
      >
        <p className={styles.label}>{moment(date, "DD/MM/YYYY").format("dddd MMMM D, yyyy")} <br /> {payload[0].value} Applicants</p>
      </div>
    )
  }

  return null
}

let Subtitle = () => {
  return <div className="badge">Filter By</div>
}

const Chart = ({ title }) => {
  return (
    <div className={styles.chart}>
      <Card title={title}>
      <Subtitle />
      <div className={styles.chart__display}>
          <BarChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="0 0" />
            <XAxis
              dataKey="name"
            />
            <YAxis  />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" label="date" barSize={15} fill="#007CA9" />
          </BarChart>
        </div>
      </Card>
    </div>
  )
}

export default Chart
