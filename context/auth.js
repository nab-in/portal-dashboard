import React, { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"
const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  let userCopy
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      }

    case "SELECT":
      userCopy = { ...state.user, identity: payload }
      Cookies.set("identity", payload)
      return {
        ...state,
        user: userCopy,
      }

    // Logout
    case "LOGOUT":
      Cookies.set("token", "")
      Cookies.set("itentity", "")
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }

    // Get user data
    case "AUTH":
      let id = Cookies.get("identity")
      userCopy = { payload, identity: id }
      return {
        ...state,
        user: userCopy,
        isAuthenticated: true,
      }
    default:
      return {
        state,
      }
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  })
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
