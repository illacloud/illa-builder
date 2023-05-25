import { LoaderFunction, redirect } from "react-router-dom"
import { beautifyURLLoader } from "./beautifyURLLoader"
import { getTeamsInfoLoader, getUserInfoLoader } from "./cloudAuthLoader"
import {
  getSelfHostTeamsInfoLoader,
  getSelfHostUserInfoLoader,
} from "./selfHostAuthLoader"

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

export const combineSelfHostAuthLoader: LoaderFunction = async (args) => {
  try {
    const userInfoResponse = await getSelfHostUserInfoLoader(args)
    const teamsInfoResponse = await getSelfHostTeamsInfoLoader(args)
    if (userInfoResponse || teamsInfoResponse) {
      return userInfoResponse || teamsInfoResponse
    }
    return await beautifyURLLoader(args)
  } catch (e) {
    return redirect("/500")
  }
}
