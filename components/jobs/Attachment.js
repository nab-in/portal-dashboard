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
      setAttachment(files[0])
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
      // console.log(body)
      setLoading(true)
      const data = new FormData()
      data.append("", attachment)
      console.log(data)
      axios
        .post(`${API}/jobs/${job.id}/profile/`, data, config)
        .then((res) => {
          console.log(res.data)
          setJob({
            ...job,
            attachment: res.data.filename,
          })
          dispatch({
            type: "ADD",
            payload: {
              message: "Attachment uploaded successfully",
              type: "success",
            },
          })
          setSelected("basic")
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
