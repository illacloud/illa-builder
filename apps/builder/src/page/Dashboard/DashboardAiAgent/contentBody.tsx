import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Input, RadioGroup } from "@illa-design/react"
import { MarketAgentCard } from "@/illa-public-market-component/MarketAgentCard"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import {
  contentContainerStyle,
  listContainerStyle,
  listFilterContainerStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { Agent, MarketAiAgent } from "@/redux/aiAgent/aiAgentState"
import { MarketAgentListData, TeamAgentListData } from "@/services/agent"

const listData: TeamAgentListData = {
  aiAgentList: [],
  totalAIAgentCount: 12,
}

const marketListData: MarketAgentListData = {
  products: [],
  total: 0,
  pageSize: 20,
  pageIndex: 1,
}

export interface AgentContentBodyProps {
  canEdit: boolean
}

export const AgentContentBody: FC<AgentContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEdit } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [agentType, setAgentType] = useState(searchParams.get("list") || "team")
  const [list, setList] = useState<Agent[]>()
  const [marketList, setMarketList] = useState<MarketAiAgent[]>()
  const agentOptions = useMemo(() => {
    return [
      {
        label: t("Team AI Agent"),
        value: "team",
      },
      {
        label: t("Agent market"),
        value: "market",
      },
    ]
  }, [t])

  const toRunAgent = useCallback((aiAgentID: string) => {
    navigate(`/${teamIdentifier}/ai-agent/${aiAgentID}/run`)
  }, [navigate, teamIdentifier])


  const getAgentList = () => {
    setList(listData.aiAgentList)
    setMarketList(marketListData.products)
  }

  const handleAgentTypeChange = (newType: string) => {
    setAgentType(newType)
    setSearchParams({ list: newType })
  }

  useEffect(() => {
    getAgentList()
  }, [])

  return (
    <div css={contentContainerStyle}>
      <Input colorScheme="techPurple" />
      <div css={listFilterContainerStyle}>
        <RadioGroup
          type="button"
          w="287px"
          options={agentOptions}
          value={agentType}
          forceEqualWidth={true}
          colorScheme="grayBlue"
          onChange={handleAgentTypeChange}
        />
      </div>
      <div css={listContainerStyle}>
        {agentType === "team"
          ? list?.map((item) => {
              return (
                <TeamAgentCard
                  key={item.aiAgentID}
                  agentInfo={item}
                  canEdit={canEdit}
                  onClick={toRunAgent}
                />
              )
            })
          : marketList?.map((item) => {
              return (
                <MarketAgentCard
                  key={item.aiAgent.aiAgentID}
                  agentInfo={item}
                  onClick={toRunAgent}
                />
              )
            })}
      </div>
    </div>
  )
}
