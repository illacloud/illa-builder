import { Agent } from "@illa-public/market-agent"
import { agentActionStyle } from "./styles"

export function getAgentIcon(agent: Agent, size: string) {
  return <img src={agent?.icon} css={agentActionStyle(size)} />
}
