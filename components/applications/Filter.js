import FilterItem from "./FilterItem"

const Filter = ({ keywords, setKeywords }) => {
  return (
    <>
      {keywords.length > 0 && (
        <div className="filter__criteria">
          <div className="criteria">
            <div className="criteria__title">Keyword:</div>
            <div className="criteria__showcase">
              {keywords.map((keyword, index) => (
                <FilterItem
                  key={index}
                  keyword={keyword}
                  setKeywords={setKeywords}
                  keywords={keywords}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Filter
