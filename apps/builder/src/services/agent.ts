import { builderRequest } from "@/api/http"
import { Agent, MarketplaceInfo } from "@/redux/aiAgent/aiAgentState"

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

export const forkAIAgentToTeam = (AIAgentID: string, teamID: string) => {
  return builderRequest<TeamAgentListData>({
    url: `/AIAgent/${AIAgentID}/forkTo/teams/${teamID}`,
    method: "POST",
  })
}

export const takeSnapShot = (AIAgentID: string) => {
  return builderRequest(
    {
      url: `/AIAgent/${AIAgentID}`,
      method: "DELETE",
    },
    {
      needTeamID: true,
    },
  )
}
