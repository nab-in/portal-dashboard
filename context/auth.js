import React, { createContext, useReducer, useContext } from "react"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      }

    case "SELECT":
      let userCopy = { ...user, identity: payload }
      return {
        ...state,
        user: userCopy,
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
