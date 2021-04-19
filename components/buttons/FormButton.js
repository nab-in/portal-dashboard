import React from "react"

const FormButton = ({ text, btnClass, btnGroupClass }) => {
  return (
    <div className={`btn-group ${btnGroupClass}`}>
      <button className={`btn ${btnClass}`}>{text}</button>
    </div>
  )
}

export default FormButton
