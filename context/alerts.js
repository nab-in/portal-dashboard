import React, { createContext, useReducer, useContext } from "react"

const AlertsStateContext = createContext()
const AlertsDispatchContext = createContext()

const alertsReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "ADD":
      let { message, type } = payload
      return {
        ...state,
        alert: {
          message,
          type,
        },
      }
    case "REMOVE":
      return {
        ...state,
        alert: {
          message: "",
          type: "",
        },
      }
    default:
      return {
        state,
      }
  }
}

export const AlertsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertsReducer, {
    alert: {
      message: "",
      type: "",
    },
  })
  return (
    <AlertsDispatchContext.Provider value={dispatch}>
      <AlertsStateContext.Provider value={state}>
        {children}
      </AlertsStateContext.Provider>
    </AlertsDispatchContext.Provider>
  )
}

export const useAlertsState = () => useContext(AlertsStateContext)
export const useAlertsDispatch = () => useContext(AlertsDispatchContext)
