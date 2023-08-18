import { FC, useCallback, useContext, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Button,
  Empty,
  EmptyIcon,
  Loading,
  PlusIcon,
  RadioGroup,
  getColor,
} from "@illa-design/react"
import { MarketAgentCard } from "@/illa-public-market-component/MarketAgentCard"
import Select from "@/illa-public-market-component/Select"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import SearchEmptyIcon from "@/page/Dashboard/DashboardAiAgent/assets/search-empty"
import { AiAgentContext } from "@/page/Dashboard/DashboardAiAgent/context"
import {
  emptyStyle,
  listContainerStyle,
  listFilterContainerStyle,
  loadMoreStyle,
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
    isFilteredResult,
    onChangeSort,
    handleAgentTypeChange,
    loadBeforeMarketAgent,
  } = useContext(AiAgentContext)

  const agentOptions = useMemo(() => {
    return [
      {
        label: t("dashboard.list-type.team"),
        value: "team",
      },
      {
        label: t("dashboard.list-type.marketplace"),
        value: "market",
      },
    ]
  }, [t])

  const sortOptions = [
    {
      label: t("dashboard.sort-type.popular"),
      value: PRODUCT_SORT_BY.POPULARITY,
    },
    {
      label: t("dashboard.sort-type.recent"),
      value: PRODUCT_SORT_BY.TIME,
    },
    {
      label: t("dashboard.sort-type.star"),
      value: PRODUCT_SORT_BY.STARRED,
    },
  ]

  const toRunAgent = useCallback(
    (aiAgentID: string) => {
      navigate(`/${teamIdentifier}/ai-agent/${aiAgentID}/run`)
    },
    [navigate, teamIdentifier],
  )

  const handleCreateAgent = useCallback(() => {
    navigate(`/${teamIdentifier}/ai-agent`)
  }, [navigate, teamIdentifier])

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
            isFilteredResult ? (
              <SearchEmptyIcon size="48px" color={getColor("grayBlue", "02")} />
            ) : (
              <EmptyIcon size="48px" color={getColor("grayBlue", "02")} />
            )
          }
          description={
            isFilteredResult ? (
              <div css={emptyStyle}>
                <div>{t("new_dashboard.desc.blank-agent")}</div>
              </div>
            ) : (
              <div css={emptyStyle}>
                <div>{t("new_dashboard.desc.blank-agent")}</div>
                <div>
                  <Button
                    colorScheme="grayBlue"
                    loading={loading}
                    leftIcon={<PlusIcon size="10px" />}
                    onClick={handleCreateAgent}
                  >
                    {t("new_dashboard.button.blank-agent")}
                  </Button>
                </div>
              </div>
            )
          }
        />
      ) : agentType === "market" ? (
        <div>
          {canLoadBefore && (
            <div css={loadMoreStyle} onClick={loadBeforeMarketAgent}>
              {t("load.before")}
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
