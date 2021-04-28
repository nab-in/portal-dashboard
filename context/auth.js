import React, { createContext, useReducer, useContext } from "react"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: payload?.verified === true ? true : false,
        user: payload,
      }
  
    // Logout
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    // Get user data
    case "AUTH":
      return {
        ...state,
        user: payload,
        isAuthenticated: payload?.verified === true? true: false
      }
    default:
      return {
        state,
      }
  }
}
