import Error from "../components/error/Error"
import Link from "next/link"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

export default function Custom404() {
  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>404</span>
          </div>
          <Error />
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
