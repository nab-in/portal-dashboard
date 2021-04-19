import React from "react"
import Link from "next/link"
import UploadJobs from "../../components/jobs/UploadJobs"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"

const new_job = () => {
  const handleChange = (e) => {}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>
              <Link href="/jobs">Jobs</Link>
            </span>
            <span>/</span>
            <span>New</span>
          </div>
          <UploadJobs handleChange={handleChange} handleSubmit={handleSubmit}/>
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}

export default new_job
