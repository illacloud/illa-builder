import { LoaderFunctionArgs } from "react-router-dom"
import { needSavedSearchParams } from "../constant"
import { removeIgnoredQS } from "../utils/translateQS"

export const beautifyURLLoader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const searchParams = url.searchParams

  let canRedirect = false
  for (let i = 0; i < needSavedSearchParams.length; i++) {
    if (searchParams.has(needSavedSearchParams[i])) {
      canRedirect = true
      break
    }
  }

  const qs = removeIgnoredQS(searchParams)

  if (canRedirect) {
    url.search = qs
    window.history.replaceState(null, "", url.toString())
  }
  return null
}
