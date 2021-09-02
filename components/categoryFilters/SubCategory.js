import styles from "./sub.module.sass"

const SubCategory = ({ sub }) => {
  let { name } = sub

  return (
    <div className={styles.sub__category}>
      <div className={styles.label}>
        <span>{name}</span>
      </div>
    </div>
  )
}

export default SubCategory
