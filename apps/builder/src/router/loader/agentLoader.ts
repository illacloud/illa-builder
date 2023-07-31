import { LoaderFunction, redirect } from "react-router-dom"
import { AgentInitial } from "@/redux/aiAgent/aiAgentState"
import { fetchAgentDetail } from "@/services/agent"

export const agentLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (agentId) {
    try {
      const agent = await fetchAgentDetail(agentId)
      return {
        agent: agent.data,
      }
    } catch (e) {
      return redirect("/404")
    }
  } else {
    return {
      agent: AgentInitial,
    }
  }
}
