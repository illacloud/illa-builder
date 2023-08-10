import { LoaderFunction, defer } from "react-router-dom"
import { AgentInitial } from "@/redux/aiAgent/aiAgentState"
import { fetchAgentDetail } from "@/services/agent"

const getAgentInitData = async (agentId?: string) => {
  if (agentId) {
    const agent = await fetchAgentDetail(agentId)
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
  const { agentId } = args.params
  return defer({
    data: getAgentInitData(agentId),
  })
}
