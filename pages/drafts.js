import React from "react"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

const drafts = () => {
  return (
    <div>
      <div className="content">
        <MainContents></MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}

export default drafts