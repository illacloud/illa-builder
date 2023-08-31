import { getTeamItems } from "@illa-public/user-data"
import { LoaderFunctionArgs, defer, redirect } from "react-router-dom"
import { fetchUpdateMembers } from "@/services/team"
import store from "@/store"

export const teamMemberLoader = async (args: LoaderFunctionArgs) => {
  const { params } = args
  const { teamIdentifier } = params
  const teamList = getTeamItems(store.getState())
  const team = teamList?.find((team) => team.identifier === teamIdentifier)
  if (!team) {
    return redirect("/404")
  } else {
    return defer({
      memberList: fetchUpdateMembers().then((res) => {
        return res.data
      }),
    })
  }
}
