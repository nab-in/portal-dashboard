import React from "react"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

const applications = () => {
  return (
    <div>
      <div className="content">
        <MainContents></MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}

export default applications
