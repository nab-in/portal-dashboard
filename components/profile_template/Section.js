import styles from "./template.module.sass"

const Section = ({ title, children }) => {
  return (
    <section className={styles.section}>
      <header>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  )
}

export default Section
