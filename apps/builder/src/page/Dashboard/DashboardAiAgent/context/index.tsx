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
import {
  PRODUCT_SORT_BY,
  ProductListParams,
  fetchNeedAuthAgentList,
} from "@/services/marketPlace"

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
  onChangeSort: (sortedBy: PRODUCT_SORT_BY) => void
  loadMoreMarketAgent: () => void
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
  const [loadMore, setLoadMore] = useState(false)
  const [agentType, setAgentType] = useState<AgentType>(
    (searchParams.get("list") as AgentType) || DEFAULT_AGENT_TAB,
  )
  const [keyword, setKeyword] = useState("")

  // market agent
  const [sort, setSort] = useState(MARKET_DEFAULT_SORT)

  const getTeamAgentList = useCallback(
    async (keyword?: string) => {
      setLoading(true)
      const res = await fetchTeamAgentList(keyword)
      dispatch(
        dashboardTeamAiAgentActions.updateTeamAiAgentListReducer(
          res.data.aiAgentList,
        ),
      )
      setLoading(false)
    },
    [dispatch],
  )

  const getMarketAgentList = useCallback(
    async (params: Partial<ProductListParams> = {}) => {
      setLoading(true)
      const {
        page = MARKET_INITIAL_PAGE,
        sortedBy = sort,
        limit = MARKET_PAGE_SIZE,
        search = keyword,
      } = params
      const res = await fetchNeedAuthAgentList({
        page,
        sortedBy,
        limit,
        search,
      })
      dispatch(
        dashboardMarketAiAgentActions.updateMarketAiAgentListReducer(res.data),
      )
      setLoading(false)
    },
    [dispatch, sort, keyword],
  )

  const onChangeSort = useCallback(
    async (sortedBy: PRODUCT_SORT_BY) => {
      setSort(sortedBy)
      await getMarketAgentList({
        sortedBy,
      })
    },
    [getMarketAgentList],
  )

  const handleSearchAgent = useCallback(
    async (keyword: string) => {
      setKeyword(keyword)
      if (agentType === "team") {
        await getTeamAgentList(keyword)
      } else if (agentType === "market") {
        await getMarketAgentList({
          search: keyword,
        })
      }
    },
    [agentType, getTeamAgentList, getMarketAgentList],
  )

  const handleAgentTypeChange = useCallback(
    async (newType: unknown) => {
      setAgentType(newType as AgentType)
      searchParams.set("list", newType as AgentType)
      const newUrl = window.location.pathname + "?" + searchParams.toString()
      window.history.replaceState({}, "", newUrl)
      if (newType === "team") {
        await getTeamAgentList(keyword)
      } else if (newType === "market") {
        await getMarketAgentList()
      }
    },
    [keyword, getTeamAgentList, getMarketAgentList, searchParams],
  )

  const loadMoreMarketAgent = useCallback(async () => {
    if (loadMore) return
    setLoadMore(true)
    const res = await fetchNeedAuthAgentList({
      search: keyword,
      page: marketListPage + 1,
      sortedBy: sort,
      limit: MARKET_PAGE_SIZE,
    })
    dispatch(
      dashboardMarketAiAgentActions.updateMarketAiAgentListReducer(res.data),
    )
    setLoadMore(false)
  }, [dispatch, loadMore, keyword, marketListPage, sort])

  const value = {
    agentType,
    teamAgentList,
    marketAgentList,
    loading,
    sortedBy: sort,
    onChangeSort,
    handleSearchAgent,
    handleAgentTypeChange,
    loadMoreMarketAgent,
  }

  return (
    <AiAgentContext.Provider value={value}>
      {props.children}
    </AiAgentContext.Provider>
  )
}

AiAgentProvider.displayName = "AiAgentProvider"
