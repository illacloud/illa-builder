import { builderRequest } from "@/api/http"
import { MarketAiAgent, TeamAiAgent } from "@/redux/aiAgent/aiAgentState"

export interface TeamAgentListData {
  aiAgentList: TeamAiAgent[]
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

export interface MarketAgentListData {
  aiAgentList: MarketAiAgent[]
  totalAIAgentCount: number
  totalPages: number
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
