import { MarketAgentCard } from "@illa-public/market-agent/MarketAgentCard"
import { MarketAiAgent } from "@illa-public/market-agent/MarketAgentCard/interface"
import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
} from "@illa-public/market-agent/service"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom"
import { Loading, LoadingIcon, useMessage } from "@illa-design/react"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import {
  cardListContainerStyle,
  cardListStyle,
  fallbackLoadingStyle,
  loadingStyle,
} from "./style"

export const MarketAgents = () => {
  const { t } = useTranslation()
  const message = useMessage()

  const [searchParams] = useSearchParams()

  const fetching = useRef<boolean>()
  const page = useRef<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const [marketAgentList, setMarketAgentList] = useState<MarketAiAgent[]>([])

  const sort =
    (searchParams.get("sort") as MARKET_AGENT_SORTED_OPTIONS) ??
    MARKET_AGENT_SORTED_OPTIONS.POPULAR
  const keywords = searchParams.get("keywords") ?? ""

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  useEffect(() => {
    setUpdateLoading(true)
    fetchMarketAgentList(1, sort, keywords, 40)
      .then((res) => {
        setMarketAgentList(res.data.products)
        setHasMore(res.data.hasMore)
        return res.data
      })
      .finally(() => setUpdateLoading(false))
  }, [keywords, sort])

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : marketAgentList.length > 0 ? (
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
            setMarketAgentList([...marketAgentList, ...agentList.data.products])
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
