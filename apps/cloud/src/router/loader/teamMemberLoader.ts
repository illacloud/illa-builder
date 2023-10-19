import { teamActions } from "@illa-public/user-data"
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom"
import { fetchMemberList } from "@/services/team"
import { store } from "@/store"
import { canMemberAccess } from "./accessUtils"
import { getTeamsInfoLoader, getUserInfoLoader } from "./authLoader"

export const teamMemberLoader = async (args: LoaderFunctionArgs) => {
  const { params, request } = args
  const isLogin = await getUserInfoLoader()
  if (isLogin) {
    const { teamIdentifier } = params
    const teamList = await getTeamsInfoLoader()
    const team = teamList.find((team) => team.identifier === teamIdentifier)
    if (!team) {
      return redirect("/404")
    }
    const canManageMember = canMemberAccess(team)
    if (canManageMember) {
      store.dispatch(teamActions.updateCurrentIdReducer(team.id))
      return defer({
        memberList: fetchMemberList(team.id).then((res) => res.data),
      })
    } else {
      const redirectURL = new URL(request.url)
      return redirect(
        `/403?redirectURL=${encodeURIComponent(redirectURL.toString())}`,
      )
    }
  } else {
    return redirect("/login")
  }
}
