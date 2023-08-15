import { FC, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Empty,
  EmptyIcon,
  Loading,
  RadioGroup,
  globalColor,
  illaPrefix,
} from "@illa-design/react"
import { MarketAgentCard } from "@/illa-public-market-component/MarketAgentCard"
import Select from "@/illa-public-market-component/Select"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { AiAgentContext } from "@/page/Dashboard/DashboardAiAgent/context"
import {
  listContainerStyle,
  listFilterContainerStyle,
  loadingStyle,
  moreDataStyle,
} from "@/page/Dashboard/DashboardAiAgent/style"
import { getHasMoreMarketAgent } from "@/redux/dashboard/marketAiAgents/dashboardMarketAiAgentSelector"
import { PRODUCT_SORT_BY } from "@/services/marketPlace"

export interface AgentContentBodyProps {
  canEdit: boolean
}

export const DEFAULT_AGENT_TAB = "team"
export const AgentContentBody: FC<AgentContentBodyProps> = (props) => {
  const { t } = useTranslation()
  const { canEdit } = props
  const { teamIdentifier } = useParams()
  const navigate = useNavigate()
  const hasMoreData = useSelector(getHasMoreMarketAgent)

  const {
    loading,
    canLoadBefore,
    marketAgentList,
    teamAgentList,
    agentType,
    sortedBy,
    onChangeSort,
    handleAgentTypeChange,
    loadBeforeMarketAgent,
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

  const noData = useMemo(() => {
    return (
      (agentType === "market" && marketAgentList.length === 0) ||
      (agentType === "team" && teamAgentList.length === 0)
    )
  }, [agentType, marketAgentList?.length, teamAgentList?.length])

  return (
    <>
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
              onChangeSort(value as PRODUCT_SORT_BY)
            }}
          />
        )}
      </div>
      {loading ? (
        <div css={loadingStyle}>
          <Loading colorScheme="techPurple" />
        </div>
      ) : noData ? (
        <Empty
          paddingVertical="120px"
          icon={
            <EmptyIcon
              size="48px"
              color={globalColor(`--${illaPrefix}-grayBlue-02`)}
            />
          }
          description={t("new_dashboard.desc.blank")}
        />
      ) : agentType === "market" ? (
        <div>
          {canLoadBefore && (
            <div css={moreDataStyle} onClick={loadBeforeMarketAgent}>
              {t("new_dashboard.desc.load_more")}
            </div>
          )}
          <div css={listContainerStyle}>
            {marketAgentList?.map((item) => {
              return (
                <MarketAgentCard
                  key={item.aiAgent.aiAgentID}
                  agentInfo={item}
                  onClick={toRunAgent}
                />
              )
            })}
          </div>
          {hasMoreData && (
            <div css={moreDataStyle}>
              <Loading colorScheme="techPurple" />
            </div>
          )}
        </div>
      ) : agentType === "team" ? (
        <div css={listContainerStyle}>
          {teamAgentList?.map((item) => {
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
      ) : null}
    </>
  )
}
