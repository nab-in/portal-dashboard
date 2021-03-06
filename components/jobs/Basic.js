import { useEffect, useState } from "react"
import Card from "../cards/Card"
import Input from "../inputs/Input"
import Button from "../buttons/FormButton"
import { API } from "../api"
import { config } from "../config"
import axios from "axios"
import dayjs from "dayjs"
import { useAuthState } from "../../context/auth"
import { useAlertsDispatch } from "../../context/alerts"

const Basic = ({ job, setJob, setSelected, categories }) => {
  const { user } = useAuthState()
  const dispatch = useAlertsDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: job?.name ? job.name : "",
    location: job?.location ? job.location : "",
    website: job?.website ? job.wensite : "",
    closeDate: job?.closeDate ? job.closeDate : "",
    email: job?.email ? job.email : "",
    openTo: job?.openTo ? job.openTo : "",
    jobType: job?.jobType ? job.jobType : "",
    categories,
  })

  useEffect(() => {
    if (user.company) {
      setFormData({
        ...formData,
        company: {
          id: user?.company?.id,
        },
        location: job?.name
          ? job.name
          : user?.company?.location
          ? user?.company?.location
          : "",
        website: job?.website
          ? job.website
          : user?.company?.website
          ? user?.company?.website
          : "",
        email: job?.email
          ? job.email
          : user?.company?.email
          ? user?.company?.email
          : "",
      })
    }
  }, [user])

  const { name, website, closeDate, location, email, jobType } = formData

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    if (job?.id)
      axios
        .put(`${API}/jobs/${job.id}`, formData, config)
        .then((res) => {
          setJob(res.data.payload)
          dispatch({
            type: "ADD",
            payload: {
              message: res.data.message,
              type: "success",
            },
          })
          setSelected("desc")
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.response)
        })
    if (!job?.id)
      axios
        .post(`${API}/jobs`, formData, config)
        .then((res) => {
          setJob(res.data.payload)
          dispatch({
            type: "ADD",
            payload: {
              message: res.data.message,
              type: "success",
            },
          })
          setSelected("desc")
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.response)
        })
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Card title="Job Information">
          <Input
            title="Job Name"
            handleChange={handleChange}
            name="name"
            id="name"
            value={name}
          />
          <Input
            type="email"
            title="Email"
            handleChange={handleChange}
            name="email"
            id="email"
            value={email}
          />
          {/* <div className="select-group">
            <label htmlFor="opento">
              Open To?
              <select
                name="opento"
                id="opento"
                onChange={(e) => handleChange(e)}
                defaultValue={openTo ? openTo : ""}
              >
                <option value="Individual" defaultValue>
                  Individual
                </option>
                <option value="Company">Company/Organisation</option>
              </select>
            </label>
          </div> */}
          <div className="select-group">
            <label htmlFor="jobtype">
              Select Job Type?
              <select
                name="jobType"
                id="jobtype"
                onChange={(e) => handleChange(e)}
              >
                <option>Select</option>
                <option
                  value="Freelance"
                  defaultValue={jobType == "Freelance" ? true : false}
                >
                  Freelance
                </option>
                <option
                  value="Full Time"
                  defaultValue={jobType == "Full Time" ? true : false}
                >
                  Full Time
                </option>
              </select>
            </label>
          </div>
          <Input
            title="Website"
            handleChange={handleChange}
            name="website"
            id="website"
            value={website}
          />
          <Input
            title="Location"
            handleChange={handleChange}
            name="location"
            id="location"
            value={location}
          />
          <Input
            title="Application Deadline"
            type="datetime-local"
            handleChange={handleChange}
            name="closeDate"
            id="closedate"
            value={dayjs(closeDate).format("YYYY-MM-DDTHH:mm")}
          />
          <Button text="Save" btnClass="btn-primary" loading={loading} />
        </Card>
      </form>
    </div>
  )
}

export default Basic
