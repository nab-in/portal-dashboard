import { AiOutlineClose } from "react-icons/ai"
const FilterItem = ({ keyword, setKeywords, keywords }) => {
  let keywordsCopy = keywords
  let keywordIndex = keywordsCopy.findIndex((u) => u == keyword)
  const removeCriteria = () => {
    if (keywordIndex >= 0) {
      keywordsCopy = keywordsCopy.filter((u) => u != keyword)
      setKeywords(keywordsCopy)
    }
  }
  return (
    <span>
      {keyword}
      <span onClick={removeCriteria} className="close">
        <AiOutlineClose className="icon" />
      </span>
    </span>
  )
}

export default FilterItem
