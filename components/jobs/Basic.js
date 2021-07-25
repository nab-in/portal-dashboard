import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { API } from "../../components/api"
import axios from "axios"
import { useAuthState } from "../../context/auth"

const Basic = () => {
  const { user } = useAuthState()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    website: "",
    title: "",
    bio: "",
    attachment: "",
    closeDate: "",
    email: "",
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

  const handleChange = (e) => {
    // let { name, value } = e.target
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // })
    // console.log(formData)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // let token = Cookies.get("token")
    // let config = {
    //   headers: {
    //     // "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ` + token,
    //   },
    // }
    // setLoading(true)
    // axios
    //   .post(`${API}/jobs`, formData, config)
    //   .then((res) => {
    //     console.log(res.data)
    //     setLoading(false)
    //   })
    //   .catch((err) => {
    //     setLoading(false)
    //     console.log(err)
    //   })
  }

  return <div></div>
}

export default Basic

// const data = new FormData()

// const handleFileChange = (e) => {
// let { files } = e.target
// if (files) {
//   const reader = new FileReader()
//   reader.addEventListener("load", () => {
//     setFormData({ ...formData, attachment: reader.result })
//   })
//   reader.readAsDataURL(files[0])
// }
// if (files && files[0].type == "application/pdf") {
//   const data = new FormData()
//   data.append("attachment", files[0])
//   setFormData({
//     ...formData,
//     attachment: data,
//   })
//   console.log(data)
// } else {
//   console.log("invalid file type")
// }
// }
