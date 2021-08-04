import { createContext, useReducer, useContext } from "react"
const CategoriesStateContext = createContext()
const CategoriesDispatchContext = createContext()

const categoriesReducer = (state, action) => {
  let { type, payload } = action
  let categoriesCopy
  let data
  let filter = []
  switch (type) {
    case "REMOVE":
      return {
        ...state,
        loading: false,
      }

    case "FAIL":
      return {
        ...state,
        loading: false,
      }

    case "ADD_CATEGORY":
      categoriesCopy = [...state.categories]
      categoriesCopy = categoriesCopy.concat(payload)

      return {
        ...state,
        loading: false,
        categories: categoriesCopy,
      }

    case "ADD_SUBCATEGORY":
      const { subcategory, id } = payload
      categoriesCopy = [...state.categories]
      let categoryIndex = categoriesCopy.findIndex((el) => el.id == id)

      if (!id) {
        categoriesCopy = categoriesCopy.concat(subcategory)
      } else {
        if (categoriesCopy[categoryIndex]?.children?.length > 0) {
          categoriesCopy[categoryIndex] = {
            ...categoriesCopy[categoryIndex],
            children:
              categoriesCopy[categoryIndex].children.concat(subcategory),
          }
        } else {
          categoriesCopy[categoryIndex] = {
            ...categoriesCopy[categoryIndex],
            children: [subcategory],
          }
        }
      }

      return {
        ...state,
        categories: categoriesCopy,
        loading: false,
      }
    case "LOAD":
      data = payload
      data.forEach((el) => {
        if (el.children) filter = filter.concat(el.children)
      })
      filter.forEach((el) => {
        data = data.filter((o) => o.id != el.id)
      })
      return {
        ...state,
        loading: false,
        categories: data,
      }
    default:
      return {
        state,
      }
  }
}

export const CategoriesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoriesReducer, {
    loading: true,
    categories: [],
  })
  return (
    <CategoriesDispatchContext.Provider value={dispatch}>
      <CategoriesStateContext.Provider value={state}>
        {children}
      </CategoriesStateContext.Provider>
    </CategoriesDispatchContext.Provider>
  )
}

export const useCategoriesState = () => useContext(CategoriesStateContext)
export const useCategoriesDispatch = () => useContext(CategoriesDispatchContext)
