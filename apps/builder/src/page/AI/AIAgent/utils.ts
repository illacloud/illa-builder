import { Agent } from "@illa-public/public-types"

export const agentData2JSONReport = (agent: Agent) => {
  try {
    const {
      agentType,
      modelConfig: { temperature, maxTokens },
      model,
    } = agent

    return JSON.stringify({
      mode: agentType,
      temperature,
      max_token: maxTokens,
      model,
    })
  } catch (e) {
    return JSON.stringify({})
  }
}
