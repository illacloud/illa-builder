import { LoaderFunction, defer, redirect } from "react-router-dom"
import { fetchAgentRunDetail } from "@/services/agent"

export const agentRunLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (agentId) {
    return defer({
      agent: fetchAgentRunDetail(agentId),
    })
  } else {
    redirect("/404")
  }
}
