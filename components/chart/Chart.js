import React from "react"
import Card from "../cards/Card"
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
import dayjs from "dayjs"
import styles from "./chart.module.sass"
import data from "../../data/chart.js"

// calculating total number of values
let number = (item) => {
  return item.value
}

let sum = (prev, next) => {
  return prev + next
}

let totalNumber = 0
if (data) totalNumber = data.map(number).reduce(sum, 0)

const CustomTooltip = ({ active, payload, label }) => {
  let date = payload[0]?.payload.date
  if (active && payload && payload.length) {
    return (
      <div
        className={styles.custom__tooltip}
        style={{
          background: "white",
          padding: "1rem",
          fontSize: "12px",
          borderRadius: "5px",
          boxShadow: "2px 4px 10px 3px rgba(0, 0, 0, 0.15)",
        }}
      >
        <p
          className={styles.label}
          style={{
            marginBottom: ".5rem",
          }}
        >
          {dayjs(date, "DD/MM/YYYY").format("dddd MMMM D, yyyy")}
        </p>
        <p>{payload[0].value} Applicants</p>
      </div>
    )
  }

  return null
}

let Subtitle = ({ title }) => {
  return (
    <div>
      From {data[0].date} to {data[data.length - 1].date}
    </div>
  )
}

const Chart = ({ title }) => {
  return (
    <div className={styles.chart}>
      <Card title={title}>
        <Subtitle title={title} />
        <div
          className={styles.chart__display}
          style={{
            margin: "2rem 0",
          }}
        >
        <ResponsiveContainer height={300}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: -25,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="0 0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" barSize={15} fill="#007CA9" />
          </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.metrics}>
          <div
            style={{
              marginBottom: "1rem",
              marginTop: "-1rem",
              fontSize: "1.2rem",
            }}
          >
            <span
              style={{
                marginRight: ".7rem",
              }}
            >
              {totalNumber}
            </span>
            <span>Applicants</span>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Chart
