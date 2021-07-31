import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import { API } from "../../components/api"
import Cookies from "js-cookie"
import axios from "axios"
import { useAuthState } from "../../context/auth"
import Profile from "../../components/profile_template/profile/Profile"
import Modal from "../../components/modal/Modal"
import Action from "../../components/actions/Action"

const application = () => {
  const [job, setJob] = useState(null)
  const [accept, setAccept] = useState(false)
  const [reject, setReject] = useState(false)
  const [interview, setInterview] = useState(false)
  const [data, setData] = useState({
    date: "",
    location: "",
  })
  const router = useRouter()
  const { user } = useAuthState()
  useEffect(() => {
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ` + token,
      },
    }
    axios
      .get(`${API}/jobs/${router.query.id}?fields=id,name`, config)
      .then((res) => {
        setJob(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const callInterview = () => {
    setInterview(false)
  }

  const acceptApplication = () => {
    setAccept(false)
  }

  const rejectApplication = () => {
    setReject(false)
  }

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
              <Link href="/applications">Applications</Link>
            </span>
            <span>/</span>
            {user?.firstname && <span>{user.firstname}</span>}
          </div>
          <div className="mobile__link">
            <div className="app_btn">
              <button
                className="sub_btn btn btn-primary"
                onClick={() => setAccept(true)}
              >
                Accept
              </button>
              <div>
                <button
                  className="btn btn-tertiary"
                  onClick={() => setReject(true)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setInterview(true)}
                >
                  Interview
                </button>
              </div>
            </div>
          </div>
          <Profile details={user} job={job} page="applications" />
        </MainContents>
        <SubContents>
          <div className="app_btn">
            <button
              className="sub_btn btn btn-primary"
              onClick={() => setAccept(true)}
            >
              Accept
            </button>
            <div>
              <button
                className="btn btn-tertiary"
                onClick={() => setReject(true)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setInterview(true)}
              >
                Interview
              </button>
            </div>
          </div>
        </SubContents>
      </div>
      {interview && (
        <Modal setOpen={setInterview}>
          <Action
            title="Set date for this interview"
            data={data}
            setData={setData}
            action={callInterview}
            setOpen={setInterview}
            btnText="Submit"
          />
        </Modal>
      )}
      {accept && (
        <Modal setOpen={setAccept}>
          <Action
            title={`Are you sure you want to accept ${user.firstname} application?`}
            action={acceptApplication}
            setOpen={setAccept}
            btnText="Yes"
          />
        </Modal>
      )}
      {reject && (
        <Modal setOpen={setReject}>
          <Action
            title={`Are you sure you want to reject ${user.firstname} application?`}
            action={rejectApplication}
            setOpen={setReject}
            btnText="Yes"
          />
        </Modal>
      )}
    </div>
  )
}

export default application
