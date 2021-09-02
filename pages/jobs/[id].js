import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "../../components/api"
import { config } from "../../components/config"
import axios from "axios"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Details from "../../components/job/Details"

const jobDetails = () => {
  const [job, setJob] = useState(null)
  const router = useRouter()
  useEffect(() => {
    axios
      .get(
        `${API}/jobs/${router.query?.id}?fields=name,title,closeDate,created,company,id,description,bio,location,email,attachment`,
        config
      )
      .then((res) => {
        setJob(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
            {job && <span>{job.name}</span>}
          </div>
          <div className="mobile__link">
            <Link href={`/jobs/${job?.id}/edit`}>Edit Job</Link>
          </div>
          {job && <Details job={job} />}
        </MainContents>
        <SubContents>
          <Link href={`/jobs/${job?.id}/edit`}>
            <a className="sub_btn span__full btn btn-primary">Edit Job</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default jobDetails
