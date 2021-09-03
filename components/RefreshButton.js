import { GrRefresh } from "react-icons/gr"

const RefreshButton = ({ loading }) => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "1rem",
      }}
    >
      <button
        onClick={refresh}
        style={{
          fontSize: "1.5rem",
        }}
        className={loading ? "spinner" : ""}
      >
        <GrRefresh className="icon" />
      </button>
    </div>
  )
}

export default RefreshButton
