import { MarketAgentCard } from "@illa-public/market-agent/MarketAgentCard"
import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
} from "@illa-public/market-agent/service"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { Loading, useMessage } from "@illa-design/react"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import { getDashboardMarketAgentList } from "@/redux/dashboard/marketAIAgents/marketAgentSelector"
import { dashboardMarketAgentActions } from "@/redux/dashboard/marketAIAgents/marketAgentSlice"
import { cardListContainerStyle, cardListStyle, loadingStyle } from "./style"

export const MarketAgents = () => {
  const { t } = useTranslation()
  const message = useMessage()

  const marketAgentList = useSelector(getDashboardMarketAgentList)

  const [searchParams] = useSearchParams()

  const dispatch = useDispatch()

  const fetching = useRef<boolean>()
  const page = useRef<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const sort =
    (searchParams.get("sort") as MARKET_AGENT_SORTED_OPTIONS) ??
    MARKET_AGENT_SORTED_OPTIONS.POPULAR
  const keywords = searchParams.get("keywords") ?? ""

  return marketAgentList.length > 0 ? (
    <div
      css={cardListContainerStyle}
      onScroll={async (event) => {
        const target = event.target as HTMLDivElement
        if (
          target.scrollHeight - target.scrollTop - target.clientHeight <=
          800
        ) {
          if (fetching.current) {
            return
          }
          if (!hasMore) {
            return
          }
          fetching.current = true
          try {
            const agentList = await fetchMarketAgentList(
              page.current + 1,
              sort,
              keywords,
              40,
            )
            page.current = page.current + 1
            dispatch(
              dashboardMarketAgentActions.addMarketAgentListReducer(
                agentList.data.products,
              ),
            )
            if (!agentList.data.hasMore) {
              setHasMore(false)
              return
            }
          } catch (e) {
            message.error({
              content: t("dashboard.message.next-page-error"),
            })
          } finally {
            fetching.current = false
          }
        }
      }}
    >
      <div css={cardListStyle}>
        {marketAgentList.map((agent) => (
          <MarketAgentCard
            key={agent.aiAgent.aiAgentID}
            marketAIAgent={agent}
          />
        ))}
      </div>
      {hasMore && <Loading css={loadingStyle} />}
    </div>
  ) : (
    <EmptySearchResult desc={t("dashboard.no-result")} />
  )
}

MarketAgents.displayName = "MarketAgents"
