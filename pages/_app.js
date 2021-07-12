import { useState, useEffect } from "react"
import "../styles/globals.sass"
import { useRouter } from "next/router"
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth"
import Layout from "../components/layout/Layout"
import Cookies from "js-cookie"
import { API } from "../components/api"
import axios from "axios"
import Login from "../components/login/Login"

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
      axios
        .get(`${API}/me`, config)
        .then((res) => {
          if (!user)
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
    }, [])
    useEffect(() => {
      if (isAuthenticated && !user.identity) router.push("/select_identity")
    }, [])
    if (router.pathname.startsWith("/select_identity")) {
      return <Component {...pageProps} />
    } else {
      return (
        <>
          {loading ? (
            <></>
          ) : (
            <>
              {isAuthenticated ? (
                <>
                  <Layout loading={loading}>
                    <Component {...pageProps} />
                  </Layout>
                </>
              ) : (
                <Login />
              )}
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
