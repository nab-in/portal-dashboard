import React, { Children } from "react"
import { withRouter } from "next/router"
import Link from "next/link"

const ActiveLink = ({ router, children, as, href, ...rest }) => {
  return (
    <Link {...rest} href={href} as={as}>
      {React.cloneElement(Children.only(children), {
        className:
          router.pathname === href || router.pathname === as ? `active` : null,
      })}
    </Link>
  )
}

export default withRouter(ActiveLink)
