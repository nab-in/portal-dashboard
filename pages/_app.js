import { useState, useEffect } from "react"
import "../styles/globals.sass"
import { useRouter } from "next/router"
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth"
import Layout from "../components/layout/Layout"
import Cookies from "js-cookie"
import { API } from "../components/api"
import axios from "axios"

function MyApp({ Component, pageProps }) {
  const Site = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useAuthDispatch()
    const { user, isAuthenticated } = useAuthState()
    const router = useRouter()

    useEffect(() => {
      let token = Cookies.get("token")
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      }
      if (!user && token)
        axios
          .get(`${API}/me`, config)
          .then((res) => {
            console.log(res.data)
            dispatch({
              type: "AUTH",
              payload: res.data,
            })
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            console.log(err)
          })
      if (!user && !isAuthenticated && !token) setLoading(false)
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
      <Site />
    </AuthProvider>
  )
}

export default MyApp
