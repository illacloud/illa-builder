import { agentRequest, marketplaceRequest } from "@illa-public/illa-net"
import { Agent, AgentRaw } from "@illa-public/public-types"
import { v4 } from "uuid"
import { base642Blob, getFileExtensionFromBase64 } from "@/utils/file"
import { upload } from "@/utils/file"
import { getCurrentTeamID } from "@/utils/team"

export interface TeamAgentListData {
  aiAgentList: Agent[]
  totalAIAgentCount: number
  totalPages: number
}

export const fetchTeamAgent = (signal?: AbortSignal) => {
  return agentRequest<TeamAgentListData>(
    {
      url: `/aiAgent/list/sortBy/updatedAt`,
      method: "GET",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export interface ForkAgentResponse {
  aiAgentID: string
}

export const forkAIAgentToTeam = (aiAgentID: string) => {
  const teamID = getCurrentTeamID()
  return agentRequest<Agent>({
    url: `/aiAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const starAIAgent = (aiAgentID: string) => {
  return marketplaceRequest<{}>({
    url: `/aiAgents/${aiAgentID}/star`,
    method: "POST",
  })
}

export const unstarAIAgent = (aiAgentID: string) => {
  return marketplaceRequest<{}>({
    url: `/aiAgents/${aiAgentID}/star`,
    method: "DELETE",
  })
}

export const deleteAIAgent = (aiAgentID: string) => {
  return agentRequest<ForkAgentResponse>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "DELETE",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const duplicateAIAgent = (aiAgentID: string) => {
  return agentRequest<Agent>(
    {
      url: `/aiAgent/${aiAgentID}/duplicate`,
      method: "POST",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchAgentContributeState = (
  aiAgentID: string,
  ownerTeamIdentifier: string,
) => {
  return agentRequest<{
    isPublishedToMarketplace: boolean
  }>({
    url: `/teams/byIdentifier/${ownerTeamIdentifier}/publicAIAgent/${aiAgentID}/isPublishedToMarketplace`,
    method: "GET",
  })
}

export const fetchAgentDetail = (aiAgentID: string) => {
  return agentRequest<Agent>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "GET",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const fetchContributedAgentDetail = (
  aiAgentID: string,
  ownerTeamIdentifier: string,
) => {
  return agentRequest<Agent>({
    url: `/teams/byIdentifier/${ownerTeamIdentifier}/publicAIAgent/${aiAgentID}`,
    method: "GET",
  })
}

export const putAgentDetail = (aiAgentID: string, agentRaw: AgentRaw) => {
  return agentRequest<Agent, AgentRaw>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "PUT",
      data: agentRaw,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const createAgent = (agentRaw: AgentRaw) => {
  return agentRequest<Agent, AgentRaw>(
    {
      url: `/aiAgent`,
      method: "POST",
      data: agentRaw,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

// send raw without variables
export const generateDescription = (prompt: string) => {
  return agentRequest<
    {
      payload: string
    },
    {
      prompt: string
    }
  >(
    {
      url: `/aiAgent/generatePromptDescription`,
      method: "POST",
      data: {
        prompt: encodeURIComponent(prompt),
      },
      timeout: 600000,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const getAIAgentWsAddress = (
  aiAgentID: string,
  signal?: AbortSignal,
) => {
  return agentRequest<{
    aiAgentConnectionAddress: string
  }>(
    {
      url: `/aiAgent/${aiAgentID}/connectionAddress`,
      method: "GET",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export const getAIAgentAnonymousAddress = (signal?: AbortSignal) => {
  return agentRequest<{
    aiAgentConnectionAddress: string
  }>(
    {
      url: `/aiAgentAnonymous/connectionAddress`,
      method: "GET",
      signal,
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
}

export interface UploadResponse {
  uploadAddress: string
}

export const uploadAgentIcon = async (base64: string) => {
  const fileName = v4()
  const type = getFileExtensionFromBase64(base64)
  const address = await agentRequest<UploadResponse>(
    {
      url: `/aiAgent/icon/uploadAddress/fileName/${fileName}.${type}`,
      method: "GET",
    },
    {
      teamID: getCurrentTeamID(),
    },
  )
  const file = await base642Blob(base64)
  return await upload(address.data.uploadAddress, file)
}
