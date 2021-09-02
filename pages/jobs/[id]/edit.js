import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API } from "../../../components/api"
import axios from "axios"
import { config } from "../../../components/config"
import MainContents from "../../../components/templates/MainContents"
import SubContents from "../../../components/templates/SubContents"
import Filter from "../../../components/filter/Filter"
import UploadForm from "../../../components/jobs/UploadForm"

const edit = () => {
  let [selected, setSelected] = useState([])
  let [categories, setCategories] = useState([])
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
            {job && (
              <>
                <span>
                  <Link href={`/jobs/${job?.id}`}>{job.name}</Link>
                </span>
                <span>/</span>
              </>
            )}
            <span>Edit</span>
          </div>
          {job && (
            <UploadForm
              selectedCategories={selected}
              setSelectedCategories={setSelected}
              categories={categories}
              setCategories={setCategories}
              jobDetails={job}
            />
          )}
        </MainContents>
        <SubContents>
          <div className="desktop_filter">
            <Filter
              selected={selected}
              setSelected={setSelected}
              selectedCategories={categories}
              setCategories={setCategories}
            />
          </div>
        </SubContents>
      </div>
    </div>
  )
}

export default edit
