import { createContext, useReducer, useContext } from "react"
const CategoriesStateContext = createContext()
const CategoriesDispatchContext = createContext()

const categoriesReducer = (state, action) => {
  let { type, payload } = action
  let categoriesCopy
  let categoryIndex
  let subCategoryIndex
  let data
  let filter = []
  switch (type) {
    case "REMOVE":
      categoriesCopy = [...state.categories]
      if (payload?.type == "parent") {
        categoriesCopy = categoriesCopy.filter((el) => el.id != payload?.id)
      } else if (payload?.type == "child") {
        categoryIndex = categoriesCopy.findIndex(
          (el) => el.id == payload?.parent
        )
        categoriesCopy[categoryIndex] = {
          ...categoriesCopy[categoryIndex],
          children: categoriesCopy[categoryIndex]?.children?.filter(
            (el) => el.id != payload?.id
          ),
        }
      }

      return {
        ...state,
        loading: false,
        categories: categoriesCopy,
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
      let { subcategory, id } = payload
      categoriesCopy = [...state.categories]
      categoryIndex = categoriesCopy.findIndex((el) => el.id === id)

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

    case "TOGGLE_VERIFY":
      categoriesCopy = [...state.categories]
      if (payload?.parent) {
        // find parent
        categoryIndex = categoriesCopy.findIndex(
          (el) => el.id === payload?.parent
        )
        // find child
        subCategoryIndex = categoriesCopy[categoryIndex].children?.findIndex(
          (el) => el.id === payload?.category?.id
        )

        // update state
        categoriesCopy[categoryIndex].children[subCategoryIndex] = {
          ...categoriesCopy[categoryIndex].children[subCategoryIndex],
          verified: payload?.category?.verified,
        }
      } else {
        // find parent
        categoryIndex = categoriesCopy.findIndex(
          (el) => el.id === payload?.category?.id
        )

        // update state
        categoriesCopy[categoryIndex] = {
          ...categoriesCopy[categoryIndex],
          verified: payload?.category.verified,
        }
      }

      return {
        ...state,
        categories: categoriesCopy,
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
