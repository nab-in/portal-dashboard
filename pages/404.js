import Error from "../components/error/Error"
import MainContents from "../components/templates/MainContents"
import SubContents from "../components/templates/SubContents"

export default function Custom404() {
  return (
    <div>
      <div className="content">
        <MainContents>
          <Error />
        </MainContents>
        <SubContents></SubContents>
      </div>
    </div>
  )
}
