import styles from "./action.module.sass"
import Input from "../inputs/Input"
import rippleEffect from "../rippleEffect.js"
import Loader from "../loaders/ButtonLoader"

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
  password,
  setPassword,
  username,
  setUsername,
  loading,
}) => {
  const handleSelectChange = (e) => {
    setRole(e.target.value)
  }

  return (
    <div className={styles.action}>
      <p>{title}</p>
      {setPassword && (
        <Input
          handleChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Enter your password"
        />
      )}
      {setUsername && (
        <Input
          handleChange={(e) => setUsername(e.target.value)}
          value={username}
          name="username"
          title="Enter username of user to transfer this company to"
          placeholder="Enter username"
        />
      )}
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
      {setRole && roles?.length > 0 && (
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
        <button
          className={`btn btn-primary ${styles.btn}`}
          onClick={(e) => {
            rippleEffect(e)
            action()
          }}
        >
          {btnText ? btnText : "Ok"}
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <></>
          )}
        </button>
      </div>
    </div>
  )
}

export default Action
