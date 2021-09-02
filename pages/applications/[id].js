import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import { API } from "../../components/api"
import axios from "axios"
import { config } from "../../components/config"
import { useAuthState } from "../../context/auth"
import Profile from "../../components/profile_template/profile/Profile"
import Modal from "../../components/modal/Modal"
import Action from "../../components/actions/Action"

const application = () => {
  const [job, setJob] = useState(null)
  const [applicant, setApplicant] = useState(null)
  const [loading, setLoading] = useState(false)
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
    axios
      .get(
        `${API}/jobs/${router.query?.job}/applications/${router.query?.id}`,
        config
      )
      .then((res) => {
        setJob(res.data?.job)
        setApplicant(res.data?.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const callInterview = () => {
    setLoading(true)
    axios
      .post(
        `${API}/users/${applicant?.id}/interview`,
        {
          job: job?.id,
          ...data,
        },
        config
      )
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        setInterview(false)
      })
      .catch((err) => {
        console.log(err?.response)
        setLoading(false)
        setInterview(false)
      })
  }

  const acceptApplication = () => {
    setLoading(true)
    axios
      .post(
        `${API}/users/${applicant?.id}/accept`,
        {
          job: job?.id,
        },
        config
      )
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        setAccept(false)
      })
      .catch((err) => {
        console.log(err?.response)
        setLoading(false)
        setAccept(false)
      })
  }

  const rejectApplication = () => {
    setLoading(true)
    axios
      .post(
        `${API}/users/${applicant?.id}/reject`,
        {
          job: job?.id,
        },
        config
      )
      .then((res) => {
        console.log(res.data)
        setLoading(false)
        setReject(false)
      })
      .catch((err) => {
        console.log(err?.response)
        setLoading(false)
        setReject(false)
      })
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
            {applicant?.firstname && <span>{applicant.firstname}</span>}
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
          {applicant && job && (
            <Profile details={applicant} job={job} page="applications" />
          )}
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
                className="sub_btn btn btn-tertiary"
                onClick={() => setReject(true)}
              >
                Reject
              </button>
              <button
                className="sub_btn btn btn-primary"
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
            loading={loading}
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
            loading={loading}
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
            loading={loading}
          />
        </Modal>
      )}
    </div>
  )
}

export default application
