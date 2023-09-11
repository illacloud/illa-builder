import { MarketAgentCard } from "@illa-public/market-agent"
import { MarketAIAgent } from "@illa-public/market-agent"
import {
  MARKET_AGENT_SORTED_OPTIONS,
  fetchMarketAgentList,
} from "@illa-public/market-agent"
import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  ILLA_MIXPANEL_EVENT_TYPE,
} from "@illa-public/mixpanel-utils"
import { getCurrentTeamInfo } from "@illa-public/user-data"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Divider, Loading, LoadingIcon, useMessage } from "@illa-design/react"
import { EmptySearchResult } from "@/page/App/components/EmptySearchResult"
import { track } from "@/utils/mixpanelHelper"
import {
  cardListContainerStyle,
  cardListStyle,
  fallbackLoadingStyle,
  loadingStyle,
} from "./style"

export const MarketAgents = () => {
  const { t } = useTranslation()
  const message = useMessage()

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const fetching = useRef<boolean>()
  const page = useRef<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const teamInfo = useSelector(getCurrentTeamInfo)!!

  const [marketAgentList, setMarketAgentList] = useState<MarketAIAgent[]>([])

  const sort =
    (searchParams.get("sort") as MARKET_AGENT_SORTED_OPTIONS) ??
    MARKET_AGENT_SORTED_OPTIONS.POPULAR
  const keywords = searchParams.get("keywords") ?? ""

  const [updateLoading, setUpdateLoading] = useState<boolean>(true)

  const [showLine, setShowLine] = useState<boolean>(false)

  const handleClickCard = (agent: MarketAIAgent) => {
    track(
      ILLA_MIXPANEL_EVENT_TYPE.CLICK,
      ILLA_MIXPANEL_BUILDER_PAGE_NAME.AI_AGENT_DASHBOARD,
      {
        element: "card",
        parameter3: "community",
        parameter5: agent.aiAgent.aiAgentID,
      },
    )
    navigate(
      `/${agent.marketplace.contributorTeam.teamIdentifier}/ai-agent/${agent.aiAgent.aiAgentID}/run?myTeamIdentifier=${teamInfo.identifier}`,
    )
  }

  useEffect(() => {
    const controller = new AbortController()
    setUpdateLoading(true)
    fetchMarketAgentList(1, sort, keywords, 40, controller.signal)
      .then((res) => {
        setMarketAgentList(res.data.products)
        setHasMore(res.data.hasMore)
        setUpdateLoading(false)
        return res.data
      })
      .catch((err) => {
        if (err.message === "canceled") {
          return
        }
        setUpdateLoading(false)
      })
    return () => {
      controller.abort()
    }
  }, [keywords, sort])

  return updateLoading ? (
    <div css={fallbackLoadingStyle}>
      <LoadingIcon spin={true} />
    </div>
  ) : marketAgentList.length > 0 ? (
    <>
      {showLine && <Divider l={0} r={0} w="100%" direction="horizontal" />}
      <div
        css={cardListContainerStyle}
        onScroll={async (event) => {
          const target = event.target as HTMLDivElement
          if (target.scrollTop >= 24) {
            setShowLine(true)
          } else {
            setShowLine(false)
          }
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
              setMarketAgentList([
                ...marketAgentList,
                ...agentList.data.products,
              ])
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
              onClick={() => handleClickCard(agent)}
              key={agent.aiAgent.aiAgentID}
              marketAIAgent={agent}
            />
          ))}
        </div>
        {hasMore && (
          <div css={loadingStyle}>
            <Loading colorScheme="techPurple" />
          </div>
        )}
      </div>
    </>
  ) : (
    <EmptySearchResult desc={t("dashboard.no-result")} />
  )
}

MarketAgents.displayName = "MarketAgents"
