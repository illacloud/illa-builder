import { FC, ReactNode, createContext, useCallback, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DEFAULT_AGENT_TAB } from "@/page/Dashboard/DashboardAiAgent/contentBody"
import { Agent, PublicMarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import { fetchTeamAgentList } from "@/services/agent"
import { PRODUCT_SORT_BY, fetchNeedAuthAgentList } from "@/services/marketPlace"

interface ProviderProps {
  children: ReactNode
}

export type AgentType = "team" | "market"

interface Inject extends Omit<ProviderProps, "children"> {
  keyword: string
  setKeyword: (keyword: string) => void
  agentType: AgentType
  setAgentType: (type: AgentType) => void
  teamAgentList: Agent[]
  marketAgentList: PublicMarketAiAgent[]
  getAgentList: (type?: AgentType) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  sortedBy: PRODUCT_SORT_BY
  setSortedBy: (sortedBy: PRODUCT_SORT_BY) => void
  marketListPage: number
}

export const AiAgentContext = createContext<Inject>({} as Inject)

export const AiAgentProvider: FC<ProviderProps> = (props) => {
  const [searchParams] = useSearchParams()

  const [teamAgentList, setTeamAgentList] = useState<Agent[]>([])
  const [marketAgentList, setMarketAgentList] = useState<PublicMarketAiAgent[]>(
    [],
  )

  const [loading, setLoading] = useState(false)
  const [agentType, setAgentType] = useState<AgentType>(
    (searchParams.get("list") as AgentType) || DEFAULT_AGENT_TAB,
  )
  const [keyword, setKeyword] = useState("")

  // market agent
  const [sortedBy, setSortedBy] = useState(PRODUCT_SORT_BY.POPULARITY)
  const [marketListPage, setMarketListPage] = useState(0)

  const getTeamAgentList = useCallback(() => {
    fetchTeamAgentList(keyword).then((res) => {
      setTeamAgentList(res.data.aiAgentList)
    })
  }, [keyword])

  const getMarketAgentList = useCallback(
    (params: { page?: number; sort?: PRODUCT_SORT_BY } = {}) => {
      const { page = marketListPage, sort = sortedBy } = params
      fetchNeedAuthAgentList({
        page,
        limit: 20,
        sortedBy: sort,
        search: keyword,
      }).then((res) => {
        setMarketListPage(res.data.pageIndex)
        setMarketAgentList(res.data.products)
      })
    },
    [marketListPage, sortedBy, keyword],
  )

  const getAgentList = useCallback(
    (type: AgentType = agentType) => {
      if (type === "team") {
        getTeamAgentList()
      } else if (type === "market") {
        getMarketAgentList()
      }
    },
    [agentType, getTeamAgentList, getMarketAgentList],
  )

  const value = {
    ...props,
    keyword,
    setKeyword,
    agentType,
    setAgentType,
    teamAgentList,
    marketAgentList,
    getAgentList,
    loading,
    setLoading,
    sortedBy,
    setSortedBy,
    marketListPage,
  }

  return (
    <AiAgentContext.Provider value={value}>
      {props.children}
    </AiAgentContext.Provider>
  )
}

AiAgentProvider.displayName = "AiAgentProvider"
