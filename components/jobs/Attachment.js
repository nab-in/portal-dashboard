import { useState } from "react"
import Cookies from "js-cookie"
import Card from "../cards/Card"
import Button from "../buttons/FormButton"
import { API } from "../api"
import axios from "axios"
import { useAlertsDispatch } from "../../context/alerts"

const Attachment = ({ job, setJob }) => {
  const dispatch = useAlertsDispatch()
  const [loading, setLoading] = useState(false)
  let [attachment, setAttachment] = useState("")
  const handleChange = (e) => {
    let { files } = e.target
    if (files && files[0].type == "application/pdf") {
      const data = new FormData()
      data.append("attachment", files[0])
      setAttachment(data)
    } else {
      console.log("Invalid file type")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let token = Cookies.get("token")
    let config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }

    if (job?.id) {
      let body = {
        data: attachment,
        job: job.id,
      }
      // console.log(body)
      setLoading(true)
      axios
        .post(`${API}/jobs/profile/`, body, config)
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
  }
  return (
    <div>
      <Card title="Upload attachment">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label
            style={{
              marginBottom: "1rem",
              display: "block",
            }}
          >
            <input type="file" onChange={(e) => handleChange(e)} />
          </label>
          <Button text="Upload" btnClass="btn-primary" loading={loading} />
        </form>
      </Card>
    </div>
  )
}

export default Attachment
