import { Agent } from "@illa-public/public-types"

export const agentData2JSONReport = (agent: Agent) => {
  try {
    const {
      agentType,
      modelConfig: {},
      model,
    } = agent

    return JSON.stringify({
      mode: agentType,
      model,
    })
  } catch (e) {
    return JSON.stringify({})
  }
}
