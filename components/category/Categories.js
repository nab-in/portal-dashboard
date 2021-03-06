import Category from "./Category"
import Card from "../cards/Card"
import { useCategoriesState } from "../../context/categories"

const Categories = () => {
  const { categories } = useCategoriesState()
  return (
    <div>
      <Card title="Categories">
        {categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <Category category={category} key={category.id} />
            ))}
          </>
        ) : (
          <p
            style={{
              background: "white",
              padding: "1rem",
            }}
          >
            No job category found
          </p>
        )}
      </Card>
    </div>
  )
}

export default Categories
