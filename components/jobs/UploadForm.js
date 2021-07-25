import { useEffect, useState } from "react"
import { useAuthState } from "../../context/auth"
import Steps from "./steps/Steps"

const UploadForm = () => {
  let [selected, setSelected] = useState(null)
  const { user } = useAuthState()

  return (
    <div>
      <Steps />
      {user.company && <></>}
    </div>
  )
}

export default UploadForm
