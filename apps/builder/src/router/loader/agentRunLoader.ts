import { getAIAgentMarketplaceInfo } from "@illa-public/market-agent"
import { ILLAMixpanel } from "@illa-public/mixpanel-utils"
import { getCurrentTeamInfo, teamActions } from "@illa-public/user-data"
import { LoaderFunction, defer, redirect } from "react-router-dom"
import {
  fetchAgentContributeState,
  fetchAgentDetail,
  fetchContributedAgentDetail,
} from "@/services/agent"
import { fetchMyTeamsInfo } from "@/services/team"
import store from "@/store"
import { getUserInfoLoader } from "./cloudAuthLoader"

const fetchAgentFullData = async (
  agentId: string,
  ownerTeamIdentifier: string,
  myTeamIdentifier: string,
) => {
  const teamInfo = getCurrentTeamInfo(store.getState())

  if (!teamInfo) {
    const info = await fetchMyTeamsInfo()
    const currentTeamInfo = info.data.find(
      (item) => item.identifier === myTeamIdentifier,
    )
    if (currentTeamInfo) {
      store.dispatch(teamActions.updateCurrentIdReducer(currentTeamInfo.id))
      ILLAMixpanel.setGroup(myTeamIdentifier)
      store.dispatch(teamActions.updateTeamItemsReducer(info.data))
    } else {
      return redirect("/404")
    }
  }

  const isContribute = await fetchAgentContributeState(
    agentId,
    ownerTeamIdentifier,
  )

  let agent, marketplace

  if (isContribute.data.isPublishedToMarketplace) {
    agent = await fetchContributedAgentDetail(agentId, ownerTeamIdentifier)
    marketplace = await getAIAgentMarketplaceInfo(agentId)
    return {
      agent: agent.data,
      marketplace: marketplace.data,
    }
  } else {
    agent = await fetchAgentDetail(agentId)
    return {
      agent: agent.data,
      marketplace: undefined,
    }
  }
}

export const agentRunLoader: LoaderFunction = async (args) => {
  await getUserInfoLoader(args)
  const { agentID, ownerTeamIdentifier } = args.params
  const myTeamIdentifier = new URL(args.request.url).searchParams.get(
    "myTeamIdentifier",
  )

  if (agentID && ownerTeamIdentifier && myTeamIdentifier) {
    return defer({
      data: fetchAgentFullData(agentID, ownerTeamIdentifier, myTeamIdentifier),
    })
  } else {
    return redirect("/404")
  }
}
