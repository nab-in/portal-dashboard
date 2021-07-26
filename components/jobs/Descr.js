import { useState } from "react"
import Cookies from "js-cookie"
import Card from "../cards/Card"
import Input from "../inputs/Input"
import Button from "../buttons/FormButton"
import { API } from "../../components/api"
import axios from "axios"
import { useAlertsDispatch } from "../../context/alerts"

const Descr = ({ job, setJob, setSelected, categories }) => {
  const dispatch = useAlertsDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    description: job?.description ? job.description : "",
    categories,
  })
  const { description } = formData
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let token = Cookies.get("token")
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    }
    if (job?.id) {
      setLoading(true)
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
          setSelected("att")
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
        })
    }
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Card title="Job Descriptions">
          <Input
            title="Descriptions"
            handleChange={handleChange}
            name="description"
            id="descriptions"
            textarea={true}
            value={description}
          />
          <Button text="Save" btnClass="btn-primary" loading={loading} />
        </Card>
      </form>
    </div>
  )
}

export default Descr
