import { useCategoriesState } from "../../context/categories"
import styles from "./categories.module.sass"
import SubCategory from "./SubCategory"
import Accordion from "../accordion/Accordion"

const Category = ({ category }) => {
  const { categories } = useCategoriesState()

  return (
    <div className={styles.category}>
      <Accordion
        title={category?.name}
        key={category?.id}
        categories={categories}
      >
        {category?.children?.length > 0 &&
          category.children.map(({ id, name }) => (
            <SubCategory key={id} name={name} id={id} />
          ))}
      </Accordion>
    </div>
  )
}

export default Category
