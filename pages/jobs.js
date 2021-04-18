import React from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

const jobs = () => {
  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Jobs</span>
          </div>
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}

export default jobs
