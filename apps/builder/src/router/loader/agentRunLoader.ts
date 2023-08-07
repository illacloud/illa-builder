import { LoaderFunction, redirect } from "react-router-dom"
import { fetchAgentDetail, getAIAgentMarketplaceInfo } from "@/services/agent"

export const agentRunLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (agentId) {
    try {
      const agent = await fetchAgentDetail(agentId)
      let marketInfo = undefined
      if (agent.data.publishedToMarketplace) {
        marketInfo = await getAIAgentMarketplaceInfo(agentId)
      }
      return {
        agent: agent.data,
        marketplaceInfo: marketInfo ? marketInfo.data : undefined,
      }
    } catch (e) {
      return redirect("/404")
    }
  } else {
    redirect("/404")
  }
}
