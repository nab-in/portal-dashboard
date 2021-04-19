import Head from "next/head"
import Link from "next/link"
import dynamic from "next/dynamic"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import MetricsCard from "../components/metricsCard/MetricsCard"
import RecentJobs from "../components/jobs/RecentJobs"
const Chart = dynamic(() => import("../components/chart/Chart"), { ssr: false })

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
            <span>/</span>
          </div>
          <div className="metrics__showcase">
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={88} />
            <MetricsCard title="Total Number of Jobs" number={1190088} />
          </div>
          <Chart title="Applications" />
        </MainContents>
        <SubContents>
          <Link href="/jobs/new_job">
            <a className="btn btn-primary">Add New Job</a>
          </Link>
          <RecentJobs />
        </SubContents>
      </div>
    </div>
  )
}
