import Link from "next/link"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Filter from "../../components/filter/Filter"
import UploadForm from "../../components/jobs/UploadForm"

const new_job = () => {
  return (
    <div>
      <div className="content">
        <MainContents>
          <div className="bread__crumb">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>/</span>
            <span>
              <Link href="/jobs">Jobs</Link>
            </span>
            <span>/</span>
            <span>New</span>
          </div>
          <UploadForm />
        </MainContents>
        <SubContents>
          <Filter />
        </SubContents>
      </div>
    </div>
  )
}

export default new_job
