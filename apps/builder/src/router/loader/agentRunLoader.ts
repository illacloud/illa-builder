import { LoaderFunction, defer, redirect } from "react-router-dom"
import { fetchAgentDetail } from "@/services/agent"

export const agentRunLoader: LoaderFunction = async (args) => {
  const { agentId } = args.params
  if (agentId) {
    return defer({
      agent: fetchAgentDetail(agentId),
    })
  } else {
    redirect("/404")
  }
}
