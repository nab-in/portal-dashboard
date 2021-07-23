import { useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import { API } from "../../components/api"
import axios from "axios"
import UploadJobs from "../../components/jobs/UploadJobs"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Filter from "../../components/filter/Filter"
import { useAuthState } from "../../context/auth"

const new_job = () => {
  const { user } = useAuthState()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    title: "",
    bio: "",
    attachment: "",
    description: "",
    closeDate: "",
    email: "",
    categories: [
      // {id: dsfjkdsd},
      // {id: sjdfkjfre}
    ],
  })
  useEffect(() => {
    if (user.company) {
      setFormData({
        ...formData,
        company: {
          id: user?.company?.id,
        },
        location: user?.company?.location ? user?.company?.location : "",
        website: user?.company?.website ? user?.company?.website : "",
        email: user?.company?.email ? user?.company?.email : "",
      })
    }
  }, [user])
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleFileChange = (e) => {
    let { files } = e.target
    // if (files) {
    //   const reader = new FileReader()
    //   reader.addEventListener("load", () => {
    //     setFormData({ ...formData, attachment: reader.result })
    //   })
    //   reader.readAsDataURL(files[0])
    // }
    if (files && files[0].type == "application/pdf") {
      setFormData({
        ...formData,
        attachment: files[0],
      })
    } else {
      console.log("invalid file type")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ` + token,
      },
    }
    setLoading(true)
    axios
      .post(`${API}/jobs`, formData, config)
      .then((res) => {
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
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
              <Link href="/jobs">Jobs</Link>
            </span>
            <span>/</span>
            <span>New</span>
          </div>
          {user.company && (
            <UploadJobs
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              loading={loading}
              setFormData={setFormData}
              formData={formData}
            />
          )}
        </MainContents>
        <SubContents>
          <Filter />
        </SubContents>
      </div>
    </div>
  )
}

export default new_job
