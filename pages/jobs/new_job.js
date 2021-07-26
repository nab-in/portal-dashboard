import { useState } from "react"
import Link from "next/link"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Filter from "../../components/filter/Filter"
import UploadForm from "../../components/jobs/UploadForm"

const new_job = () => {
  let [selected, setSelected] = useState([])
  let [categories, setCategories] = useState([])
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
          <UploadForm
            selectedCategories={selected}
            setSelectedCategories={setSelected}
            categories={categories}
            setCategories={setCategories}
          />
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

export default new_job
