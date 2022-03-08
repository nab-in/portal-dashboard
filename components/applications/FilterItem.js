import { AiOutlineClose } from "react-icons/ai"
const FilterItem = ({ keyword, setKeyword, setResults }) => {
  const removeCriteria = () => {
    setKeyword("")
    setResults(null)
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
