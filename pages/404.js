import Error from "../components/error/Error"
import Link from "next/link"

export default function Custom404() {
  return (
    <div>
      <div className="content">
        <div className="bread__crumb">
          <span>
            <Link href="/">Home</Link>
          </span>
          <span>/</span>
          <span>404 Page not found</span>
        </div>
        <Error />
      </div>
    </div>
  )
}
