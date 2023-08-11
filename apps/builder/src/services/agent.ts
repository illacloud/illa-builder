import { v4 } from "uuid"
import { agentRequest, authCloudRequest, marketplaceRequest } from "@/api/http"
import {
  REDIRECT_PAGE_TYPE,
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { MARKET_PAGE_SIZE } from "@/page/App/components/Actions/ActionGenerator/AiAgentSelector/constants"
import {
  Agent,
  AgentRaw,
  MarketAiAgent,
  MarketplaceInfo,
} from "@/redux/aiAgent/aiAgentState"
import { UploadResponse } from "@/services/users"
import { base642Blob, getFileExtensionFromBase64 } from "@/utils/file"
import { upload } from "@/utils/file/upload"
import { getTeamID } from "@/utils/team"
import { isCloudVersion } from "@/utils/typeHelper"

export interface TeamAgentListData {
  aiAgentList: Agent[]
  totalAIAgentCount: number
  totalPages: number
}

export enum SortOptions {
  ID = "id",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
}

export const fetchTeamAgent = (signal?: AbortSignal) => {
  const sortBy = SortOptions.UPDATED_AT
  return agentRequest<TeamAgentListData>(
    {
      url: `/aiAgent/list/sortBy/${sortBy}`,
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
  keywords: string,
  signal?: AbortSignal,
) => {
  const sortBy = SortOptions.UPDATED_AT
  return agentRequest<TeamAgentListData>(
    {
      url: `/aiAgent/list/sortBy/${sortBy}/like/keywords/${keywords}`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchTeamAgentList = (keywords?: string, signal?: AbortSignal) => {
  if (keywords) {
    return fetchTeamAgentByKeywords(keywords, signal)
  }
  return fetchTeamAgent(signal)
}

export const fetchTeamAgentListByPage = (
  page: number,
  keywords: string = "",
  signal?: AbortSignal,
) => {
  return agentRequest<TeamAgentListData>(
    {
      url: keywords
        ? `/aiAgent/list/limit/10/page/${page}/sortBy/id/like/keywords/${keywords}`
        : `/aiAgent/list/limit/10/page/${page}/sortBy/id`,
      method: "GET",
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

export const forkAIAgentToTeam = (aiAgentID: string) => {
  const teamID = getTeamID()
  return agentRequest<Agent>({
    url: `/aiAgent/${aiAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const deleteAiAgent = (aiAgentID: string) => {
  return agentRequest<ForkAgentResponse>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "DELETE",
    },
    {
      needTeamID: true,
    },
  )
}

export const duplicateAiAgent = (aiAgentID: string) => {
  return agentRequest<Agent>(
    {
      url: `/aiAgent/${aiAgentID}/duplicate`,
      method: "POST",
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchAgentDetail = (aiAgentID: string) => {
  return agentRequest<Agent>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "GET",
    },
    {
      needTeamID: true,
    },
  )
}

export const putAgentDetail = (aiAgentID: string, agentRaw: AgentRaw) => {
  return agentRequest<Agent, AgentRaw>(
    {
      url: `/aiAgent/${aiAgentID}`,
      method: "PUT",
      data: agentRaw,
    },
    {
      needTeamID: true,
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
      needTeamID: true,
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
        prompt: encodeURI(prompt),
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const generateIcon = (name: string, description: string) => {
  return agentRequest<
    {
      payload: string
    },
    {
      name: string
      description: string
    }
  >(
    {
      url: `/aiAgent/generateIcon`,
      method: "POST",
      data: {
        name: encodeURI(name),
        description: encodeURI(description),
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
  return agentRequest<{
    aiAgentConnectionAddress: string
  }>(
    {
      url: `/aiAgent/${aiAgentID}/connectionAddress`,
      method: "GET",
      signal,
    },
    {
      needTeamID: true,
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
      needTeamID: true,
    },
  )
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
      needTeamID: true,
    },
  )
  const file = await base642Blob(base64)
  return await upload(address.data.uploadAddress, file)
}

export enum MARKET_AGENT_SORTED_OPTIONS {
  POPULAR = "popular",
  LATEST = "latest",
  STARRED = "starred",
}

export const fetchMarketAgentList = (
  page: number = 1,
  sortedBy: MARKET_AGENT_SORTED_OPTIONS,
  search: string = "",
  pageSize: number = MARKET_PAGE_SIZE,
  signal?: AbortSignal,
) => {
  return marketplaceRequest<MarketAgentListData>({
    url: `/aiAgents?page=${page}&limit=${pageSize}&sortedBy=${sortedBy}&search=${search}`,
    method: "GET",
    signal,
  })
}

export const getAIAgentMarketplaceInfo = (aiAgentID: string) => {
  return marketplaceRequest<MarketAiAgent>({
    url: `/aiAgents/${aiAgentID}`,
    method: "GET",
  })
}

export const shareAgentByEmail = async (
  email: string,
  userRole: USER_ROLE,
  agentID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<inviteByEmailResponse>(
    {
      method: "POST",
      url: `/shareAppByEmail`,
      data: {
        email,
        userRole,
        agentID,
        redirectPage,
        hosts: !isCloudVersion ? window.location.origin : undefined,
      },
    },
    { needTeamID: true },
  )
  return response.data
}

export const fetchShareAgentLink = async (
  userRole: USER_ROLE,
  agentID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/shareAppLink/userRole/${userRole}/apps/${agentID}/redirectPage/${redirectPage}`,
    },
    { needTeamID: true },
  )
  return response.data
}

export const renewShareAgentLink = async (
  userRole: USER_ROLE,
  agentID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/newShareAppLink/userRole/${userRole}/apps/${agentID}/redirectPage/${redirectPage}`,
    },
    { needTeamID: true },
  )
  return response.data
}
