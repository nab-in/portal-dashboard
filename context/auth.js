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
        loading: false,
      }

    case "SELECT":
      userCopy = {
        ...state.user,
        identity: { id: payload.id, name: payload.name },
      }
      Cookies.set("identity", JSON.stringify(payload))
      return {
        ...state,
        user: userCopy,
        loading: false,
      }

    // Logout
    case "LOGOUT":
      Cookies.set("token", "")
      Cookies.set("itentity", "")
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }

    // Get user data
    case "AUTH":
      let id = Cookies.get("identity")
      userCopy = { ...payload, identity: id }
      return {
        ...state,
        user: userCopy,
        isAuthenticated: true,
        loading: false,
      }
    case "NOT_LOADED":
      return {
        ...state,
        loading: false,
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
    loading: true,
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
