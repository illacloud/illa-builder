import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react"
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
  canLoadBefore: boolean
  loadBeforeMarketAgent: () => void
  loadMoreMarketAgent: () => void
  isFilteredResult: boolean
}

export const MARKET_INITIAL_PAGE = 1
export const MARKET_PAGE_SIZE = 30
export const MARKET_DEFAULT_SORT = PRODUCT_SORT_BY.POPULAR
export const MARKET_LIMIT_ITEMS = 1000

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

  const currentMarketList = useMemo(() => {
    return marketAgentList
      .slice(0, marketListPage * MARKET_PAGE_SIZE)
      .slice(-MARKET_LIMIT_ITEMS)
  }, [marketAgentList, marketListPage])

  const canLoadBefore = useMemo(() => {
    return (
      currentMarketList[0]?.aiAgent.aiAgentID !==
      marketAgentList[0]?.aiAgent.aiAgentID
    )
  }, [currentMarketList, marketAgentList])

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

  const loadBeforeMarketAgent = useCallback(async () => {
    const currentItemIndex = marketAgentList.findIndex((value) => {
      return value.aiAgent.aiAgentID === currentMarketList[0].aiAgent.aiAgentID
    })
    if (currentItemIndex === 0 || currentItemIndex === -1) return
    const newItemIndex = Math.max(currentItemIndex - MARKET_PAGE_SIZE, 0)
    dispatch(
      dashboardMarketAiAgentActions.modifyMarketAiAgentReducer({
        products: marketAgentList.slice(0, newItemIndex + MARKET_LIMIT_ITEMS),
        pageIndex: marketListPage - 1,
      }),
    )
  }, [dispatch, marketAgentList, currentMarketList, marketListPage])

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

  const isFilteredResult = useMemo(() => {
    return agentType === "market"
      ? sort !== PRODUCT_SORT_BY.STARRED || keyword !== ""
      : keyword !== ""
  }, [agentType, keyword, sort])

  const value = {
    agentType,
    teamAgentList,
    marketAgentList: currentMarketList,
    loading,
    canLoadBefore,
    sortedBy: sort,
    onChangeSort,
    handleSearchAgent,
    handleAgentTypeChange,
    loadMoreMarketAgent,
    loadBeforeMarketAgent,
    isFilteredResult,
  }

  return (
    <AiAgentContext.Provider value={value}>
      {props.children}
    </AiAgentContext.Provider>
  )
}

AiAgentProvider.displayName = "AiAgentProvider"
