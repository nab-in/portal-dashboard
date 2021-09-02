import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { API } from "../../components/api"
import axios from "axios"
import { config } from "../../components/config"
import MainContents from "../../components/templates/MainContents"
import SubContents from "../../components/templates/SubContents"
import Profile from "../../components/profile_template/profile/Profile"

// add verify action to the profile card

const companyDetails = () => {
  const [company, setCompany] = useState(null)
  const router = useRouter()
  useEffect(() => {
    axios
      .get(`${API}/companies/${router.query.id}`, config)
      .then((res) => {
        setCompany(res.data)
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
              <Link href="/companies">Companies</Link>
            </span>
            <span>/</span>
            {company && <span>{company.name}</span>}
          </div>
          <div className="mobile__link">
            <Link href={`/companies/${company?.id}/jobs`}>View Jobs</Link>
          </div>
          {company && <Profile details={company} />}
        </MainContents>
        <SubContents>
          <Link href={`/companies/${company?.id}/jobs`}>
            <a className="sub_btn span__full btn btn-primary">View Jobs</a>
          </Link>
        </SubContents>
      </div>
    </div>
  )
}

export default companyDetails
