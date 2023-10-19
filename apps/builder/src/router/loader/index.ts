import { LoaderFunction, redirect } from "react-router-dom"
import { beautifyURLLoader } from "./beautifyURLLoader"
import { getTeamsInfoLoader, getUserInfoLoader } from "./cloudAuthLoader"

export const combineCloudAuthLoader: LoaderFunction = async (args) => {
  try {
    const userInfoResponse = await getUserInfoLoader(args)
    const teamsInfoResponse = await getTeamsInfoLoader(args)
    if (userInfoResponse || teamsInfoResponse) {
      return userInfoResponse || teamsInfoResponse
    }
    return await beautifyURLLoader(args)
  } catch (e) {
    return redirect("/403")
  }
}
