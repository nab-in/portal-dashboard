import React from "react"
import Link from "next/Link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Error from "../components/error/Error"
import {useAuthState} from "../context/auth"

const profile = () => {

  let {user, isAuthenticated} = useAuthState()

  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>Profile</span>
          </div>
          <div className="mobile__link">
            <Link href="#">
              <a className="sub_btn btn btn-primary">Edit Profile</a>
            </Link>
          </div>

          {/* Display all users depending on who logged in */}

          
        </MainContents>
        <SubContents>
          <Link href="#">
            <a className="sub_btn btn btn-primary">Edit Profile</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default profile
