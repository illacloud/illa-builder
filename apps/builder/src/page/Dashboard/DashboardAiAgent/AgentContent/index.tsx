import { MarketAgentCard } from "@illa-public/market-agent/MarketAgentCard"
import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Empty,
  EmptyIcon,
  PlusIcon,
  RadioGroup,
  getColor,
} from "@illa-design/react"
import { TeamAgentCard } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { getDashboardMarketAgentList } from "@/redux/dashboard/marketAIAgents/marketAgentSelector"
import { getDashboardTeamAiAgentList } from "@/redux/dashboard/teamAiAgents/dashboardTeamAiAgentSelector"
import {
  agentContent,
  cardListStyle,
  emptyStyle,
  emptyTextStyle,
  menuContainerStyle,
} from "./style"

export const AgentContent: FC = () => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const [currentSort, setCurrentSort] = useState<MARKET_AGENT_SORTED_OPTIONS>(
    MARKET_AGENT_SORTED_OPTIONS.POPULAR,
  )

  const [currentSelectTab, setCurrentSelectTab] = useState<"market" | "team">(
    "team",
  )

  const teamAgentList = useSelector(getDashboardTeamAiAgentList)

  const marketAgentList = useSelector(getDashboardMarketAgentList)

  return (
    <div css={agentContent}>
      <div css={menuContainerStyle}>
        <RadioGroup
          onChange={(value) => {
            setCurrentSelectTab(value)
          }}
          colorScheme={getColor("grayBlue", "02")}
          type="button"
          value={currentSelectTab}
          options={[
            {
              value: "team",
              label: t("dashboard.list-type.team"),
            },
            {
              value: "market",
              label: t("dashboard.list-type.marketplace"),
            },
          ]}
        />
        <div
          style={{
            flexGrow: 1,
          }}
        />
        {currentSelectTab === "market" && (
          <SortSelector
            sort={currentSort}
            onSortChange={(value) => {
              setCurrentSort(value)
            }}
          />
        )}
      </div>
      {currentSelectTab === "team" && teamAgentList.length !== 0 && (
        <div css={cardListStyle}>
          {teamAgentList.map((agent) => (
            <TeamAgentCard key={agent.aiAgentID} agentInfo={agent} />
          ))}
        </div>
      )}
      {currentSelectTab === "team" && teamAgentList.length === 0 && (
        <Empty
          paddingVertical="120px"
          icon={<EmptyIcon size="48px" color={getColor("grayBlue", "02")} />}
          description={
            <div css={emptyStyle}>
              <div css={emptyTextStyle}>{t("new_dashboard.desc.blank")}</div>
              <Button
                colorScheme="grayBlue"
                loading={false}
                variant="outline"
                leftIcon={<PlusIcon size="10px" />}
                onClick={() => {
                  navigate(`/${teamInfo.identifier}/ai-agent`)
                }}
              >
                {t("new_dashboard.button.blank")}
              </Button>
            </div>
          }
        />
      )}
      {currentSelectTab === "market" && (
        <div css={cardListStyle}>
          {marketAgentList.map((agent) => (
            <MarketAgentCard
              key={agent.aiAgent.aiAgentID}
              marketAIAgent={agent}
            />
          ))}
        </div>
      )}
    </div>
  )
}
