import Head from "next/head"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import MetricsCard from "../components/metricsCard/MetricsCard"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portal Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <MainContents>
          <div className="metrics__showcase">
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={1190088} />
          </div>
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
