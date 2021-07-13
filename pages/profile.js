import React from "react"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Profile from "../components/profile_template/profile/Profile"

const profile = () => {
  let details = {
    id: 1,
    title: "Software developer",
    bio: "bio",
    about: "about",
    website: "site.com",
    cv: "",
    location: "dar",
  }

  // let { id, title, bio, about, website, cv, location } = details;

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
            <Link href="/profile/edit_profile">
              <a>Edit Profile</a>
            </Link>
          </div>

          {/* Display users depending on who logged in */}
          <div className="mt-1">
            <Profile details={details} />
          </div>
        </MainContents>
        <SubContents>
          <Link href="/components/profile_template/Edit-Profile">
            <a className="sub_btn btn btn-primary">Edit Profile</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default profile
