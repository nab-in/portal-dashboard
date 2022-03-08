import FilterItem from "./FilterItem"

const Filter = ({ keyword, setKeyword, setResults }) => {
  return (
    <>
      {keyword?.trim().length > 0 && (
        <div className="filter__criteria">
          <div className="criteria">
            <div className="criteria__title">Keyword:</div>
            <div className="criteria__showcase">
              <FilterItem
                keyword={keyword}
                setKeyword={setKeyword}
                setResults={setResults}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Filter
