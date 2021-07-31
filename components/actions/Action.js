import styles from "./action.module.sass"

const Action = ({ title, action, date, setDate, setOpen }) => {
  const handleChange = (e) => {
    setDate(e.target.value)
  }
  return <div>Action</div>
}

export default Action
