import { getAIAgentMarketplaceInfo } from "@illa-public/market-agent/service"
import { LoaderFunction, defer, redirect } from "react-router-dom"
import { fetchAgentDetail } from "@/services/agent"

const fetchAgentFullData = async (agentId: string) => {
  const agent = await fetchAgentDetail(agentId)
  let marketInfo = undefined
  if (agent.data.publishedToMarketplace) {
    marketInfo = await getAIAgentMarketplaceInfo(agentId)
  }
  return {
    agent: agent.data,
    marketplaceInfo: marketInfo ? marketInfo.data : undefined,
  }
}

export const agentRunLoader: LoaderFunction = async (args) => {
  const { agentID } = args.params
  if (agentID) {
    return defer({
      data: fetchAgentFullData(agentID),
    })
  } else {
    redirect("/404")
  }
}
