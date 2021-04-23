import React from "react"
import styles from "./input.module.sass"

const Input = ({
  inputClass,
  name,
  id,
  type,
  placeholder,
  value,
  handleChange,
  title,
  error,
  success,
  textarea,
}) => {
  return (
    <div
      className={
        error
          ? `${styles.form_control} ${inputClass} error`
          : `${styles.form_control} ${inputClass}`
      }
    >
      {title && (
        <label htmlFor={id} className="text-primary">
          {title}
        </label>
      )}
      {textarea ? (
        // <textarea
        //   name={name}
        //   placeholder={placeholder}
        //   value={value}
        //   id={id}
        //   onChange={(e) => handleChange(e)}
        // />
        <div className={styles.expandable__textarea} role="textbox" contentEditable />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={(e) => handleChange(e)}
        />
      )}

      {error && <small className="text-danger">{error}</small>}
      {success && <small className="text-success">{success}</small>}
    </div>
  )
}

export default Input
