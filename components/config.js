import Cookies from "js-cookie"

let token = Cookies.get("token")
export const config = {
  headers: {
    Authorization: `Bearer ` + token,
  },
}
