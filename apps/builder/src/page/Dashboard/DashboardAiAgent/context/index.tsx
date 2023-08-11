import { FC, ReactNode, createContext, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { DEFAULT_AGENT_TAB } from "@/page/Dashboard/DashboardAiAgent/contentBody"
import { Agent, PublicMarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import { getDashboardMarketAiAgent } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentSelector"
import { dashboardMarketAiAgentActions } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentSlice"
import { getDashboardTeamAiAgentList } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSelector"
import { dashboardTeamAiAgentActions } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSlice"
import { fetchTeamAgentList } from "@/services/agent"
import { PRODUCT_SORT_BY, fetchNeedAuthAgentList } from "@/services/marketPlace"

interface ProviderProps {
  children: ReactNode
}

export type AgentType = "team" | "market"

interface Inject extends Omit<ProviderProps, "children"> {
  handleSearchAgent: (keyword: string) => void
  agentType: AgentType
  handleAgentTypeChange: (type: AgentType) => void
  teamAgentList: Agent[]
  marketAgentList: PublicMarketAiAgent[]
  loading: boolean
  sortedBy: PRODUCT_SORT_BY
  setSortedBy: (sortedBy: PRODUCT_SORT_BY) => void
}

export const MARKET_INITIAL_PAGE = 1
export const MARKET_PAGE_SIZE = 20
export const MARKET_DEFAULT_SORT = PRODUCT_SORT_BY.POPULARITY

export const AiAgentContext = createContext<Inject>({} as Inject)

export const AiAgentProvider: FC<ProviderProps> = (props) => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const teamAgentList = useSelector(getDashboardTeamAiAgentList)
  const marketAgentData = useSelector(getDashboardMarketAiAgent)
  const marketAgentList = marketAgentData.products
  const marketListPage = marketAgentData.pageIndex

  const [loading, setLoading] = useState(false)
  const [agentType, setAgentType] = useState<AgentType>(
    (searchParams.get("list") as AgentType) || DEFAULT_AGENT_TAB,
  )
  const [keyword, setKeyword] = useState("")

  // market agent
  const [sortedBy, setSortedBy] = useState(MARKET_DEFAULT_SORT)

  const getTeamAgentList = useCallback(
    async (keyword?: string) => {
      const res = await fetchTeamAgentList(keyword)
      dispatch(
        dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
          res.data.aiAgentList,
        ),
      )
    },
    [dispatch],
  )

  const getMarketAgentList = useCallback(
    async (
      params: {
        page?: number
        sort?: PRODUCT_SORT_BY
        search?: string
      } = {},
    ) => {
      setLoading(true)
      console.log(keyword, "getMarketAgentList change")
      const { page = marketListPage, sort = sortedBy } = params
      const res = await fetchNeedAuthAgentList({
        page,
        limit: MARKET_PAGE_SIZE,
        sortedBy: sort,
        search: keyword,
      })
      dispatch(
        dashboardMarketAiAgentActions.updateMarketAiAgentListReducer(res.data),
      )
      setLoading(false)
    },
    [marketListPage, sortedBy, keyword, dispatch],
  )

  const getAgentList = useCallback(
    async (type: AgentType = agentType) => {
      if (type === "team") {
        await getTeamAgentList()
      } else if (type === "market") {
        await getMarketAgentList()
      }
    },
    [agentType, getTeamAgentList, getMarketAgentList],
  )

  const handleSearchAgent = async (keyword: string) => {
    setKeyword(keyword)
    if (agentType === "team") {
      await getTeamAgentList(keyword)
    } else if (agentType === "market") {
      await getMarketAgentList({
        search: keyword,
      })
    }
  }

  const handleAgentTypeChange = (newType: unknown) => {
    setAgentType(newType as AgentType)
    searchParams.set("list", newType as AgentType)
    const newUrl = window.location.pathname + "?" + searchParams.toString()
    window.history.replaceState({}, "", newUrl)
    getAgentList(newType as AgentType)
  }

  const value = {
    agentType,
    teamAgentList,
    marketAgentList,
    loading,
    sortedBy,
    setSortedBy,
    handleSearchAgent,
    handleAgentTypeChange,
  }

  return (
    <AiAgentContext.Provider value={value}>
      {props.children}
    </AiAgentContext.Provider>
  )
}

AiAgentProvider.displayName = "AiAgentProvider"
