import Link from "next/link"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Edit from "../../components/profile_template/Edit-Profile/Edit"

const edit = () => {
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
              <Link href="/profile">Profile</Link>
            </span>
            <span>/</span>
            <span>Edit</span>
          </div>

          <div className="mobile__link">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </div>
          <div className="mt-1">
            <Edit />
          </div>
        </MainContents>
        <SubContents>
          <Link href="/profile/edit">
            <a className="sub_btn btn btn-primary">Profile</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default edit
