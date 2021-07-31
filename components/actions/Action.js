import styles from "./action.module.sass"
import Input from "../inputs/Input"

const Action = ({ title, action, date, setDate, setOpen, btnText }) => {
  const handleChange = (e) => {
    setDate(e.target.value)
  }
  return (
    <div className={styles.action}>
      <p>{title}</p>
      {setDate && (
        <Input handleChange={handleChange} value={date} type="datetime-local" />
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
