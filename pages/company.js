import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"
import Profile from "../components/profile_template/profile/Profile"
import { useAuthState } from "../context/auth"
import Error from "../components/error/Error"

const profile = () => {
  const { user } = useAuthState()
  let details = user?.company

  return (
    <div>
      <div className="content">
        {user?.identity?.name === "company" && !loading && (
          <>
            <MainContents>
              <div className="bread__crumb">
                <span>
                  <Link href="/">Home</Link>
                </span>
                <span>/</span>
                <span>Profile</span>
              </div>
              <div className="mobile__link">
                <Link href="/company/edit">
                  <a>Edit Profile</a>
                </Link>
              </div>

              {/* Display users depending on who logged in */}
              <div className="mt-1">
                {details && <Profile details={details} page="company" />}
              </div>
            </MainContents>
            <SubContents>
              <Link href="/company/edit">
                <a className="sub_btn btn btn-primary">Edit Profile</a>
              </Link>
            </SubContents>
          </>
        )}
        {!user?.identity?.name === "company" && !loading && (
          <>
            <div className="bread__crumb">
              <span>
                <Link href="/">Home</Link>
              </span>
              <span>/</span>
              <span>404 Page not found</span>
            </div>
            <Error />
          </>
        )}
      </div>
    </div>
  )
}

export default profile
