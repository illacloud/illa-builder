import { LoaderFunction, redirect } from "react-router-dom"
import { translateSearchParamsToURLPathWithSelfHost } from "../utils/translateQS"

export const selfHostLandingLoader: LoaderFunction = async (args) => {
  const url = new URL(args.request.url)
  const searchParams = url.searchParams
  const landingPath = translateSearchParamsToURLPathWithSelfHost(searchParams)
  return redirect(landingPath)
}
