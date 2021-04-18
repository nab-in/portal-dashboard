import Head from "next/head"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import MetricsCard from "../components/metricsCard/MetricsCard"
import Chart from "../components/chart/Chart"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portal Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>Home</span>
          </div>
          <div className="metrics__showcase">
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={1190088} />
          </div>
          <Chart title="Applications from 17.02.2021 to 15.03.2021" />
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
