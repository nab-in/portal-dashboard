import { createContext, useReducer, useContext } from "react"
import Cookies from "js-cookie"
const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let { type, payload } = action
  let userCopy
  let rolesCopy
  let id
  switch (type) {
    case "LOGIN":
      Cookies.set("token", payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      }
    case "ADD_DP":
      userCopy = {
        ...state.user,
        dp: `http://localhost:5000${payload.path}`,
      }
      return {
        ...state,
        user: userCopy,
      }
    case "ADD_LOGO":
      userCopy = {
        ...state.user,
        company: {
          ...state.user.company,
          logo: `http://localhost:5000${payload.path}`,
        },
      }
      return {
        ...state,
        user: userCopy,
      }
    case "ADD_CV":
      userCopy = {
        ...state.user,
        cv: `http://localhost:5000${payload.path}`,
      }
      return {
        ...state,
        user: userCopy,
      }
    case "ADD_PROFILE":
      let id = Cookies.get("identity")
      if (id) id = JSON.parse(id)
      userCopy = { ...payload, identity: id }
      return {
        ...state,
        user: userCopy,
      }
    case "SELECT":
      userCopy = {
        ...state.user,
        identity: { id: payload.id, name: payload.name, value: payload.value },
        role: "admin",
      }
      Cookies.set("identity", JSON.stringify(payload))
      return {
        ...state,
        user: userCopy,
        loading: false,
      }

    case "COMPANY":
      userCopy = {
        ...state.user,
        company: payload,
      }
      return {
        ...state,
        user: userCopy,
        loading: false,
      }

    case "ROLES":
      return {
        ...state,
        roles: payload,
        loading: false,
      }

    case "ADD_ROLE":
      rolesCopy = [...state.roles]
      rolesCopy = rolesCopy.concat(payload)
      return {
        ...state,
        roles: rolesCopy,
      }

    case "REMOVE_ROLE":
      rolesCopy = [...state.roles]
      rolesCopy = rolesCopy.filter((el) => el.id != payload)
      return {
        ...state,
        roles: rolesCopy,
      }

    // Logout
    case "LOGOUT":
      Cookies.set("token", "")
      Cookies.set("identity", "")
      window.location.href = "/login"
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      }

    // Get user data
    case "AUTH":
      id = Cookies.get("identity")
      if (id) id = JSON.parse(id)
      userCopy = { ...payload, identity: id, role: id?.name }
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
    case "LOADING":
      return {
        ...state,
        loading: true,
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
    roles: [],
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
