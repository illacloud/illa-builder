import { v4 } from "uuid"
import { authCloudRequest, builderRequest, directRequest } from "@/api/http"
import { Agent, AgentRaw, MarketplaceInfo } from "@/redux/aiAgent/aiAgentState"
import { UploadResponse } from "@/services/users"
import { base642Blob, getFileExtensionFromBase64 } from "@/utils/file"
import { upload } from "@/utils/file/upload"

export interface TeamAgentListData {
  aiAgentList: Agent[]
  totalAIAgentCount: number
}

export enum SortOptions {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export const fetchTeamAgentList = (
  sortBy: SortOptions = SortOptions.ID,
  signal?: AbortSignal,
) => {
  return builderRequest<TeamAgentListData>(
    {
      url: `/AIAgent/list/sortBy/${sortBy}`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

// Search AI Agent By Keywords
export const fetchTeamAgentByKeywords = (
  sortBy: SortOptions = SortOptions.ID,
  keywords: string,
  signal?: AbortSignal,
) => {
  return builderRequest<TeamAgentListData>(
    {
      url: `/AIAgent/list/sortBy/${sortBy}/like`,
      method: "GET",
      params: {
        keywords,
      },
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export interface AgentProduct {
  aiAgent: Agent
  marketplace: MarketplaceInfo
}

export interface MarketAgentListData {
  products: AgentProduct[]
  total: number
  pageSize: number
  pageIndex: 1
}

export interface ForkAgentResponse {
  aiAgentID: string
}

export const forkAIAgentToTeam = (aiAgentID: string, teamID: string) => {
  return directRequest<ForkAgentResponse>({
    url: `/AIAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const fetchAgentDetail = (aiAgentID: string) => {
  return builderRequest<Agent>(
    {
      url: `/AIAgent/${aiAgentID}`,
      method: "GET",
    },
    {
      needTeamID: true,
    },
  )
}

export const putAgentDetail = (aiAgentID: string, agentRaw: AgentRaw) => {
  return builderRequest<Agent, AgentRaw>(
    {
      url: `/AIAgent/${aiAgentID}`,
      method: "PUT",
      data: agentRaw,
    },
    {
      needTeamID: true,
    },
  )
}

export const createAgent = (agentRaw: AgentRaw) => {
  return builderRequest<Agent, AgentRaw>(
    {
      url: `/AIAgent`,
      method: "POST",
      data: agentRaw,
    },
    {
      needTeamID: true,
    },
  )
}

// send raw without variables
export const generateDescription = (prompt: string) => {
  return builderRequest<{ payload: string }, { prompt: string }>(
    {
      url: `/AIAgent/generatePromptDescription`,
      method: "POST",
      data: {
        prompt: prompt,
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const getAIAgentWsAddress = (
  aiAgentID: string,
  signal?: AbortSignal,
) => {
  return builderRequest<{ aiAgentConnectionAddress: string }>(
    {
      url: `/AIAgent/${aiAgentID}/connectionAddress`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export const getAIAgentAnonymousAddress = (signal?: AbortSignal) => {
  return builderRequest<{ aiAgentConnectionAddress: string }>(
    {
      url: `/AIAgent/AIAgentAnonymous/connectionAddress`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export const uploadAgentIcon = async (aiAgentID: string, base64: string) => {
  const fileName = v4()
  const type = getFileExtensionFromBase64(base64)
  const address = await authCloudRequest<UploadResponse>({
    url: `/AIAgent/:aiAgentID/icon/uploadAddress/fileName/${fileName}.${type}`,
    method: "GET",
  })
  const file = base642Blob(base64)
  return await upload(address.data.uploadAddress, file)
}
