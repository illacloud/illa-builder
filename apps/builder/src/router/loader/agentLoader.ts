import { LoaderFunction, defer } from "react-router-dom"
import { AgentInitial } from "@/page/AI/AIAgent/interface"
import { fetchAgentDetail } from "@/services/agent"

const getAgentInitData = async (agentID?: string) => {
  if (agentID) {
    const agent = await fetchAgentDetail(agentID)
    return {
      agent: agent.data,
    }
  } else {
    return {
      agent: AgentInitial,
    }
  }
}
export const agentLoader: LoaderFunction = async (args) => {
  const { agentID } = args.params
  return defer({
    data: getAgentInitData(agentID),
  })
}
