import { useState } from "react"
import { useAuthState } from "../../context/auth"
import Steps from "./steps/Steps"
import Basic from "./Basic"
import Descr from "./Descr"
import Attachment from "./Attachment"
import Categories from "./Categories"

const UploadForm = ({ categories, setCategories }) => {
  let [selected, setSelected] = useState(null)
  let [select, setSelect] = useState([])
  let [job, setJob] = useState({})
  const { user } = useAuthState()

  return (
    <div>
      <Steps selected={selected} setSelected={setSelected} id={job?.id} />
      {user.company && (
        <>
          {(selected == null || selected == "basic") && (
            <Basic
              setJob={setJob}
              job={job}
              setSelected={setSelected}
              categories={categories}
            />
          )}
          {selected == "desc" && job?.id && (
            <Descr
              setJob={setJob}
              job={job}
              setSelected={setSelected}
              categories={categories}
            />
          )}
          {selected == "att" && job?.id && (
            <Attachment job={job} setJob={setJob} />
          )}
          {selected == "cat" && job?.id && (
            <Categories
              job={job}
              setJob={setJob}
              categories={categories}
              setCategories={setCategories}
              selected={select}
              setSelected={setSelect}
            />
          )}
        </>
      )}
    </div>
  )
}

export default UploadForm
