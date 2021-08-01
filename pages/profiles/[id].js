import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { API } from "../../components/api"
import axios from "axios"
import Cookies from "js-cookie"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Profile from "../../components/profile_template/profile/Profile"
import RecentUsers from "../../components/user/RecentUsers"
import Modal from "../../components/modal/Modal"
import Action from "../../components/actions/Action"
import Error from "../../components/error/Error"
import Loader from "../../components/loaders/UserLoader"

const profile = () => {
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState("")
  const router = useRouter()
  const addRole = () => {
    setOpen(false)
  }
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .get(`${API}/users/${router.query.id}`, config)
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
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
            {user && <span>{user.username}</span>}
          </div>
          {user && (
            <div className="mobile__link">
              <button onClick={() => setOpen(true)}>Add Role</button>
            </div>
          )}
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>{user ? <Profile details={user} /> : <Error />}</>
          )}
        </MainContents>
        <SubContents>
          {user && (
            <button
              className="sub_btn span__full btn btn-primary"
              onClick={() => setOpen(true)}
            >
              Add Role
            </button>
          )}
          <RecentUsers size={4} />
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
    </div>
  )
}

export default profile
