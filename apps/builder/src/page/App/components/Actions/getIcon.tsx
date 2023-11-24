import { Agent } from "@illa-public/public-types"
import { agentActionStyle } from "../../Module/ActionEditor/styles"

export function getAgentIcon(agent: Agent, size: string) {
  return <img src={agent?.icon} css={agentActionStyle(size)} />
}
