import Accordion from "../accordion/Accordion"
import styles from "./categories.module.sass"

const Category = ({ category }) => {
  return (
    <div className={styles.category}>
      <Accordion title={category.name} key={category.id}>
        {category.children?.length > 0 &&
          category.children.map(({ id, name }) => (
            <article key={id}>{name}</article>
          ))}
      </Accordion>
    </div>
  )
}

export default Category
