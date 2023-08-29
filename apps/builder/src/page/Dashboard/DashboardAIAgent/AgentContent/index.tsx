import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { RadioGroup, getColor } from "@illa-design/react"
import { MarketAgents } from "@/page/Dashboard/DashboardAIAgent/MarketAgents"
import { TeamAgents } from "@/page/Dashboard/DashboardAIAgent/TeamAgents"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { agentContent, menuContainerStyle } from "./style"

export const AgentContent: FC = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()

  const currentSort =
    (searchParams.get("sort") as MARKET_AGENT_SORTED_OPTIONS) ??
    MARKET_AGENT_SORTED_OPTIONS.POPULAR

  const currentSelectTab = searchParams.get("list") ?? "team"

  return (
    <div css={agentContent}>
      <div css={menuContainerStyle}>
        <RadioGroup
          onChange={(value) => {
            if (value === "team") {
              searchParams.delete("sort")
              setSearchParams(searchParams)
            }
            searchParams.set("list", value)
            setSearchParams(searchParams)
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
              value: "community",
              label: t("dashboard.list-type.marketplace"),
            },
          ]}
        />
        <div
          style={{
            flexGrow: 1,
          }}
        />
        {currentSelectTab === "community" && (
          <SortSelector
            sort={currentSort}
            onSortChange={(value) => {
              searchParams.set("sort", value)
              setSearchParams(searchParams)
            }}
          />
        )}
      </div>
      {currentSelectTab === "community" && <MarketAgents />}
      {currentSelectTab === "team" && <TeamAgents />}
    </div>
  )
}
