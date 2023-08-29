import { MARKET_AGENT_SORTED_OPTIONS } from "@illa-public/market-agent/service"
import { FC, Suspense } from "react"
import { useTranslation } from "react-i18next"
import { Await, useLoaderData, useSearchParams } from "react-router-dom"
import { LoadingIcon, RadioGroup, getColor } from "@illa-design/react"
import { MarketAgents } from "@/page/Dashboard/DashboardAiAgent/MarketAgents"
import { TeamAgents } from "@/page/Dashboard/DashboardAiAgent/TeamAgents"
import { DashboardErrorElement } from "@/page/Dashboard/components/ErrorElement"
import { SortSelector } from "@/page/Dashboard/components/SortSelector"
import { agentContent, fallbackLoadingStyle, menuContainerStyle } from "./style"


export const AgentContent: FC = () => {
  const { t } = useTranslation()

  const [searchParams, setSearchParams] = useSearchParams()

  const { request } = useLoaderData() as { request: Promise<any> }

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
      <Suspense
        fallback={
          <div css={fallbackLoadingStyle}>
            <LoadingIcon spin={true} />
          </div>
        }
      >
        <Await resolve={request} errorElement={<DashboardErrorElement />}>
          {currentSelectTab === "community" && <MarketAgents />}
          {currentSelectTab === "team" && <TeamAgents />}
        </Await>
      </Suspense>
    </div>
  )
}