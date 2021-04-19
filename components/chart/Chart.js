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
import styles from "./chart.module.sass"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const CustomTooltip = ({ active, payload, label }) => {
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
        <p className={styles.label}>{`${label} : ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

let Subtitle = () => {
  return <div className="badge">Filter By</div>
}

let Text = ({ text }) => <text style={{ marginTop: "2rem" }}>{text}</text>

const Chart = ({ title }) => {
  return (
    <div className={styles.chart}>
      <Card title={title} subtitle={<Subtitle />}>
        <ResponsiveContainer width={500} height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              label={<Text text="Applications/Day" />}
            />
            <YAxis label="Text" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pv" barSize={20} fill="#007CA9" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default Chart
