import { LoaderFunction, defer } from "react-router-dom"
import { AgentRawInitial } from "@/redux/aiAgent/aiAgentState"
import { fetchAgentDetail } from "@/services/agent"

export const agentLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (agentId) {
    return defer({
      agent: fetchAgentDetail(agentId),
    })
  } else {
    const initial = async () => AgentRawInitial

    return defer({
      agent: initial(),
    })
  }
}
