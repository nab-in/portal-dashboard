import React, { useState } from "react"
import { FaCamera } from "react-icons/fa"
import styles from "./upload.module.sass"

const Upload = ({ dp, name }) => {
  name = name.split("")[0]
  let [imgData, setImgData] = useState(null)
  const handleChange = (e) => {
    if (e.target.files) {
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgData(reader.result)
        console.log(imgData)
      })
      reader.readAsDataURL(e.target.files[0])
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
                {dp ? (
                  <img src="/assets/companies/logo2.png" alt="dp" />
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
