import Filter from "../filter/Filter"

const Categories = ({ categories, setCategories, selected, setSelected }) => {
  return (
    <div>
      <Filter
        categories={categories}
        setCategories={setCategories}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  )
}

export default Categories
