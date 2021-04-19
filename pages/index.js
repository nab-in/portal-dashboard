import Head from "next/head"
import Link from "next/link"
import dynamic from 'next/dynamic'
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import MetricsCard from "../components/metricsCard/MetricsCard"
const Chart = dynamic(
    () => import('../components/chart/Chart'),
    { ssr: false }
  )

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
          <Chart title="Applications" />
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
