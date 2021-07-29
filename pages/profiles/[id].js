import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { API } from "../../components/api"
import axios from "axios"
import Cookies from "js-cookie"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Profile from "../../components/profile_template/profile/Profile"

const profile = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    axios
      .get(`${API}/users/${router.query.id}`, config)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
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
          <div className="mobile__link">
            <button>Add Role</button>
          </div>
          {user && <Profile details={user} />}
        </MainContents>
        <SubContents>
          <button className="sub_btn span__full btn btn-primary">
            Add Role
          </button>
        </SubContents>
      </div>
    </div>
  )
}

export default profile
