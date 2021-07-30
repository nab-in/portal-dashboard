import React from "react"
import Category from "./Category"
import Card from "../cards/Card"

const Categories = ({ categories, setcategories }) => {
  console.log(categories)
  return (
    <div>
      <Card title="Categories">
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
      </Card>
    </div>
  )
}

export default Categories
