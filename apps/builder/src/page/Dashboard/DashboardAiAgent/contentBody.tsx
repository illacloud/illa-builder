import { FC, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { RadioGroup } from "@illa-design/react"
import { MarketAgentCard } from "@/illa-public-market-component/MarketAgentCard"
import Select from "@/illa-public-market-component/Select"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { AiAgentContext } from "@/page/Dashboard/DashboardAiAgent/context"
import {
  listContainerStyle,
  listFilterContainerStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { DashboardAiAgentLoaderData } from "@/router/loader/dashBoardLoader"
import { PRODUCT_SORT_BY } from "@/services/marketPlace"

export interface AgentContentBodyProps {
  canEdit: boolean
  agentData: DashboardAiAgentLoaderData["marketAgentData"]
}

export const DEFAULT_AGENT_TAB = "team"
export const AgentContentBody: FC<AgentContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEdit } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()

  const {
    marketAgentList,
    teamAgentList,
    agentType,
    sortedBy,
    setSortedBy,
    handleAgentTypeChange,
  } = useContext(AiAgentContext)

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

  const sortOptions = [
    {
      label: "Popular",
      value: PRODUCT_SORT_BY.POPULARITY,
    },
    {
      label: "Newest",
      value: PRODUCT_SORT_BY.TIME,
    },
    {
      label: "Star",
      value: PRODUCT_SORT_BY.STARRED,
    },
  ]

  const toRunAgent = useCallback(
    (aiAgentID: string) => {
      navigate(`/${teamIdentifier}/ai-agent/${aiAgentID}/run`)
    },
    [navigate, teamIdentifier],
  )

  return (
    <div>
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
        {agentType === "market" && (
          <Select
            value={sortedBy}
            options={sortOptions}
            onChange={(value) => {
              setSortedBy(value as PRODUCT_SORT_BY)
            }}
          />
        )}
      </div>
      <div css={listContainerStyle}>
        {agentType === "market" &&
          marketAgentList?.map((item) => {
            return (
              <MarketAgentCard
                key={item.aiAgent.aiAgentID}
                agentInfo={item}
                onClick={toRunAgent}
              />
            )
          })}
        {agentType === "team" &&
          teamAgentList?.map((item) => {
            return (
              <TeamAgentCard
                key={item.aiAgentID}
                agentInfo={item}
                canEdit={canEdit}
                onClick={toRunAgent}
              />
            )
          })}
      </div>
    </div>
  )
}
