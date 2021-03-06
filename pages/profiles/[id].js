import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { API } from "../../components/api"
import axios from "axios"
import { config } from "../../components/config"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Profile from "../../components/profile_template/profile/Profile"
import RecentUsers from "../../components/user/RecentUsers"
import Modal from "../../components/modal/Modal"
import Action from "../../components/actions/Action"
import Error from "../../components/error/Error"
import Loader from "../../components/loaders/UserLoader"
import Roles from "../../components/roles/Roles"
import { useAuthState } from "../../context/auth"

const profile = () => {
  const [userData, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("")
  const router = useRouter()
  const { user, roles } = useAuthState()
  const addRole = () => {
    setOpen(false)
  }
  const remove = () => {
    setCompanyOpen(false)
  }
  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API}/users/${router.query.id}`, config)
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err.response)
      })
  }, [])

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
              <Link href="/profiles">Profiles</Link>
            </span>
            <span>/</span>
            {userData && <span>{userData.username}</span>}
          </div>
          {user?.identity?.name == "admin" &&
            user?.role == "admin" &&
            userData?.id != user?.id && (
              <div className="mobile__link">
                <button onClick={() => setOpen(true)}>Add Role</button>
              </div>
            )}
          {user?.identity?.name == "company" && user?.id != userData?.id && (
            <div className="mobile__link">
              <button onClick={() => setCompanyOpen(true)}>
                Remove member
              </button>
            </div>
          )}
          <div className="mobile-filter">
            {user?.identity?.name == "admin" && user?.role == "admin" && (
              <Roles />
            )}
          </div>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>{userData ? <Profile details={userData} /> : <Error />}</>
          )}
        </MainContents>
        <SubContents>
          {user?.identity?.name == "admin" &&
            user?.role == "admin" &&
            userData?.id != user?.id && (
              <button
                className="sub_btn span__full btn btn-primary"
                onClick={() => setOpen(true)}
              >
                Add Role
              </button>
            )}
          {user?.identity?.name == "company" && user?.id != userData?.id && (
            <button
              onClick={() => setCompanyOpen(true)}
              className="sub_btn span__full btn btn-primary"
            >
              Remove member
            </button>
          )}
          <RecentUsers size={3} />
          <div className="desktop-filter">
            {user?.identity?.name == "admin" && user?.role == "admin" && (
              <Roles />
            )}
          </div>
        </SubContents>
      </div>
      {open && (
        <Modal setOpen={setOpen}>
          <Action
            setOpen={setOpen}
            action={addRole}
            roles={roles}
            role={role}
            setRole={setRole}
            title={`Add role to ${user.firstname}`}
          />
        </Modal>
      )}
      {companyOpen && (
        <Modal setOpen={setCompanyOpen}>
          <Action
            title={`Are you sure you want to remove ${userData?.firstname} from your company?`}
            setOpen={setCompanyOpen}
            action={remove}
            btnText="Remove"
          />
        </Modal>
      )}
    </div>
  )
}

export default profile
