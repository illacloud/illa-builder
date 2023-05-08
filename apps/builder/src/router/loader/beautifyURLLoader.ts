import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { needSavedSearchParams } from "../constant"
import { removeIgnoredQS } from "../utils/translateQS"

export const beautifyURLLoader = async (args: LoaderFunctionArgs) => {
  const { request } = args
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const path = url.pathname

  let canRedirect = false
  for (let i = 0; i < needSavedSearchParams.length; i++) {
    if (searchParams.has(needSavedSearchParams[i])) {
      canRedirect = true
      break
    }
  }

  const qs = removeIgnoredQS(searchParams)

  if (canRedirect) {
    return redirect(`${path}${qs}`)
  }
  return null
}
