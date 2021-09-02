import styles from "./card.module.sass"

const Card = ({ title, children }) => {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <article>{children}</article>
    </section>
  )
}

export default Card
