import { parse } from "qs"
import { getIsILLAProductMode } from "@/redux/config/configSelector"
import store from "@/store"

export const generateUrlParams = () => {
  const href = window.location.href
  const query = href.split("?")[1]
  const queryArray = parse(query)
  let appURL = href
  const appUrlArray = window.location.pathname.split("/")
  if (getIsILLAProductMode(store.getState())) {
    appURL = window.location.origin + appUrlArray.slice(0, 5).join("/")
  }
  return {
    query: queryArray,
    url: href,
    appURL,
  }
}
