import React, { useState } from "react"
import { FaCamera } from "react-icons/fa"
import axios from "axios"
import Cookies from "js-cookie"
import { API } from "../../api"
import styles from "./upload.module.sass"

const Upload = ({ id, img, name, page }) => {
  name = name?.split("")[0]
  let [imgData, setImgData] = useState(null)
  console.log(img, name)

  const handleChange = (e) => {
    if (e.target.files) {
      // reading file for preview
      const reader = new FileReader()
      const data = new FormData()

      reader.addEventListener("load", () => {
        setImgData(reader.result)
        console.log(imgData)
      })
      reader.readAsDataURL(e.target.files[0])

      // uploading file
      let token = Cookies.get("token")
      let config = {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }

      // adding file to dp variable
      data.append("", e.target.files[0])
      if (page == "auth-user") {
        axios
          .post(`${API}/users/dp`, data, config)
          .then((res) => {
            console.log(res.data)
            // setLoading(false)
          })
          .catch((err) => {
            // setLoading(false)
            console.log(err)
          })
      }
      if (page == "company") {
        axios
          .post(`${API}/companies/${id}/logo`, data, config)
          .then((res) => {
            console.log(res.data)
            // setLoading(false)
          })
          .catch((err) => {
            // setLoading(false)
            console.log(err)
          })
      }
    }
  }

  return (
    <div className={styles.img__upload}>
      <form>
        <label htmlFor="img-upload">
          <input
            type="file"
            id="img-upload"
            onChange={(e) => handleChange(e)}
          />
          <div className={styles.img__container}>
            <div className={styles.img__cover}></div>
            {imgData ? (
              <img src={imgData} alt="newly uploaded" />
            ) : (
              <>
                {img ? (
                  <img src={img} alt="dp" />
                ) : (
                  <div className={styles.default}>{name}</div>
                )}
              </>
            )}
            <FaCamera className={styles.icon} />
          </div>
        </label>
      </form>
    </div>
  )
}

export default Upload
