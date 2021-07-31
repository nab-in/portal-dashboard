import styles from "./action.module.sass"
import Input from "../inputs/Input"
import data from "../../data/chart"

const Action = ({
  title,
  action,
  data,
  setData,
  setOpen,
  btnText,
  role,
  roles,
  setRole,
}) => {
  const handleSelectChange = (e) => {
    setRole(e.target.value)
  }
  return (
    <div className={styles.action}>
      <p>{title}</p>
      {setData && (
        <>
          <Input
            handleChange={(e) => setData({ ...data, date: e.target.value })}
            value={data.date}
            type="datetime-local"
          />
          <Input
            handleChange={(e) => setData({ ...data, location: e.target.value })}
            value={data.location}
            placeholder="Location"
            name="location"
          />
        </>
      )}
      {setRole && roles.length > 0 && (
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
      {setRole && roles.length == 0 && <p>No role to Add</p>}
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
