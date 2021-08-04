import { useCategoriesState } from "../../../context/categories"
import Input from "../../inputs/Input"
import Category from "./Category"
import styles from "./search.module.sass"

const Search = ({ setSearch, search }) => {
  const { categories } = useCategoriesState()
  const handleChange = (e) => {
    let { name, value } = e.target
    setSearch({ ...search, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.search}>
      <h2>Filter By</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <Input
            handleChange={(e) => handleChange(e)}
            placeholder="Keyword"
            inputClass="filter_input"
            name="keyword"
            value={search.keyword}
          />
          <Input
            handleChange={(e) => handleChange(e)}
            inputClass="filter_input"
            name="location"
            placeholder="Location"
            value={search.location}
          />
        </div>
        {categories?.length > 0 && (
          <div>
            {categories.map((category) => (
              <Category
                key={category.id}
                category={category}
                search={search}
                setSearch={setSearch}
              />
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default Search
