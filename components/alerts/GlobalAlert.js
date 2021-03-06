import { useEffect } from "react"
import { useAlertsState, useAlertsDispatch } from "../../context/alerts"
import { AiOutlineClose } from "react-icons/ai"

const GlobalAlert = () => {
  let { alert } = useAlertsState()
  let dispatch = useAlertsDispatch()
  let { message, type } = alert

  const close = () => {
    dispatch({
      type: "REMOVE",
    })
  }

  let timeout = setTimeout(() => {
    close()
  }, 20000)

  useEffect(() => {
    timeout
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      {alert.message && (
        <div
          className={
            alert.message
              ? `alerts removable ${type} open`
              : `alerts removable ${type}`
          }
        >
          <p>{message && message}</p>
          <AiOutlineClose className="icon" onClick={close} />
        </div>
      )}
    </>
  )
}

export default GlobalAlert
