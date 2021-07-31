import { AiOutlineClose } from "react-icons/ai"
import FilterItem from "./FilterItem"

const Filter = ({ search, setSearch }) => {
  return (
    <>
      {search.keyword ||
        search.location ||
        (search.categories.length > 0 && (
          <div className="filter__criteria">
            <h2>Criteria</h2>
            {search?.keyword && (
              <div className="criteria">
                <div className="criteria__title">Keyword:</div>
                <div className="criteria__showcase">
                  <span>
                    {search.keyword}
                    <span
                      className="close"
                      onClick={() =>
                        setSearch({
                          ...search,
                          keyword: "",
                        })
                      }
                    >
                      <AiOutlineClose className="icon" />
                    </span>
                  </span>
                </div>
              </div>
            )}
            {search?.location && (
              <div className="criteria">
                <div className="criteria__title">Location:</div>
                <div className="criteria__showcase">
                  <span>
                    {search.location}
                    <span
                      className="close"
                      onClick={() =>
                        setSearch({
                          ...search,
                          location: "",
                        })
                      }
                    >
                      <AiOutlineClose className="icon" />
                    </span>
                  </span>
                </div>
              </div>
            )}
            {search?.categories?.length > 0 &&
              search.categories.map((category) => (
                <div key={category.id}>
                  {category.sub_categories.length > 0 && (
                    <div className="criteria">
                      <div className="criteria__title">{category.name}:</div>
                      <div className="criteria__showcase">
                        {category.sub_categories.map((sub) => (
                          <FilterItem
                            key={sub.id}
                            sub={sub}
                            setSearch={setSearch}
                            category={category}
                            search={search}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
    </>
  )
}

export default Filter
