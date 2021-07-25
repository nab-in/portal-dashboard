import { useEffect, useState } from "react"
import { useAuthState } from "../../context/auth"
import Steps from "./steps/Steps"
import Basic from "./Basic"
import Descr from "./Descr"
import Attachment from "./Attachment"

const UploadForm = () => {
  let [selected, setSelected] = useState(null)
  let [job, setJob] = useState({})
  const { user } = useAuthState()

  return (
    <div>
      <Steps selected={selected} setSelected={setSelected} id={job?.id} />
      {user.company && (
        <>
          {(selected == null || selected == "basic") && (
            <Basic setJob={setJob} job={job} setSelected={setSelected} />
          )}
          {selected == "desc" && job?.id && (
            <Descr setJob={setJob} job={job} setSelected={setSelected} />
          )}
          {selected == "att" && job?.id && (
            <Attachment job={job} setJob={setJob} />
          )}
        </>
      )}
    </div>
  )
}

export default UploadForm
