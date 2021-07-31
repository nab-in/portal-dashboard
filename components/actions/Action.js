import styles from "./action.module.sass"
import Input from "../inputs/Input"

const Action = ({
  title,
  action,
  date,
  setDate,
  setOpen,
  btnText,
  role,
  roles,
  setRole,
}) => {
  const handleChange = (e) => {
    setDate(e.target.value)
  }
  const handleSelectChange = (e) => {
    setRole(e.target.value)
  }
  return (
    <div className={styles.action}>
      <p>{title}</p>
      {setDate && (
        <Input
          handleChange={(e) => handleChange(e)}
          value={date}
          type="datetime-local"
        />
      )}
      {setRole && (
        <div className="select-group">
          <label>
            <select onChange={(e) => handleSelectChange(e)}>
              {roles.map(({ id, name }) => (
                <option
                  value={name}
                  key={id}
                  selected={role == name ? true : false}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className={styles.btns}>
        <button onClick={() => setOpen(false)} className={styles.close}>
          Cancel
        </button>
        <button className={`btn btn-primary ${styles.btn}`} onClick={action}>
          {btnText ? btnText : "Ok"}
        </button>
      </div>
    </div>
  )
}

export default Action
