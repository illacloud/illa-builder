import { getCurrentTeamInfo } from "@illa-public/user-data"
import { LoaderFunction, defer } from "react-router-dom"
import { AgentInitial } from "@/page/AI/AIAgent/interface"
import { fetchAgentDetail } from "@/services/agent"
import store from "@/store"

const getAgentInitData = async (agentID?: string) => {
  if (agentID) {
    const agent = await fetchAgentDetail(agentID)
    return {
      agent: agent.data,
    }
  } else {
    const currentTeamInfo = getCurrentTeamInfo(store.getState())!!
    return {
      agent: {
        ...AgentInitial,
        teamID: currentTeamInfo.id,
        teamIdentifier: currentTeamInfo.identifier,
        teamIcon: currentTeamInfo.icon,
      },
    }
  }
}
export const agentLoader: LoaderFunction = async (args) => {
  const { agentID } = args.params
  return defer({
    data: getAgentInitData(agentID),
  })
}
