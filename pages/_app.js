import { useEffect } from "react"
import "../styles/globals.sass"
import { useRouter } from "next/router"
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth"
import Layout from "../components/layout/Layout"
import Alert from "../components/alerts/GlobalAlert"
import Cookies from "js-cookie"
import { config } from "../components/config"
import { API } from "../components/api"
import axios from "axios"
import { AlertsProvider } from "../context/alerts"
import { CategoriesProvider } from "../context/categories"

function MyApp({ Component, pageProps }) {
  const Site = () => {
    const dispatch = useAuthDispatch()
    const { user, loading } = useAuthState()
    const router = useRouter()

    useEffect(() => {
      let token = Cookies.get("token")
      if (!user && !token)
        dispatch({
          type: "NOT_LOADED",
        })
      if (!user && token)
        axios
          .get(`${API}/me`, config)
          .then((res) => {
            dispatch({
              type: "AUTH",
              payload: res?.data,
            })
          })
          .catch((err) => {
            dispatch({
              type: "NOT_LOADED",
            })
            console.log(err)
          })
    }, [])

    if (
      router.pathname.startsWith("/select_identity") ||
      router.pathname.startsWith("/login")
    ) {
      return <Component {...pageProps} />
    } else {
      return (
        <>
          {loading ? (
            <></>
          ) : (
            <>
              <Layout loading={loading}>
                <Component {...pageProps} />
              </Layout>
            </>
          )}
        </>
      )
    }
  }
  return (
    <AuthProvider>
      <CategoriesProvider>
        <AlertsProvider>
          <Site />
          <Alert />
        </AlertsProvider>
      </CategoriesProvider>
    </AuthProvider>
  )
}

export default MyApp
