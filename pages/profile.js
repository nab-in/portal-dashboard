import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Profile from "../components/profile_template/profile/Profile"
import { useAuthState } from "../context/auth"

const profile = () => {
  const { user } = useAuthState()
  let details = user

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
            <Link href="/profile/edit">
              <a>Edit Profile</a>
            </Link>
          </div>
          <div className="mt-1">
            <Profile details={details} page="auth-user" />
          </div>
        </MainContents>
        <SubContents>
          <Link href="/profile/edit">
            <a className="sub_btn btn btn-primary">Edit Profile</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default profile
