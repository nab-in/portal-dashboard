import Head from "next/head"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portal Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content">
        <MainContents></MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
