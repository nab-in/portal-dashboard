import React, { useEffect } from "react"
import Category from "./Category"
import Card from "../cards/Card"

const Categories = ({ categories, setcategories }) => {
  return (
    <div>
      <Card title="Categories">
        {categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <Category
                category={category}
                categories={categories}
                key={category.id}
              />
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
