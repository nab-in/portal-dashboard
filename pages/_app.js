import "../styles/globals.sass"
import { AuthProvider } from "../context/auth"
import Layout from "../components/layout/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <Layout>
          <Component {...pageProps} />
       </Layout>
    </AuthProvider>
  )
}

export default MyApp
